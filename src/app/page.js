"use client";
import { useState, useRef } from "react";
import "./page.css";
import JsonTree from "./components/JsonTree";

export default function Home() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setStatus("idle");
    } else {
      setStatus("error");
    }
  };

  // 🔥 SAME BACKEND LOGIC
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      setData(result);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }

    setLoading(false);
  };

  const clearFile = () => {
    setFile(null);
    setData(null);
    setStatus("idle");
  };

  return (
    <div className="page-container">
     

      <div className="header-section">
        <div className="badge">CSV Converter</div>
        <h1 className="title">CSV to JSON</h1>
        <p className="subtitle">Upload CSV and view JSON output</p>
      </div>

      <div className="card">
        {/* Drag & Drop removed – click only */}
        <div
          className="drop-zone"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden-input"
          />

          <div className="drop-content">
            <div className="icon-box">
              <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M17 8l-5-5-5 5" />
                <path d="M12 3v12" />
              </svg>
            </div>
            <p className="drop-title">Click to select CSV file</p>
            <p className="drop-subtitle">
              <span className="browse-link">Browse files</span>
            </p>
            <p className="file-hint">Only .csv files supported</p>
          </div>
        </div>

        {file && (
          <div className="file-info">
            <div className="file-details">
              <div>
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button onClick={clearFile} className="clear-btn">✕</button>
          </div>
        )}

        <div className="button-group">
          <button className="cancel-btn" onClick={clearFile}>
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="upload-btn"
          >
            {loading ? "Uploading..." : "Upload & Convert"}
          </button>
        </div>

        {status === "success" && (
          <div className="message success">
            ✅ CSV converted successfully
          </div>
        )}

        {status === "error" && (
          <div className="message error">
            ❌ Invalid file or upload failed
          </div>
        )}
      </div>

      {data && (
        <div className="card" style={{ marginTop: "30px" }}>
          <h3>JSON Output</h3>
          <JsonTree data={data} />
        </div>
      )}
    </div>
  );
}
