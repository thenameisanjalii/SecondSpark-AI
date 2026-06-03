from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(title="SecondSpark AI")

# Load Models
soh_model = joblib.load("models/soh_model.pkl")
rul_model = joblib.load("models/rul_model.pkl")

class BatteryInput(BaseModel):
    cycle: int
    voltage: float
    temperature: float
    capacity: float


@app.post("/api/v1/battery/grade")
def grade_battery(data: BatteryInput):

    sample = pd.DataFrame([{
        "cycle": data.cycle,
        "voltage": data.voltage,
        "temperature": data.temperature,
        "capacity": data.capacity
    }])

    soh = float(soh_model.predict(sample)[0])
    rul = float(rul_model.predict(sample)[0])

    soh_percent = round(soh * 100, 2)

    if soh_percent >= 80:
        recommendation = "Continue EV Use"
    elif soh_percent >= 60:
        recommendation = "Stationary Storage"
    else:
        recommendation = "Recycle"

    return {
        "soh": soh_percent,
        "rul": round(rul, 2),
        "recommendation": recommendation
    }