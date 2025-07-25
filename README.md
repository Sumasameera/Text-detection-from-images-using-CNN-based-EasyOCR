# Text Detection and Classification from Images using CNN + EasyOCR

This project is a multilingual image-processing web application that performs automated text detection, language classification, translation, and speech synthesis from uploaded images using deep learning.

## 🚀 Features
- Extracts text from images using **EasyOCR**
- Classifies and translates text using **GoogleTranslator**
- Converts translated text into speech with **gTTS**
- Built using **FastAPI** (backend) and **ReactJS** (frontend)
- Supports multiple languages and noisy backgrounds
- Compatible with real-world use cases like travel, accessibility, and education

## 🧠 Tech Stack
- **Frontend**: ReactJS
- **Backend**: FastAPI
- **OCR**: EasyOCR
- **Translation**: deep_translator (GoogleTranslator)
- **Text-to-Speech**: gTTS
- **Deployment**: Google Colab Pro (for model development)

## 📂 Dataset
We used the [TextOCR Dataset](https://github.com/facebookresearch/textvqa/tree/main/datasets/TextOCR) from Facebook AI Research:
- 28,000+ images
- 900,000+ annotated text instances
- Real-world scene text with bounding boxes and transcriptions

## 👨‍💻 Contributors

| Name              | Role                                 |
|-------------------|--------------------------------------|
| Suma Sameera      | Project Lead, Backend API, Deployment |
| Meghana Mekala    | CNN Model Development, OCR Integration, Frontend Support |
| Simritha          | Dataset Processing, UI Enhancements  |
| Shiva             | Testing, Documentation               |

> 🔗 GitHub Collaboration: This project was collaboratively developed and maintained on GitHub. Contributions are visible through commit history and project tasks.

## 📸 Sample Screenshot
(Add a screenshot of your UI if available)

## 📝 How to Run
1. Clone the repo:
    ```bash
    git clone https://github.com/Sumasameera/Text-detection-from-images-using-CNN-based-EasyOCR.git
    ```
2. Install backend requirements:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the FastAPI backend:
    ```bash
    uvicorn main:app --reload
    ```
4. Start frontend (navigate to frontend folder and use npm/yarn).

## 🔮 Future Scope
- Handwritten text detection
- Live video stream support
- Edge device optimization
- Contextual NLP-based text interpretation
