<p align="center">
  <img src="./frontend/public/favicon.svg" alt="ChromaFix Logo" width="120" />
</p>

<h1 align="center">ChromaFix</h1>

<p align="center">
  A web-based GUI to train custom <code>ColorCorrectionNet</code> CNN models for image color correction and run real-time inference.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python 3.12" />
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch" />
</p>

---

## Quick Start

To run the application locally, start both the backend and frontend servers:

```bash
# 1. Start the Backend
cd backend
uvicorn backend.app.main:app --reload

# 2. Start the Frontend
cd frontend
npm run dev
```

---

## How to Use ChromaFix

### Train a Model

- Create two folders containing identical image filenames (e.g., `input/01.png` and `target/01.png`).
- Paste the absolute local folder paths into **Input Images Path (Before)** and **Target Images Path (After)**.
- Set your **Model Name**, **Epochs**, **Batch Size**, and **Learning Rate**, then click **Start Training**. Monitor real-time progress, loss metrics, and terminal logs in the panel below. Once completed, the `.pth` weights and `.json` metadata are automatically stored.

---

### Apply Correction

- Upload an Image
- Choose your trained `.pth` model from the dropdown menu in **Correction Model**.
- Click **Apply Color Correction** to generate and display the side-by-side comparative output.
