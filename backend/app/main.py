from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.admin_bootstrap import sync_admin_from_env
from app.config import get_settings
from app.database import connect_db, disconnect_db
from app.routers import admin_auth, leads, lookup

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    await sync_admin_from_env()
    yield
    await disconnect_db()


app = FastAPI(title="Dynamus Capital — Captação de Leads API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router, tags=["leads"])
app.include_router(lookup.router, tags=["lookup"])
app.include_router(admin_auth.router, tags=["admin-auth"])


@app.get("/health")
async def health():
    return {"status": "ok"}
