from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import connect_to_mongo, close_mongo_connection
from app.routers import companies, actions

app = FastAPI(
    title="Video Game Companies API",
    description="API para gestionar compañías de videojuegos",
    version="0.1.0",
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

app.include_router(companies.router)
app.include_router(acciones.router)

@app.get("/")
async def root():
    return {"message": "Video Game Companies API is running"}
