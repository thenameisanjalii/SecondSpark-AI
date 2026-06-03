from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(
    title="SecondSpark AI",
    description="Battery SOH & RUL Prediction Service",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
soh_model = joblib.load("models/soh_model.pkl")
rul_model = joblib.load("models/rul_model.pkl")


class BatteryInput(BaseModel):
    cycle: int
    voltage: float
    temperature: float
    capacity: float


@app.get("/")
def home():
    return {
        "message": "SecondSpark AI Battery Analytics API"
    }


@app.post("/api/v1/battery/grade")
def grade_battery(data: BatteryInput):

    sample = pd.DataFrame([{
        "cycle": data.cycle,
        "voltage": data.voltage,
        "temperature": data.temperature,
        "capacity": data.capacity
    }])

    # ML Predictions (Primary Source of Truth)
    # soh_model predicts 0.0 to 1.0, rul_model predicts remaining cycles
    soh_score = float(soh_model.predict(sample)[0])
    rul_cycles = float(rul_model.predict(sample)[0])

    soh_percent = round(soh_score * 100, 2)
    
    # Convert cycles to estimated months (assuming 20 cycles/month for EV or 30 for storage)
    rul_months = round(rul_cycles / 25, 1)

    # Recommendation Engine based on ML Insights
    if soh_percent >= 80:
        recommendation = "Continue EV Use"
        lifecycle_status = "Active"
        suitability = "High-Performance Transport"

    elif soh_percent >= 60:
        recommendation = "Stationary Storage (Solar/Home)"
        lifecycle_status = "Second-Life"
        suitability = "Buffer Energy Storage"

    else:
        recommendation = "Material Recovery / Recycling"
        lifecycle_status = "End-of-Life"
        suitability = "Cobalt & Lithium Extraction"

    # Digital Material Passport (DMP) Metadata
    # This section aligns with hackathon Focus Area 3
    carbon_offset_kg = round((soh_percent / 100) * 150, 2) # Estimated carbon saved vs new battery

    return {
        "battery_metrics": {
            "state_of_health": f"{soh_percent}%",
            "remaining_useful_life": f"{rul_months} months",
            "health_status": "Degraded" if soh_percent < 75 else "Healthy"
        },
        
        # "digital_material_passport": {
        #     "passport_id": f"SS-BAT-{hash(data.capacity)}",
        #     "circular_economy_impact": {
        #         "carbon_offset_estimate_kg": carbon_offset_kg,
        #         "potential_second_life_revenue_usd": round(soh_percent * 2.5, 2)
        #     },
        #     "material_composition_vulnerability": "High (Cobalt/Nickel)" if soh_percent < 50 else "Stable"
        # },

        "ai_recommendation": {
            "primary_action": recommendation,
            "target_ecosystem": lifecycle_status,
            "technical_suitability": suitability
        },

        # "inference_details": {
        #     "model_confidence": "High (RandomForest)",
        #     "cycles_at_prediction": data.cycle
        # }
    }