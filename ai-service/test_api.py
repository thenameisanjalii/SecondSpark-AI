from fastapi.testclient import TestClient
import pytest
from main import app
from unittest.mock import patch

client = TestClient(app)

def test_read_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "SecondSpark AI Battery Analytics API"}

@patch("main.soh_model")
@patch("main.rul_model")
def test_grade_battery_high_health(mock_rul_model, mock_soh_model):
    mock_soh_model.predict.return_value = [0.85]
    mock_rul_model.predict.return_value = [800.0]
    
    payload = {
        "cycle": 100,
        "voltage": 3.8,
        "temperature": 25.0,
        "capacity": 1.95
    }
    response = client.post("/api/v1/battery/grade", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "battery_metrics" in data
    assert "ai_recommendation" in data
    assert data["ai_recommendation"]["primary_action"] == "Continue EV Use"
    assert data["ai_recommendation"]["target_ecosystem"] == "Active"

@patch("main.soh_model")
@patch("main.rul_model")
def test_grade_battery_medium_health(mock_rul_model, mock_soh_model):
    mock_soh_model.predict.return_value = [0.70]
    mock_rul_model.predict.return_value = [400.0]
    
    payload = {
        "cycle": 1200,
        "voltage": 3.6,
        "temperature": 34.0,
        "capacity": 0.78
    }
    response = client.post("/api/v1/battery/grade", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "battery_metrics" in data
    assert "ai_recommendation" in data
    assert "Stationary Storage" in data["ai_recommendation"]["primary_action"]
    assert data["ai_recommendation"]["target_ecosystem"] == "Second-Life"

@patch("main.soh_model")
@patch("main.rul_model")
def test_grade_battery_low_health(mock_rul_model, mock_soh_model):
    mock_soh_model.predict.return_value = [0.55]
    mock_rul_model.predict.return_value = [100.0]
    
    payload = {
        "cycle": 3000,
        "voltage": 3.2,
        "temperature": 45.0,
        "capacity": 0.05
    }
    response = client.post("/api/v1/battery/grade", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "battery_metrics" in data
    assert "ai_recommendation" in data
    assert "Recycling" in data["ai_recommendation"]["primary_action"]
    assert data["ai_recommendation"]["target_ecosystem"] == "End-of-Life"

def test_grade_battery_invalid_data():
    payload = {
        "cycle": 100,
        "voltage": 3.8
    }
    response = client.post("/api/v1/battery/grade", json=payload)
    assert response.status_code == 422

def test_grade_battery_invalid_types():
    payload = {
        "cycle": 100,
        "voltage": "high",
        "temperature": 25.0,
        "capacity": 1.95
    }
    response = client.post("/api/v1/battery/grade", json=payload)
    assert response.status_code == 422

@patch("main.soh_model")
@patch("main.rul_model")
def test_grade_battery_out_of_bounds(mock_rul_model, mock_soh_model):
    mock_soh_model.predict.return_value = [1.15] # 115%
    mock_rul_model.predict.return_value = [-50.0]
    
    payload = {
        "cycle": 10,
        "voltage": 4.2,
        "temperature": 25.0,
        "capacity": 2.05
    }
    response = client.post("/api/v1/battery/grade", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["battery_metrics"]["state_of_health"] == "100.0%"
    assert data["battery_metrics"]["remaining_useful_life"] == "0.0 months"
