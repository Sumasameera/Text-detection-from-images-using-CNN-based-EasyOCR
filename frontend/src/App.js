import React, { useState } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    formData.append("source_lang", sourceLang);
    formData.append("target_lang", targetLang);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/translate-images/", formData);
      setResults(res.data.results);
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setLoading(false);
    }
  };


  const playPronunciation = (audioData) => {
    const audioBlob = new Blob([new Uint8Array(atob(audioData).split("").map((c) => c.charCodeAt(0)))], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, .app {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .app {
          background: url("https://images.unsplash.com/photo-1584433144859-c26b0fbd2fbe?auto=format&fit=crop&w=1470&q=80") no-repeat center center fixed;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .container {
          background: rgba(58, 58, 81, 0.69);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px;
          max-width: 900px;
          width: 100%;
          color: #fff;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        h1 {
          font-size: 4rem;
          margin-bottom: 30px;
          color: rgba(200, 209, 211, 0.9);
          text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.5);
        }

        .dropzone {
          border: 2px dashed #ffffff;
          padding: 40px;
          border-radius: 15px;
          margin-bottom: 25px;
          background-color: rgba(32, 30, 30, 0.2);
          cursor: pointer;
        }

        .dropzone:hover {
          background-color: rgba(30, 28, 28, 0.3);
        }

        .file-input {
          margin-top: 15px;
        }

        .lang-selectors {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin: 20px 0;
        }

        .lang-selectors div {
          flex: 1;
          text-align: left;
        }

        select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-weight: bold;
          color: #fff;
        }

        button {
          padding: 15px 25px;
          font-size: 16px;
          background: linear-gradient(to right, #00c6ff, #0072ff);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 10px;
        }

        button:hover {
          transform: scale(1.05);
          background: linear-gradient(to right, #0072ff, #00c6ff);
        }

        button:disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        .results {
          margin-top: 40px;
        }

        .results h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #fff;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        }

        .result-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .result-card {
          background: rgba(96, 45, 64, 0.52);
          border-radius: 12px;
          padding: 20px;
          color: #333;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }

        .result-card:hover {
          transform: scale(1.05);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-bottom: 10px;
          color: #444;
        }

        .status {
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 5px;
        }

        .success {
          background-color: #c8e6c9;
          color: #2e7d32;
        }

        .error {
          background-color: #ffcdd2;
          color: #c62828;
        }

        .label {
          font-weight: bold;
          margin-top: 10px;
        }

        pre {
          background: #f3f4f6;
          padding: 10px;
          border-radius: 8px;
          white-space: pre-wrap;
          max-height: 120px;
          overflow-y: auto;
        }

        .error-msg {
          color: #c62828;
          font-size: 13px;
          margin-top: 5px;
        }

        .voice-btn {
          margin-left: 10px;
          background:rgb(50, 132, 165);
          border: none;
          cursor: pointer;
          font-size: 18px;
        }
      `}</style>

      <div className="container">
        <h1>🌍 LexiGlobe</h1>

        <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
          <p>📁 Drag & drop or choose images</p>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="file-input"
          />
        </div>

        <div className="lang-selectors">
          <div>
            <label>🌐 Source Language</label>
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="ko">Korean</option>
              <option value="ru">Russian</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <div>
            <label>🌐 Target Language</label>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="ko">Korean</option>
              <option value="ru">Russian</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        </div>

        <button onClick={handleUpload} disabled={loading || files.length === 0}>
          {loading ? "⏳ Translating..." : "🚀 Translate All"}
        </button>

        {results.length > 0 && (
          <div className="results">
            <h2>📜 Translation Results</h2>
            <div className="result-grid">
  {results.map((r, idx) => (
    <div key={idx} className="result-card">
      <div className="card-header">
        <span>{r.filename}</span>
        <span
          className={`status ${r.error ? "error" : "success"}`}
        >
          {r.error ? "Failed" : "Success"}
        </span>
      </div>
      <div>
        <label className="label">Extracted Text:</label>
        <pre>{r.extracted_text.join(" ")}</pre>
      </div>
      <div>
        <label className="label">Translated Text:</label>
        <pre>{r.translated_text}</pre>
      </div>
      {r.pronunciation && r.pronunciation.audio && (
        <div>
          <button
            className="voice-btn"
            onClick={() => playPronunciation(r.pronunciation.audio)}
          >
            🔊 Listen to Pronunciation
          </button>
        </div>
      )}

      {r.error && <p className="error-msg">{r.error}</p>}
    </div>
  ))}
</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
