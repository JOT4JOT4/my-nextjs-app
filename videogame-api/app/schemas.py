# app/schemas.py
from pydantic import BaseModel, Field
from typing import Optional

class CompanyBase(BaseModel):
    name: str = Field(..., description="Nombre de la compañía de videojuegos")
    founded_year: Optional[int] = None
    employees: Optional[int] = None
    website: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    founded_year: Optional[int] = None
    employees: Optional[int] = None
    website: Optional[str] = None

class CompanyOut(CompanyBase):
    id: str = Field(..., description="ID de la compañía")


class AccionBase(BaseModel):
    company_id: str = Field(..., description="ID de la compañía a la que pertenece")
    valor: float = Field(..., description="Valor actual de la acción")
    historico: list[float] = Field(
        default_factory=list,
        description="Valores anteriores de la acción"
    )
    cambio: float = Field(
        0.0,
        description="Cambio porcentual respecto al valor anterior"
    )

class AccionCreate(BaseModel):
    company_id: str = Field(..., description="ID de la compañía")
    valor: float = Field(..., description="Nuevo valor actual de la acción")
    # 👀 NO pedimos historico ni cambio: eso lo calcula el backend

class AccionUpdate(BaseModel):
    valor: Optional[float] = None  # para futuros updates si quieres

class AccionOut(AccionBase):
    id: str = Field(..., description="ID de la acción (MongoDB)")
