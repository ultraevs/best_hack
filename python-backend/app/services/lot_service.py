from datetime import date
from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from app.db.models.lot import Lot
from app.api.v1.schemas.lot import LotCreate
from sqlalchemy import and_, or_
import logging

logger = logging.getLogger(__name__)

def create_lot(db: Session, lot: LotCreate):
    try:
        db_lot = Lot(**lot.dict())
        db.add(db_lot)
        db.commit()
        db.refresh(db_lot)
        logger.info(f"Lot created successfully - Lot ID: {db_lot.id}, Fuel Type: {db_lot.fuel_type}, NB Name: {db_lot.nb_name}")
        return db_lot
    except Exception as e:
        logger.error(f"Error creating lot: {str(e)}", exc_info=True)
        db.rollback()
        raise

def get_lots(
    db: Session,
    filters: Dict[str, List[str]],
    price_range: Optional[tuple[float, float]] = None,
    min_available_volume: Optional[float] = None 
):
    try:
        query = db.query(Lot)

        today = date.today()
        inactive_lots = query.filter(Lot.date <= today).all()
        for lot in inactive_lots:
            if lot.status != "Неактивен":
                lot.status = "Неактивен"
                logger.info(f"Lot marked as 'Неактивен' - Lot ID: {lot.id}, Date: {lot.date}")
        db.commit()

        query = query.filter(Lot.date > today)
        for field, values in filters.items():
            if values:
                query = query.filter(getattr(Lot, field).in_(values))

        if price_range:
            min_price, max_price = price_range
            query = query.filter(and_(Lot.price_per_ton >= min_price, Lot.price_per_ton <= max_price))

        if min_available_volume is not None:
            query = query.filter(Lot.available_volume >= min_available_volume)

        lots = query.all()
        logger.info(f"Fetched {len(lots)} lots with filters: {filters}, price_range: {price_range}")
        return lots
    except Exception as e:
        logger.error(f"Error fetching lots: {str(e)}", exc_info=True)
        raise

def get_lot(db: Session, lot_id: int):
    try:
        lot = db.query(Lot).filter(Lot.id == lot_id).first()
        if lot:
            logger.info(f"Fetched lot - Lot ID: {lot.id}, Fuel Type: {lot.fuel_type}, NB Name: {lot.nb_name}")
        else:
            logger.warning(f"Lot not found - Lot ID: {lot_id}")
        return lot
    except Exception as e:
        logger.error(f"Error fetching lot: {str(e)}", exc_info=True)
        raise

def search_lots(db: Session, search_query: str):
    try:
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

        lots = query.all()
        logger.info(f"Search completed - Query: {search_query}, Results: {len(lots)}")
        return lots
    except Exception as e:
        logger.error(f"Error searching lots: {str(e)}", exc_info=True)
        raise