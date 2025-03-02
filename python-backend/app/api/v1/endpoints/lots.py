from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.lot_service import get_lots, get_lot, search_lots
from app.api.v1.schemas.lot import Lot

router = APIRouter(tags=["Lots"])

@router.get("/lots/", response_model=List[Lot])
def get_filtered_lots(
    fuel_type: List[str] = Query(None),
    nb_name: List[str] = Query(None),  
    nb_region: List[str] = Query(None),  
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    min_available_volume: Optional[float] = Query(None),
    search_query: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    if search_query is not None:
        lots = search_lots(db, search_query)
        return lots
    filters = {
        "fuel_type": fuel_type,
        "nb_name": nb_name,
        "nb_region": nb_region,
    }

    filters = {k: v for k, v in filters.items() if v}

    price_range = None
    if min_price is not None or max_price is not None:
        price_range = (min_price or 0, max_price or float('inf')) 

    lots = get_lots(db, filters=filters, price_range=price_range, min_available_volume=min_available_volume)
    return lots

@router.get("/lots/{lot_id}", response_model=Lot)
def read_lot(lot_id: int, db: Session = Depends(get_db)):
    lot = get_lot(db, lot_id=lot_id)
    if lot is None:
        raise HTTPException(status_code=404, detail="Lot not found")
    return lot