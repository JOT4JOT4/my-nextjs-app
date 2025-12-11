# app/db.py
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "videogames_db")

client: AsyncIOMotorClient | None = None
db = None

async def connect_to_mongo():
    global client, db
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client[MONGO_DB_NAME]
        print("✅ Conectado (o al menos configurado) a MongoDB")
    except Exception as e:
        # No tiramos la app, solo mostramos el problema
        print("⚠️ No se pudo conectar a MongoDB:", e)
        client = None
        db = None

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("🔌 Conexión a MongoDB cerrada")
