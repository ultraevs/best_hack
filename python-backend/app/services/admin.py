from dotenv import load_dotenv
from fastapi import UploadFile, HTTPException
import os
from datetime import datetime
import logging
from ftplib import FTP

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", 
    handlers=[
        logging.FileHandler("csv_upload.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

load_dotenv()

FTP_HOST = os.getenv("FTP_HOST")
FTP_USER = os.getenv("FTP_USER")
FTP_PASSWORD = os.getenv("FTP_PASSWORD")
FTP_UPLOAD_DIR = os.getenv("FTP_UPLOAD_DIR", "/uploads")

async def process_csv(file: UploadFile):
    UPLOAD_FOLDER = "csv"
    if not file.filename.endswith(".csv"):
        logger.error(f"Invalid file format: {file.filename}")
        raise HTTPException(status_code=400, detail="Файл должен быть в формате CSV")
    
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
        logger.info(f"Created upload folder: {UPLOAD_FOLDER}")
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_path = os.path.join(UPLOAD_FOLDER, f"{timestamp}_{file.filename}")
    
    try:
        logger.info(f"Starting to process file: {file.filename}")
        
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        
        logger.info(f"File {file.filename} successfully saved locally at {file_path}")
        
        try:
            ftp = FTP(FTP_HOST)
            ftp.login(FTP_USER, FTP_PASSWORD)
            ftp.cwd(FTP_UPLOAD_DIR)
            
            with open(file_path, "rb") as file_obj:
                ftp.storbinary(f"STOR {os.path.basename(file_path)}", file_obj)
            
            ftp.quit()
            logger.info(f"File {file.filename} successfully uploaded to FTP")
        except Exception as ftp_error:
            logger.warning(f"Failed to upload file to FTP: {str(ftp_error)}")
            logger.info("File will be stored locally only.")
        
        return {"message": f"Файл {file.filename} успешно загружен и будет обработан."}
    except Exception as e:
        logger.error(f"Error processing file {file.filename}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Ошибка при сохранении файла: {str(e)}")
