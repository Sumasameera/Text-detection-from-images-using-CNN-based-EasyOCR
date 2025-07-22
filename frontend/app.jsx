import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Upload image to backend and get translation
  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append file to FormData

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/translate-image/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });

      setTranslation(response.data); // Set translation data
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>📸 Multilingual Translation App</h2>

      {/* File input for image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "1rem" }}
      />
      
      {/* Button to trigger upload */}
      <button onClick={uploadImage} style={{ marginTop: "1rem" }}>Translate</button>

      {/* Loading message */}
      {loading && <p>Translating...</p>}

      {/* Show translation results */}
      {translation && (
        <div style={{ marginTop: "2rem" }}>
          <p><strong>Original Text:</strong> {translation.original_text}</p>
          <p><strong>Detected Language:</strong> {translation.detected_lang}</p>
          <p><strong>Translated Text:</strong> {translation.translated_text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
