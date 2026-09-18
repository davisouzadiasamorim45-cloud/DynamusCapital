from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database import db
from app.security import decode_access_token

bearer_scheme = HTTPBearer()


async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    email = decode_access_token(credentials.credentials)
    if email is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido ou expirado")

    admin = await db.admin.find_unique(where={"email": email})
    if admin is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin não encontrado")

    return admin
