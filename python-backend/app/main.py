from fastapi import FastAPI
from app.api.v1.endpoints import lots, orders, auth, user, filters, admin
from app.db.session import engine
from app.db.models.base import Base
from fastapi.middleware.cors import CORSMiddleware
from app.scheduler.scheduler import start_scheduler

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SHMYAKS API",
    description="API для веб-сервиса по продаже остатков топлива",
    version="1.0.0",
    license_info={
        "name": "MIT",
    },
    docs_url="/api/v1/docs",
    openapi_url="/api/v1/docs/openapi.json"
    swagger_ui_parameters={"syntaxHighlight.theme": "monokai", "theme": "dark",}
)
@app.on_event("startup")
def startup_event():
    start_scheduler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lots.router, prefix="/api/v1")
app.include_router(orders.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(user.router, prefix="/api/v1")
app.include_router(filters.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")