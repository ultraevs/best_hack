from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from app.db.models.lot import Lot
from app.api.v1.schemas.lot import LotCreate
from sqlalchemy import and_, or_

def create_lot(db: Session, lot: LotCreate):
    db_lot = Lot(**lot.dict())
    db.add(db_lot)
    db.commit()
    db.refresh(db_lot)
    return db_lot

def get_lots(
    db: Session,
    filters: Dict[str, List[str]],
    price_range: Optional[tuple[float, float]] = None
):
    query = db.query(Lot)

    for field, values in filters.items():
        if values:
            query = query.filter(getattr(Lot, field).in_(values))

    if price_range:
        min_price, max_price = price_range
        query = query.filter(and_(Lot.price_per_ton >= min_price, Lot.price_per_ton <= max_price))

    return query.all()

def get_lot(db: Session, lot_id: int):
    return db.query(Lot).filter(Lot.id == lot_id).first()


def search_lots(db: Session, search_query: str):
    search_terms = search_query.split()

    conditions = []
    for term in search_terms:
        conditions.append(
            or_(
                Lot.fuel_type.ilike(f"%{term}%"),
                Lot.nb_name.ilike(f"%{term}%"),
                Lot.nb_region.ilike(f"%{term}%"),
            )
        )

    if conditions:
        query = db.query(Lot).filter(or_(*conditions))
    else:
        query = db.query(Lot)

    return query.all()