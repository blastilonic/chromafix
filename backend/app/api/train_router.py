from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional
from app.core.trainer import run_real_training_stream

router = APIRouter(prefix="/api", tags=["Entrenament"])


class TrainRequest(BaseModel):
    input_dir: str = Field(default="", alias="inputDir")
    target_dir: str = Field(default="", alias="targetDir")
    epochs: int = Field(default=10, alias="epochs")
    lr: float = Field(default=0.001, alias="lr")
    batch_size: int = Field(default=16, alias="batchSize")
    model_name: str = Field(..., alias="modelName")
    description: Optional[str] = Field(default="", alias="description")


@router.post("/train")
async def train_model(req: TrainRequest):
    return StreamingResponse(
        run_real_training_stream(
            input_dir=req.input_dir,
            target_dir=req.target_dir,
            epochs=req.epochs,
            lr=req.lr,
            batch_size=req.batch_size,
            model_name=req.model_name,
            description=req.description or "",
        ),
        media_type="text/event-stream",
    )
