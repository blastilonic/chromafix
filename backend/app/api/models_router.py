import json
import os
from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Models"])

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models_store")


@router.get("/models")
def list_models():
    os.makedirs(MODELS_DIR, exist_ok=True)
    files = [f for f in os.listdir(MODELS_DIR) if f.endswith(".json")]
    models = []
    for f in files:
        path = os.path.join(MODELS_DIR, f)
        with open(path, "r", encoding="utf-8") as file:
            data = json.load(file)
        models.append(
            {
                "id": data.get("id"),
                "name": data.get("name"),
                "description": data.get("description"),
                "created_at": data.get("created_at"),
                "epochs": data.get("epochs"),
                "final_loss": data.get("final_loss"),
                "size": f"{round(os.path.getsize(path) / 1024, 2)} KB",
            }
        )
    return models
