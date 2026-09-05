import { useState } from "react";
import { Settings, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function TrainingConfig({ onStartTraining, isTraining }) {
  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [epochs, setEpochs] = useState(50);
  const [batchSize, setBatchSize] = useState(16);
  const [learningRate, setLearningRate] = useState(0.001);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onStartTraining) {
      onStartTraining({
        modelName,
        description,
        epochs,
        batchSize,
        learningRate,
      });
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <Settings className="w-5 h-5 text-indigo-400" />
          {t("train.config.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                {t("train.config.name")}
              </label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                required
                placeholder={t("train.config.name")}
                className="w-full p-2 text-sm rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                {t("train.config.description")}
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("train.config.description")}
                className="w-full p-2 text-sm rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                {t("train.config.epochs")}
              </label>
              <input
                type="number"
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
                min={1}
                className="w-full p-2 text-sm rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                {t("train.config.batchSize")}
              </label>
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full p-2 text-sm rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                {t("train.config.learningRate")}
              </label>
              <input
                type="number"
                step="0.0001"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="w-full p-2 text-sm rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isTraining}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            {isTraining
              ? t("train.config.btnStarted")
              : t("train.config.btnStart")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
