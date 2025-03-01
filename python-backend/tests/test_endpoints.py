from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_lots():
    response = client.get("/api/v1/lots/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_order():
    order_data = {
        "lot_id": 1,
        "nb_name": "Нефтебаза_1",
        "nb_region": "Москва",
        "fuel_type": "АИ-95",
        "volume": 1000,
        "delivery_type": "Доставка",
        "delivery_address": "ул. Ленина, 10"
    }
    headers = {
        "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxNzcyMzgxMDQ0fQ.cf6JHy481Xi9lgVTjMIr23yZfoE1xPhEatsgEZ20VIU"
    }
    response = client.post("/api/v1/orders/", json=order_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["volume"] == 1000

def test_search_lots():
    response = client.get("/api/v1/search-lots/?search_query=АИ-95")
    assert response.status_code == 200
    assert isinstance(response.json(), list)