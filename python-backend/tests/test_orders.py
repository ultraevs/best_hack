from app.services.order_service import create_order
from app.db.models.lot import Lot
from app.api.v1.schemas.order import OrderCreate
from datetime import date
import pytest

@pytest.fixture(scope="function")
def test_create_order(db_session):
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

    order_data = OrderCreate(
        lot_id=lot.id,
        nb_name="Нефтебаза_1",
        nb_region="Москва",
        fuel_type="АИ-95",
        volume=1000,
        delivery_type="Доставка",
        delivery_address="ул. Ленина, 10"
    )
    order = create_order(db_session, order_data)

    assert order.id is not None
    assert order.volume == 1000
    assert order.delivery_type == "Доставка"