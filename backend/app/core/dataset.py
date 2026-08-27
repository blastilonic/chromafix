import os
from PIL import Image
from torch.utils.data import Dataset
from torchvision import transforms


class ColorCorrectionDataset(Dataset):
    def __init__(self, input_dir: str, target_dir: str, image_size=(256, 256)):
        self.input_dir = input_dir
        self.target_dir = target_dir

        valid_exts = (".png", ".jpg", ".jpeg", ".webp")
        self.filenames = sorted(
            [
                f
                for f in os.listdir(input_dir)
                if f.lower().endswith(valid_exts)
                and os.path.exists(os.path.join(target_dir, f))
            ]
        )

        self.transform = transforms.Compose(
            [transforms.Resize(image_size), transforms.ToTensor()]
        )

    def __len__(self):
        return len(self.filenames)

    def __getitem__(self, idx):
        filename = self.filenames[idx]

        input_path = os.path.join(self.input_dir, filename)
        target_path = os.path.join(self.target_dir, filename)

        input_img = Image.open(input_path).convert("RGB")
        target_img = Image.open(target_path).convert("RGB")

        return self.transform(input_img), self.transform(target_img)
