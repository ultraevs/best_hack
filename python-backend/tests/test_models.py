from app.db.models.lot import Lot
from app.db.models.order import Order
from datetime import date
import pytest

@pytest.fixture(scope="function")
def test_lot_model(db_session):
    lot = Lot(
        date=date.today(),
        ksss_nb_code=101,
        ksss_fuel_code=95,
        start_weight=5000,
        available_volume=5000,
        status="Подтвержден",
        lot_price=2500000,
        price_per_ton=500,
        nb_name="Нефтебаза_1",
        fuel_type="АИ-95"
    )
    db_session.add(lot)
    db_session.commit()
    assert lot.id is not None

@pytest.fixture(scope="function")
def test_order_model(db_session):
    order = Order(
        order_date=date.today(),
        lot_id=1,
        client_id=1,
        volume=1000,
        delivery_type="Доставка",
        delivery_address="ул. Ленина, 10"
    )
    db_session.add(order)
    db_session.commit()
    assert order.id is not None