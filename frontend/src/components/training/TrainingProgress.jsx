import { Activity, Clock, Flame, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrainingProgress({
  currentEpoch = 0,
  totalEpochs = 100,
  currentLoss = null,
  estimatedTimeLeft = "--:--",
  isTraining = false,
}) {
  const percentage =
    totalEpochs > 0
      ? Math.min(Math.round((currentEpoch / totalEpochs) * 100), 100)
      : 0;
  const isCompleted =
    !isTraining && currentEpoch > 0 && currentEpoch === totalEpochs;

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <span>Progrés de l'Entrenament</span>
          </div>
          {isTraining && (
            <span className="flex items-center gap-1.5 text-xs font-normal text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              En procés
            </span>
          )}
          {isCompleted && (
            <span className="flex items-center gap-1.5 text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completat
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Barra de progrés */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>
              Època {currentEpoch} de {totalEpochs}
            </span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isCompleted ? "bg-emerald-500" : "bg-indigo-600"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Mètriques clau */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Mètrica Loss */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-md text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Pèrdua (Loss)
              </span>
              <span className="text-sm font-semibold text-slate-200">
                {currentLoss !== null && currentLoss !== undefined
                  ? Number(currentLoss).toFixed(6)
                  : "--"}
              </span>
            </div>
          </div>

          {/* Mètrica Temps Restant */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Temps Restant
              </span>
              <span className="text-sm font-semibold text-slate-200">
                {estimatedTimeLeft}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
