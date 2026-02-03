# CSV-to-JSON Live Transformer

This project converts uploaded CSV files into structured JSON and displays the output in a web interface. The solution is divided into a frontend (Next.js) and a backend (Flask + Pandas).

---

# Frontend README (Next.js)

## Overall Architecture & Assumptions
- Built using Next.js (App Router) as a client-side application
- Responsible for file upload, API communication, and JSON rendering
- Assumes backend API is available and returns valid JSON
- No authentication or persistent storage is required

---

## JSON Structure Design Decisions
- JSON is rendered dynamically using a recursive tree component
- Supports nested objects and arrays
- Expand/collapse behavior is used for better readability of large JSON
- Designed to be generic and backend-agnostic

---

## Setup & Run Instructions

```bash
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

---

# Backend README (Flask + Pandas)

## Overall Architecture & Assumptions
- Flask-based REST API with a single upload endpoint
- Stateless design (no database or file persistence)
- Assumes uploaded files are CSV format with a header row

---

## CSV Parsing Approach & Edge Cases
- CSV files are parsed using Pandas
- First row is treated as column headers
- Each row is converted into a JSON object
- Handles empty files, missing values, and inconsistent rows gracefully

---

## JSON Structure Design Decisions
- Output JSON is structured as a list of objects
- Keys correspond to CSV column names
- Format is optimized for tree-based visualization on the frontend

---

## Setup & Run Instructions

```bash
pip install -r requirements.txt
python app.py
```

Backend runs at:
```
http://localhost:5000
```

