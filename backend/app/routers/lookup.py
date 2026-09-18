import httpx
from fastapi import APIRouter, HTTPException

from app.config import get_settings

router = APIRouter(prefix="/lookup")
settings = get_settings()


@router.get("/cep/{cep}")
async def lookup_cep(cep: str):
    digits = "".join(ch for ch in cep if ch.isdigit())
    if len(digits) != 8:
        raise HTTPException(status_code=422, detail="CEP deve conter 8 dígitos")

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(f"https://viacep.com.br/ws/{digits}/json/")

    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Falha ao consultar CEP")

    data = resp.json()
    if data.get("erro"):
        raise HTTPException(status_code=404, detail="CEP não encontrado")

    return {
        "cep": digits,
        "rua": data.get("logradouro", ""),
        "bairro": data.get("bairro", ""),
        "cidade": data.get("localidade", ""),
        "uf": data.get("uf", ""),
    }


@router.get("/placa/{placa}")
async def lookup_placa(placa: str):
    normalized = placa.upper().replace("-", "").strip()

    if not settings.placa_lookup_url:
        return {
            "placa": normalized,
            "modelo": "",
            "ano": "",
            "aviso": "Provedor de placa não configurado (PLACA_LOOKUP_URL). Preencha manualmente.",
        }

    headers = {}
    if settings.placa_lookup_api_key:
        headers["Authorization"] = f"Bearer {settings.placa_lookup_api_key}"

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(f"{settings.placa_lookup_url}/{normalized}", headers=headers)

    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Falha ao consultar placa")

    data = resp.json()
    return {
        "placa": normalized,
        "modelo": data.get("modelo") or data.get("MODELO", ""),
        "ano": str(data.get("ano") or data.get("ANO", "")),
    }


@router.get("/cpf/{cpf}")
async def lookup_cpf(cpf: str):
    digits = "".join(ch for ch in cpf if ch.isdigit())
    if len(digits) != 11:
        raise HTTPException(status_code=422, detail="CPF deve conter 11 dígitos")

    if not settings.cpf_lookup_url:
        return {
            "cpf": digits,
            "nome": "",
            "data_nascimento": "",
            "aviso": "Provedor de CPF não configurado (CPF_LOOKUP_URL). Preencha manualmente.",
        }

    headers = {}
    if settings.cpf_lookup_api_key:
        headers["Authorization"] = f"Bearer {settings.cpf_lookup_api_key}"

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(f"{settings.cpf_lookup_url}/{digits}", headers=headers)

    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Falha ao consultar CPF")

    data = resp.json()
    return {
        "cpf": digits,
        "nome": data.get("nome", ""),
        "data_nascimento": data.get("data_nascimento", ""),
    }
