from pydantic import BaseModel, EmailStr


class AdminLogin(BaseModel):
    email: EmailStr
    senha: str


class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    nome: str
    email: str
