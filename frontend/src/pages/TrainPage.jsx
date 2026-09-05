import { useState, useRef } from "react";
import DatasetUploader from "@/components/training/DatasetUploader";
import TrainingConfig from "@/components/training/TrainingConfig";
import TrainingProgress from "@/components/training/TrainingProgress";
import { Terminal, Loader2 } from "lucide-react";
import { startTraining } from "@/services/api";
import { useTranslation } from "react-i18next";

export default function TrainPage() {
  const [datasetInfo, setDatasetInfo] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [localLogs, setLocalLogs] = useState([]);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [totalEpochs, setTotalEpochs] = useState(100);
  const [currentLoss, setCurrentLoss] = useState(null);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState("--:--");
  const startTimeRef = useRef(null);
  const { t } = useTranslation();

  const addLog = (type, message) => {
    const time = new Date().toLocaleTimeString();
    const newLog = { time, type, message };
    setLocalLogs((prev) => [...prev, newLog]);
  };

  const handleDatasetSelect = (data) => {
    setDatasetInfo(data);
  };

  const formatETA = (seconds) => {
    if (!isFinite(seconds) || seconds < 0) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (mins > 60) {
      const hrs = Math.floor(mins / 60);
      const remMins = mins % 60;
      return `${hrs}h ${remMins}m`;
    }
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const handleStartTraining = async (config) => {
    if (!datasetInfo || !datasetInfo.inputDir || !datasetInfo.targetDir) {
      addLog(t("train.warning"), t("train.warningDescription"));
      return;
    }

    setIsTraining(true);
    setCurrentEpoch(0);
    setTotalEpochs(config.epochs);
    setCurrentLoss(null);
    setEstimatedTimeLeft("Calculant...");
    startTimeRef.current = Date.now();

    addLog(
      t("train.info"),
      `${t("train.infoDescription")} ${config.modelName} (${config.epochs} ${t("train.epochs")}, ${t("train.config.batchSize")}: ${config.batchSize}, lr: ${config.learningRate})...`,
    );

    try {
      const response = await startTraining(config, datasetInfo);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.replace("data: ", "").trim();
            if (!jsonStr) continue;

            try {
              const parsed = JSON.parse(jsonStr);

              if (parsed.epoch !== undefined) {
                setCurrentEpoch(parsed.epoch);
                setTotalEpochs(parsed.total_epochs || config.epochs);
                setCurrentLoss(parsed.loss);

                const elapsedSeconds =
                  (Date.now() - startTimeRef.current) / 1000;
                const avgTimePerEpoch = elapsedSeconds / parsed.epoch;
                const remainingEpochs = parsed.total_epochs - parsed.epoch;
                const secondsLeft = avgTimePerEpoch * remainingEpochs;

                setEstimatedTimeLeft(
                  remainingEpochs === 0 ? "00:00" : formatETA(secondsLeft),
                );
              }

              if (parsed.message) {
                addLog("info", parsed.message);
              } else if (parsed.status === "completed") {
                setCurrentEpoch(config.epochs);
                setEstimatedTimeLeft("Completat");
                addLog(
                  t("train.console.success"),
                  `${t("train.console.completed")} ${parsed.metadata?.final_loss ?? "N/A"}`,
                );
                addLog(
                  t("train.console.success"),
                  `${t("train.console.saved")} /models_store/${parsed.metadata?.id}.pth`,
                );
              } else if (parsed.error) {
                addLog("error", `Error: ${parsed.error}`);
              }
            } catch (err) {
              console.error("Error processant línia SSE:", err);
            }
          }
        }
      }
    } catch (error) {
      addLog("error", `Error en l'entrenament: ${error.message}`);
      setEstimatedTimeLeft("--:--");
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {t("train.title")}
        </h2>
        <p className="text-slate-400 text-sm">{t("train.description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <DatasetUploader onDatasetSelect={handleDatasetSelect} />
        </div>
        <TrainingConfig
          onStartTraining={handleStartTraining}
          isTraining={isTraining}
        />
      </div>
      <div className="space-y-12">
        <TrainingProgress
          currentEpoch={currentEpoch}
          totalEpochs={totalEpochs}
          currentLoss={currentLoss}
          estimatedTimeLeft={estimatedTimeLeft}
          isTraining={isTraining}
        />
      </div>
      <div className="space-y-12">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col h-[280px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>{t("train.console.title")}</span>
            </div>
            {isTraining && (
              <span className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                {t("train.console.processing")}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2">
            {localLogs.length === 0 ? (
              <p className="text-slate-500 italic">
                {t("train.console.label")}
              </p>
            ) : (
              localLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-slate-500 select-none">
                    [{log.time}]
                  </span>
                  <span
                    className={
                      log.type === "error"
                        ? "text-rose-400"
                        : log.type === "success"
                          ? "text-emerald-400"
                          : log.type === "warning"
                            ? "text-amber-400"
                            : "text-slate-300"
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
