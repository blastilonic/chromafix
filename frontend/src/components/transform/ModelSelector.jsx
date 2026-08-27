import { Cpu, RefreshCw } from "lucide-react";

export default function ModelSelector({
  models = [],
  selectedModelId,
  onSelectModel,
  onRefresh,
  isLoading = false,
}) {
  const selectedModel = models.find((model) => model.id === selectedModelId);

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5 text-slate-100">
      <div className="mb-4 flex items-center justify-between gap-3">
        <label
          htmlFor="model"
          className="flex items-center gap-2 font-semibold"
        >
          <Cpu className="h-5 w-5 text-indigo-400" />
          Model de correcció
        </label>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Actualitzar models"
            title="Actualitzar models"
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        )}
      </div>

      <select
        id="model"
        value={selectedModelId ?? ""}
        onChange={(event) => onSelectModel?.(event.target.value)}
        disabled={isLoading || models.length === 0}
        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
      >
        <option value="">
          {isLoading ? "Carregant models..." : "Selecciona un model"}
        </option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      {selectedModel && (
        <div className="mt-3 border-t border-slate-800 pt-3 text-xs text-slate-400">
          <p className="truncate font-medium text-slate-200">
            {selectedModel.name}
          </p>
          {selectedModel.description && (
            <p className="mt-1 truncate">{selectedModel.description}</p>
          )}
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-2">
            <div>
              <dt>Voltes</dt>
              <dd className="text-slate-200">{selectedModel.epochs ?? "-"}</dd>
            </div>
            <div>
              <dt>Pèrdua final</dt>
              <dd className="text-slate-200">
                {selectedModel.final_loss ?? "-"}
              </dd>
            </div>
          </dl>
          <dl className="mt-4 grid grid-cols-6 gap-x-6 gap-y-2 sm:grid-cols-2">
            <div>
              <dt>Mida</dt>
              <dd className="text-slate-200">{selectedModel.size ?? "-"}</dd>
            </div>
            <div>
              <dt>Data</dt>
              <dd className="text-slate-200">
                {selectedModel.created_at ?? "-"}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
}
