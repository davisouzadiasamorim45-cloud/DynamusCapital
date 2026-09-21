from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, model_validator, field_validator

TIPOS_SEGURO = {
    "VIDA",
    "VIDA_EMPRESARIAL",
    "VEICULAR",
    "MOTO",
    "CAMINHAO",
    "EMPRESARIAL",
    "RESPONSABILIDADE_CIVIL",
    "RC_PROFISSIONAL",
    "RESIDENCIAL",
    "EVENTOS",
}

TIPOS_VEICULO = {"VEICULAR", "MOTO", "CAMINHAO"}
# Vida e Residencial pedem o valor de cobertura
TIPOS_COBERTURA = {"VIDA", "RESIDENCIAL"}
TIPOS_PESSOA = {"PF", "PJ"}


def only_digits(value: str) -> str:
    return "".join(ch for ch in value if ch.isdigit())


def is_valid_cpf(digits: str) -> bool:
    if len(digits) != 11 or len(set(digits)) == 1:
        return False
    for length in (9, 10):
        total = sum(int(digits[i]) * (length + 1 - i) for i in range(length))
        check = (total * 10) % 11
        if (0 if check == 10 else check) != int(digits[length]):
            return False
    return True


def is_valid_cnpj(digits: str) -> bool:
    if len(digits) != 14 or len(set(digits)) == 1:
        return False
    weights_12 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    weights_13 = [6] + weights_12
    for weights, position in ((weights_12, 12), (weights_13, 13)):
        rest = sum(int(digits[i]) * w for i, w in enumerate(weights)) % 11
        if (0 if rest < 2 else 11 - rest) != int(digits[position]):
            return False
    return True


class LeadCreate(BaseModel):
    tipoPessoa: str = "PF"
    # CPF (PF) ou CNPJ (PJ); grava só os dígitos
    documento: str
    # Nome completo (PF) ou razão social (PJ)
    nome: str
    # Data de nascimento (PF) ou de abertura da empresa (PJ)
    dataNascimento: str
    tipoSeguro: str
    placa: Optional[str] = None
    modeloVeiculo: Optional[str] = None
    anoVeiculo: Optional[str] = None
    # Vida em Grupo: número de vidas na empresa
    numeroDependentes: Optional[int] = None
    valorCobertura: Optional[str] = None
    profissao: Optional[str] = None
    valorRisco: Optional[str] = None
    observacoes: Optional[str] = None
    cep: str
    rua: str
    numero: str
    complemento: Optional[str] = None
    bairro: str
    cidade: str
    uf: str
    email: EmailStr
    celular: str
    origem: Optional[str] = None

    @field_validator("tipoPessoa")
    @classmethod
    def validate_tipo_pessoa(cls, v: str) -> str:
        upper = v.upper()
        if upper not in TIPOS_PESSOA:
            raise ValueError("tipoPessoa deve ser PF ou PJ")
        return upper

    @field_validator("cep")
    @classmethod
    def validate_cep(cls, v: str) -> str:
        digits = only_digits(v)
        if len(digits) != 8:
            raise ValueError("CEP deve conter 8 dígitos")
        return digits

    @field_validator("uf")
    @classmethod
    def validate_uf(cls, v: str) -> str:
        upper = v.strip().upper()
        if len(upper) != 2 or not upper.isalpha():
            raise ValueError("UF deve conter 2 letras")
        return upper

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

    @model_validator(mode="after")
    def validate_documento(self):
        digits = only_digits(self.documento)
        if self.tipoPessoa == "PJ":
            if not is_valid_cnpj(digits):
                raise ValueError("CNPJ inválido")
        elif not is_valid_cpf(digits):
            raise ValueError("CPF inválido")
        self.documento = digits
        return self


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
    tipoPessoa: str
    documento: str
    nome: str
    dataNascimento: str
    tipoSeguro: str
    placa: Optional[str] = None
    modeloVeiculo: Optional[str] = None
    anoVeiculo: Optional[str] = None
    numeroDependentes: Optional[int] = None
    valorCobertura: Optional[str] = None
    profissao: Optional[str] = None
    valorRisco: Optional[str] = None
    observacoes: Optional[str] = None
    cep: str
    rua: str
    numero: str
    complemento: Optional[str] = None
    bairro: str
    cidade: str
    uf: str
    email: str
    celular: str
    status: str
    origem: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
