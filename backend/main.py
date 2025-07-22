from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import easyocr
import os
import uuid
import logging
from typing import List
from deep_translator import GoogleTranslator
from gtts import gTTS
import tempfile
import base64
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_compatible_langs(src, tgt):
    compat = {
        "ko": ["ko", "en"],
        "bn": ["bn", "as", "en"],
        "hi": ["hi", "en"],
        "ar": ["ar", "en"],
        "ru": ["ru", "en"],
        "default": ["en"]
    }
    for lang in (src, tgt):
        if lang in compat:
            return compat[lang]
    return ["en"]

def generate_pronunciation(text: str, lang: str) -> str:
    try:
        temp_filename = os.path.join(tempfile.gettempdir(), f"{uuid.uuid4().hex}.mp3")
        tts = gTTS(text=text, lang=lang, slow=False)
        tts.save(temp_filename)

        with open(temp_filename, "rb") as f:
            audio_data = f.read()
        
        os.remove(temp_filename)

        base64_audio = base64.b64encode(audio_data).decode("utf-8")
        return base64_audio
    except Exception as e:
        logging.error(f"Error generating pronunciation for {lang}: {e}")
        return None

@app.post("/translate-images/")
async def translate_images(
    files: List[UploadFile] = File(...),
    source_lang: str = Form(...),
    target_lang: str = Form(...),
):
    logging.basicConfig(level=logging.INFO)
    lang_group = get_compatible_langs(source_lang, target_lang)
    logging.info(f"Selected language group: {lang_group}")

    reader = easyocr.Reader(lang_group, gpu=False)

    responses = []

    for file in files:
        image_bytes = await file.read()

        try:
            result = reader.readtext(image_bytes, detail=0)
            extracted_text = " ".join(result)

            translated_text = GoogleTranslator(source=source_lang, target=target_lang).translate(extracted_text)

            pronunciation_audio = generate_pronunciation(translated_text, target_lang)

            response = {
                "filename": file.filename,
                "extracted_text": result,
                "translated_text": translated_text,
                "error": None
            }

            if pronunciation_audio:
                response["pronunciation"] = {
                    "audio": pronunciation_audio,
                    "format": "mp3"
                }

            responses.append(response)
        except Exception as e:
            responses.append({
                "filename": file.filename,
                "extracted_text": [],
                "translated_text": "",
                "error": str(e)
            })

    return {"results": responses}
