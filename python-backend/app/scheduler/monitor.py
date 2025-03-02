# app/scheduler/monitor.py
import os
from app.scheduler.parser import parse_csv
from app.db.session import get_db
from sqlalchemy.orm import Session

CSV_FOLDER = "csv"
PROCESSED_FOLDER = os.path.join(CSV_FOLDER, "processed")

def process_new_files():
    db: Session = next(get_db())
    for filename in os.listdir(CSV_FOLDER):
        if filename.endswith(".csv"):
            file_path = os.path.join(CSV_FOLDER, filename)
            lots = parse_csv(file_path)
            
            try:
                db.bulk_save_objects(lots)
                db.commit()
                print(f"Файл {filename} успешно обработан.")
                
                os.makedirs(PROCESSED_FOLDER, exist_ok=True)
                os.rename(file_path, os.path.join(PROCESSED_FOLDER, filename))
            except Exception as e:
                print(f"Ошибка при сохранении данных из файла {filename}: {e}")
                db.rollback()