import pandas as pd
from datetime import datetime
from app.db.models.lot import Lot
from app.utils.ksss_decoder import decode_ksss_nb_code, decode_ksss_fuel_code

def parse_csv(file_path: str) -> list[Lot]:
    lots = []
    try:
        df = pd.read_csv(file_path)
        for _, row in df.iterrows():
            nb= decode_ksss_nb_code(row["ksss_nb_code"]).split("/")
            nb_name = nb[0]
            nb_region = nb[1]
            fuel_type = decode_ksss_fuel_code(row["ksss_fuel_code"])
            
            lot = Lot(
                date=datetime.strptime(row["date"], "%Y-%m-%d").date(),
                nb_name=nb_name,
                nb_region=nb_region,
                fuel_type=fuel_type,
                start_weight=row["start_weight"],
                available_volume=row["available_volume"],
                status=row["status"],
                lot_price=row["lot_price"],
                price_per_ton=row["price_per_ton"],
            )
            lots.append(lot)
    except Exception as e:
        print(f"Ошибка при парсинге файла {file_path}: {e}")
    return lots