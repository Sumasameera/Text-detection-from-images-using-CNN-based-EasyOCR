import json
from zipfile import ZipFile

ZIP_PATH = r"C:\Users\samee\Downloads\TextOCR_0.1_train.json.zip"

# Extract the contents of the ZIP
with ZipFile(ZIP_PATH, 'r') as zip_ref:
    zip_ref.extractall("textocr_data")
    print("✅ Extracted contents:")
    print(zip_ref.namelist())

# Load the JSON
json_path = "textocr_data/TextOCR_0.1_train.json"
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Check annotation stats
print("✅ JSON Keys:", data.keys())

# Each key explanation:
print(f"🖼 Total Images: {len(data['imgs'])}")
print(f"✍️ Total Annotations: {len(data['anns'])}")
print(f"🔗 Image-to-Anns mappings: {len(data['imgToAnns'])}")

# Preview one annotation
first_ann_id = list(data['anns'].keys())[0]
print("📄 Example annotation:", data['anns'][first_ann_id])
