from fastapi import APIRouter, UploadFile, File
from app.services.admin import process_csv

router = APIRouter(tags=["csv"])

@router.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...)):
    return await process_csv(file)