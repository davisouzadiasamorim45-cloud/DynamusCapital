from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.database import db
from app.dependencies import get_current_admin
from app.schemas.lead import TIPOS_VEICULO, TIPOS_VIDA, LeadCreate, LeadOut, LeadStatusUpdate

router = APIRouter()


@router.post("/leads", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
async def create_lead(payload: LeadCreate):
    if payload.tipoSeguro in TIPOS_VEICULO and not payload.placa:
        raise HTTPException(status_code=422, detail="placa é obrigatória para esse tipo de seguro")
    if payload.tipoSeguro in TIPOS_VIDA and payload.numeroDependentes is None:
        raise HTTPException(status_code=422, detail="numeroDependentes é obrigatório para esse tipo de seguro")

    lead = await db.lead.create(data=payload.model_dump())
    return lead


@router.get("/admin/leads", response_model=list[LeadOut])
async def list_leads(
    status_filter: Optional[str] = Query(None, alias="status"),
    tipo_seguro: Optional[str] = None,
    cidade: Optional[str] = None,
    data_inicio: Optional[datetime] = None,
    data_fim: Optional[datetime] = None,
    busca: Optional[str] = None,
    admin=Depends(get_current_admin),
):
    where: dict = {}
    if status_filter:
        where["status"] = status_filter.upper()
    if tipo_seguro:
        where["tipoSeguro"] = tipo_seguro.upper()
    if cidade:
        where["bairro"] = {"contains": cidade, "mode": "insensitive"}
    if data_inicio or data_fim:
        created: dict = {}
        if data_inicio:
            created["gte"] = data_inicio
        if data_fim:
            created["lte"] = data_fim
        where["createdAt"] = created
    if busca:
        where["OR"] = [
            {"nome": {"contains": busca, "mode": "insensitive"}},
            {"cpf": {"contains": busca}},
        ]

    leads = await db.lead.find_many(where=where, order={"createdAt": "desc"})
    return leads


@router.get("/admin/leads/{lead_id}", response_model=LeadOut)
async def get_lead(lead_id: str, admin=Depends(get_current_admin)):
    lead = await db.lead.find_unique(where={"id": lead_id})
    if lead is None:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    return lead


@router.patch("/admin/leads/{lead_id}", response_model=LeadOut)
async def update_lead_status(lead_id: str, payload: LeadStatusUpdate, admin=Depends(get_current_admin)):
    lead = await db.lead.find_unique(where={"id": lead_id})
    if lead is None:
        raise HTTPException(status_code=404, detail="Lead não encontrado")

    updated = await db.lead.update(where={"id": lead_id}, data={"status": payload.status})
    return updated
