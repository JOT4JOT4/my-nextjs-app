# app/routers/companies.py
from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId

from app.db import db
from app.schemas import CompanyCreate, CompanyUpdate, CompanyOut

router = APIRouter(prefix="/companies", tags=["companies"])

def get_company_collection():
    if db is None:
        # La base aún no está lista
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available yet"
        )
    return db["companies"]

def map_company(doc) -> CompanyOut:
    return CompanyOut(
        id=str(doc["_id"]),
        name=doc.get("name"),
        founded_year=doc.get("founded_year"),
        employees=doc.get("employees"),
        website=doc.get("website"),
    )

@router.get("", response_model=List[CompanyOut])
async def list_companies():
    collection = get_company_collection()
    companies: list[CompanyOut] = []
    cursor = collection.find({})
    async for doc in cursor:
        companies.append(map_company(doc))
    return companies

@router.get("/{company_id}", response_model=CompanyOut)
async def get_company(company_id: str):
    collection = get_company_collection()
    try:
        oid = ObjectId(company_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid company id")

    doc = await collection.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Company not found")
    return map_company(doc)

@router.post("", response_model=CompanyOut, status_code=201)
async def create_company(company: CompanyCreate):
    collection = get_company_collection()
    result = await collection.insert_one(company.model_dump())
    new_doc = await collection.find_one({"_id": result.inserted_id})
    return map_company(new_doc)

@router.put("/{company_id}", response_model=CompanyOut)
async def update_company(company_id: str, data: CompanyUpdate):
    collection = get_company_collection()
    try:
        oid = ObjectId(company_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid company id")

    update_data = {k: v for k, v in data.model_dump().items() if v is not None}

    result = await collection.update_one({"_id": oid}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")

    doc = await collection.find_one({"_id": oid})
    return map_company(doc)

@router.delete("/{company_id}")
async def delete_company(company_id: str):
    collection = get_company_collection()
    try:
        oid = ObjectId(company_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid company id")

    result = await collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")

    return {"message": "Company deleted"}
