from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, field_validator

TIPOS_SEGURO = {
    "VIDA",
    "VIDA_EMPRESARIAL",
    "VEICULAR",
    "MOTO",
    "CAMINHAO",
    "CARGA",
    "EMPRESARIAL",
    "RESPONSABILIDADE_CIVIL",
    "RC_PROFISSIONAL",
    "RESIDENCIAL",
    "EVENTOS",
}

TIPOS_VEICULO = {"VEICULAR", "MOTO", "CAMINHAO"}
TIPOS_VIDA = {"VIDA", "VIDA_EMPRESARIAL"}


def only_digits(value: str) -> str:
    return "".join(ch for ch in value if ch.isdigit())


class LeadCreate(BaseModel):
    cpf: str
    nome: str
    dataNascimento: str
    tipoSeguro: str
    placa: Optional[str] = None
    modeloVeiculo: Optional[str] = None
    anoVeiculo: Optional[str] = None
    numeroDependentes: Optional[int] = None
    valorCarga: Optional[str] = None
    observacoes: Optional[str] = None
    cep: str
    rua: str
    numero: str
    complemento: Optional[str] = None
    bairro: str
    email: EmailStr
    celular: str
    origem: Optional[str] = None

    @field_validator("cpf")
    @classmethod
    def validate_cpf(cls, v: str) -> str:
        digits = only_digits(v)
        if len(digits) != 11:
            raise ValueError("CPF deve conter 11 dígitos")
        return digits

    @field_validator("cep")
    @classmethod
    def validate_cep(cls, v: str) -> str:
        digits = only_digits(v)
        if len(digits) != 8:
            raise ValueError("CEP deve conter 8 dígitos")
        return digits

    @field_validator("celular")
    @classmethod
    def validate_celular(cls, v: str) -> str:
        digits = only_digits(v)
        if len(digits) < 10:
            raise ValueError("celular inválido")
        return digits

    @field_validator("tipoSeguro")
    @classmethod
    def validate_tipo(cls, v: str) -> str:
        upper = v.upper()
        if upper not in TIPOS_SEGURO:
            raise ValueError(f"tipoSeguro deve ser um de {sorted(TIPOS_SEGURO)}")
        return upper


class LeadStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        allowed = {"NOVO", "CONTATADO", "COTACAO_ENVIADA", "CONVERTIDO", "PERDIDO"}
        upper = v.upper()
        if upper not in allowed:
            raise ValueError(f"status deve ser um de {allowed}")
        return upper


class LeadOut(BaseModel):
    id: str
    cpf: str
    nome: str
    dataNascimento: str
    tipoSeguro: str
    placa: Optional[str] = None
    modeloVeiculo: Optional[str] = None
    anoVeiculo: Optional[str] = None
    numeroDependentes: Optional[int] = None
    valorCarga: Optional[str] = None
    observacoes: Optional[str] = None
    cep: str
    rua: str
    numero: str
    complemento: Optional[str] = None
    bairro: str
    email: str
    celular: str
    status: str
    origem: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
