from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.transform_router import router as transform_router
from app.api.models_router import router as models_router
from app.api.train_router import router as train_router

app = FastAPI(
    title="ChromaFix API",
    description="Backend per a l'entrenament i inferència de models de correcció de color.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transform_router)
app.include_router(models_router)
app.include_router(train_router)


@app.get("/")
def read_root():
    return {"message": "API de ChromaFix en funcionament!"}


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
