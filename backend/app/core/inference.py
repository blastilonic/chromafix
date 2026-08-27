import io
import os
import torch
from PIL import Image
from torchvision import transforms
from app.core.color_net import ColorCorrectionNet
from app.core.trainer import MODELS_DIR

transform_in = transforms.Compose([transforms.ToTensor()])

transform_out = transforms.ToPILImage()


def process_image(image_bytes: bytes, model_id: str) -> bytes:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = transform_in(image).unsqueeze(0)
    model = ColorCorrectionNet()
    pth_path = MODELS_DIR / f"{model_id}.pth"

    if pth_path.exists():
        try:
            state_dict = torch.load(pth_path, map_location=torch.device("cpu"))
            model.load_state_dict(state_dict)
            print(f"[ChromaFix] Model correctly loaded: {pth_path}")
        except Exception as e:
            print(f"[ChromaFix] Error loading weights from {pth_path}: {e}")
    else:
        print(f"[ChromaFix] WARNING: Can't find the path: {pth_path}.")

    model.eval()

    with torch.no_grad():
        output_tensor = model(input_tensor)

    output_image = transform_out(output_tensor.squeeze(0))

    buffer = io.BytesIO()
    output_image.save(buffer, format="PNG")
    return buffer.getvalue()
