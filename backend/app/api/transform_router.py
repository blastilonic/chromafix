from fastapi import APIRouter, UploadFile, File, Form, Response, HTTPException
from app.core.inference import process_image

router = APIRouter(prefix="/api", tags=["Transformació"])


@router.post("/transform")
async def transform_image(
    file: UploadFile = File(...),
    model_id: str = Form(...),
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="The file must be an image.")

    contents = await file.read()
    output_bytes = process_image(contents, model_id=model_id)

    return Response(content=output_bytes, media_type="image/png")
