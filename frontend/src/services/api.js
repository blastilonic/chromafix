const API_BASE_URL = "http://localhost:8000/api";

export async function fetchModels() {
  const res = await fetch(`${API_BASE_URL}/models`);
  if (!res.ok) throw new Error("Error en carregar els models");
  return res.json();
}

export async function transformImage(file, modelId) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model_id", modelId);

  const res = await fetch(`${API_BASE_URL}/transform`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Error durant la transformació de la imatge");
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

export async function startTraining(config, datasetInfo) {
  const res = await fetch(`${API_BASE_URL}/train`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputDir: datasetInfo.inputDir,
      targetDir: datasetInfo.targetDir,
      epochs: config.epochs,
      batchSize: Number(config.batchSize),
      lr: Number(config.learningRate),
      modelName: config.modelName,
      description: config.description || "",
    }),
  });

  if (!res.ok) throw new Error("Error en iniciar l'entrenament");
  return res;
}
