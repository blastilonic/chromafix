import { useState, useEffect, useCallback } from "react";
import { fetchModels, transformImage } from "@/services/api";
import ModelSelector from "@/components/transform/ModelSelector";
import TransformControl from "@/components/transform/TransformControl";
import ImageComparer from "@/components/transform/ImageComparer";
import { useTranslation } from "react-i18next";

export default function TransformPage() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  const loadModels = useCallback(async () => {
    setIsLoadingModels(true);
    try {
      const data = await fetchModels();
      setModels(data);
      setSelectedModelId((currentSelectedModelId) => {
        if (data.length > 0 && !currentSelectedModelId) {
          return data[0].id;
        }
        return currentSelectedModelId;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingModels(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadModels();
  }, [loadModels]);

  const handleTransform = async (file, previewUrl) => {
    if (!file || !selectedModelId) return;

    setBeforeImage(previewUrl);
    setAfterImage(null);
    setIsProcessing(true);

    try {
      const resultUrl = await transformImage(file, selectedModelId);
      setAfterImage(resultUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {t("transform.title")}
        </h2>
        <p className="text-slate-400 text-sm">{t("transform.description")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransformControl
          onTransform={handleTransform}
          isProcessing={isProcessing}
        />
        <ModelSelector
          models={models}
          selectedModelId={selectedModelId}
          onSelectModel={setSelectedModelId}
          onRefresh={loadModels}
          isLoading={isLoadingModels}
        />
      </div>
      <ImageComparer
        beforeImage={beforeImage}
        afterImage={afterImage}
        isProcessing={isProcessing}
      />
    </div>
  );
}
