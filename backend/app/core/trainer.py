import os
import sys
import json
import torch
import torch.nn as nn
import torch.optim as optim
from datetime import datetime
from pathlib import Path
from torch.utils.data import DataLoader
from app.core.color_net import ColorCorrectionNet
from app.core.dataset import ColorCorrectionDataset


def get_models_directory() -> Path:
    if getattr(sys, "frozen", False):
        base_dir = Path(sys.executable).parent
    else:
        base_dir = Path(__file__).resolve().parent.parent

    models_dir = base_dir / "models_store"
    models_dir.mkdir(parents=True, exist_ok=True)
    return models_dir


MODELS_DIR = get_models_directory()


def run_real_training_stream(
    input_dir: str,
    target_dir: str,
    epochs: int,
    lr: float,
    batch_size: int,
    model_name: str,
    description: str = "",
):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[ChromaFix] Dispositiu d'execució seleccionat: {device}")

    dataset = ColorCorrectionDataset(input_dir=input_dir, target_dir=target_dir)
    if len(dataset) == 0:
        error_data = {"error": "No s'han trobat parelles d'imatges."}
        yield f"data: {json.dumps(error_data)}\n\n"
        return

    dataloader = DataLoader(
        dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=0,
        pin_memory=True if device.type == "cuda" else False,
    )

    model = ColorCorrectionNet().to(device)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)

    model.train()
    for epoch in range(1, epochs + 1):
        epoch_loss = 0.0
        for input_batch, target_batch in dataloader:
            input_batch = input_batch.to(device)
            target_batch = target_batch.to(device)

            optimizer.zero_grad()
            output = model(input_batch)
            loss = criterion(output, target_batch)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item()

        avg_loss = epoch_loss / len(dataloader)

        print(f"[ChromaFix] Epoch [{epoch}/{epochs}] - Loss: {avg_loss:.6f}")

        log_data = {
            "epoch": epoch,
            "total_epochs": epochs,
            "loss": round(avg_loss, 6),
            "message": f"Epoch {epoch}/{epochs} completed - Loss: {avg_loss:.6f}",
        }
        yield f"data: {json.dumps(log_data)}\n\n"

    safe_filename = "".join([c if c.isalnum() else "_" for c in model_name.lower()])
    pth_path = MODELS_DIR / f"{safe_filename}.pth"
    json_path = MODELS_DIR / f"{safe_filename}.json"

    torch.save(model.state_dict(), str(pth_path))

    metadata = {
        "id": safe_filename,
        "name": model_name,
        "description": description,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "epochs": epochs,
        "final_loss": round(avg_loss, 4),
    }

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

    yield f"data: {json.dumps({'status': 'completed', 'metadata': metadata})}\n\n"
