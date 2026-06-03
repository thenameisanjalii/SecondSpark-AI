# SecondSpark AI 🔋♻️

## AI-Powered Circular Automotive Ecosystem

SecondSpark AI is an intelligent sustainability platform focused on extending EV battery lifecycle through AI-driven battery analytics, Digital Material Passports, and second-life recommendation systems.

This project was developed for the **ET AutoTech Hackathon 2026** under the theme:

### AI for Circular Economy & Sustainability

---

# 🚀 Project Vision

Millions of EV batteries are retired every year without proper health assessment. Many of these batteries still retain usable capacity but are prematurely recycled or discarded.

SecondSpark AI aims to:

* Predict battery health using Machine Learning
* Estimate Remaining Useful Life (RUL)
* Recommend optimal second-life applications
* Support sustainable battery lifecycle management
* Reduce carbon footprint across the EV ecosystem

---

# 🧠 Core Features

## ✅ SOH Prediction

Predicts the State of Health (SOH) of EV batteries using battery telemetry parameters.

## ✅ RUL Prediction

Estimates Remaining Useful Life (RUL) for intelligent lifecycle decisions.

## ✅ AI Recommendation Engine

Provides smart recommendations:

* Continue EV Use
* Stationary Storage
* Recycling

## ✅ FastAPI Inference Service

Exposes ML models through production-style REST APIs.

## ✅ Digital Material Passport (Upcoming)

Tracks battery lifecycle, composition, and sustainability metadata.

---

# ⚙️ Technology Stack

## AI & Analytics

* Python
* Scikit-Learn
* Pandas
* FastAPI
* Joblib

## Frontend (Planned)

* React
* TypeScript
* Tailwind CSS

## Backend (Planned)

* Node.js
* Express.js
* MongoDB

---

# 📂 Project Structure

```text
SecondSpark-AI/
│
├── ai-service/
│   │
│   ├── data/
│   │   └── battery_cycle_level_dataset_CLEAN_FINAL.csv
│   │
│   ├── models/
│   │   ├── soh_model.pkl
│   │   └── rul_model.pkl
│   │
│   ├── main.py
│   ├── train_soh.py
│   ├── train_rul.py
│   └── test_soh.py
│
├── frontend/   (Upcoming)
│
└── README.md
```

---

# 📊 Machine Learning Models

## SOH Model

* Algorithm: Random Forest Regressor
* R² Score: 0.974

## RUL Model

* Algorithm: Random Forest Regressor
* R² Score: 0.989

---

# 🔌 API Endpoint

## POST `/api/v1/battery/grade`

### Sample Request

```json
{
  "cycle": 1200,
  "voltage": 3.6,
  "temperature": 34,
  "capacity": 0.78
}
```

### Sample Response

```json
{
  "soh": 68.86,
  "rul": 31.4,
  "recommendation": "Stationary Storage"
}
```

---

# 🧪 Run Locally

## 1. Clone Repository

```bash
git clone https://github.com/thenameisanjalii/SecondSpark-AI.git
```

## 2. Install Dependencies

```bash
pip install fastapi uvicorn pandas scikit-learn joblib pydantic
```

## 3. Start FastAPI Server

```bash
cd ai-service
uvicorn main:app --reload
```

## 4. Open Swagger Docs

```text
http://127.0.0.1:8000/docs
```

---

# 👥 Team Auto_Catalysts

## Gopal Patidar

Team Lead | AI Architecture & Product Strategy

## Anjali Chourasia

Frontend Development & UI/UX

## Prakhar Singh

Machine Learning & Data Analytics

---

# 🌍 Future Roadmap

* Digital Material Passport System
* Carbon Footprint Analytics
* Lifecycle Tracking Dashboard
* Battery Recycling Intelligence
* Agentic AI Orchestration
* Battery Vision Inspection

---

# 🏆 Hackathon

ET AutoTech Hackathon 2026

Theme:
AI for Circular Economy & Sustainability

---

# 📜 License

This project is developed for educational, research, and hackathon purposes.
