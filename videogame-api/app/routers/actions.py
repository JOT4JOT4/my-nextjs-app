from fastapi import APIRouter, HTTPException, status , Body
from typing import List
from bson import ObjectId

from app.db import db
from app.schemas import AccionCreate, AccionOut

router = APIRouter(prefix="/acciones", tags=["acciones"])

def get_accion_collection():
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available yet"
        )
    return db["acciones"]

def map_accion(doc) -> AccionOut:
    return AccionOut(
        id=str(doc["_id"]),
        company_id=str(doc["company_id"]),
        valor=doc["valor"],
        historico=doc.get("historico", []),
        cambio=doc.get("cambio", 0.0),
    )

@router.get("", response_model=List[AccionOut])
async def list_acciones():
    col = get_accion_collection()
    acciones: list[AccionOut] = []
    cursor = col.find({})
    async for doc in cursor:
        acciones.append(map_accion(doc))
    return acciones

@router.post("/actualizar_valor", response_model=AccionOut)
async def actualizar_valor(accion: AccionCreate):
    col = get_accion_collection()

    try:
        company_oid = ObjectId(accion.company_id)
    except Exception:
        raise HTTPException(status_code=400, detail="company_id inválido")

    doc = await col.find_one({"company_id": company_oid})

    nuevo_valor = accion.valor

    if doc is None:

        new_doc = {
            "company_id": company_oid,
            "valor": nuevo_valor,
            "historico": [],
            "cambio": 0.0  
        }
        result = await col.insert_one(new_doc)
        created = await col.find_one({"_id": result.inserted_id})
        return map_accion(created)

    valor_anterior = doc["valor"]
    historico = doc.get("historico", [])

    historico.append(valor_anterior)

    if valor_anterior != 0:
        cambio = ((nuevo_valor - valor_anterior) / valor_anterior) * 100
    else:
        cambio = 0.0 

    await col.update_one(
        {"_id": doc["_id"]},
        {
            "$set": {
                "valor": nuevo_valor,
                "historico": historico,
                "cambio": cambio
            }
        }
    )

    updated = await col.find_one({"_id": doc["_id"]})
    return map_accion(updated)   
