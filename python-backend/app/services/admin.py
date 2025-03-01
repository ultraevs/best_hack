from fastapi import UploadFile, HTTPException
import os
from datetime import datetime

async def process_csv(file: UploadFile):
    UPLOAD_FOLDER = "csv"
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Файл должен быть в формате CSV")
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_path = os.path.join(UPLOAD_FOLDER, f"{timestamp}_{file.filename}")
    
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        return {"message": f"Файл {file.filename} успешно загружен и будет обработан."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при сохранении файла: {str(e)}")