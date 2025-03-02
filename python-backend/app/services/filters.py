from sqlalchemy.orm import Session
from sqlalchemy import distinct
from app.db.models.lot import Lot
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

def lot_filters_service(db: Session) -> Dict[str, List[str]]:
    try:
        logger.info("Fetching distinct values for lot filters")
        
        nb_names = db.query(distinct(Lot.nb_name)).all()
        nb_regions = db.query(distinct(Lot.nb_region)).all()
        fuel_types = db.query(distinct(Lot.fuel_type)).all()

        nb_names = [name[0] for name in nb_names if name[0] is not None]
        nb_regions = [region[0] for region in nb_regions if region[0] is not None]
        fuel_types = [fuel[0] for fuel in fuel_types if fuel[0] is not None]

        logger.info("Successfully fetched lot filters")
        return {
            "nb_name": nb_names,
            "nb_region": nb_regions,
            "fuel_type": fuel_types,
        }
    except Exception as e:
        logger.error(f"Error fetching lot filters: {str(e)}", exc_info=True)
        raise