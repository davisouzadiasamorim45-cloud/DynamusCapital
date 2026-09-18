from fastapi import APIRouter, HTTPException, status

from app.database import db
from app.schemas.admin import AdminLogin, AdminToken
from app.security import create_access_token, verify_password

router = APIRouter(prefix="/admin/auth")


@router.post("/login", response_model=AdminToken)
async def login(payload: AdminLogin):
    admin = await db.admin.find_unique(where={"email": payload.email})
    if admin is None or not verify_password(payload.senha, admin.senha):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="E-mail ou senha inválidos")

    token = create_access_token(subject=admin.email)
    return AdminToken(access_token=token, nome=admin.nome, email=admin.email)
