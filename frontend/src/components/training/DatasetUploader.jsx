import { useState } from "react";
import { FolderUp, CheckCircle, Folder } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function DatasetUploader({ onDatasetSelect }) {
  const [inputPath, setInputPath] = useState("");
  const [targetPath, setTargetPath] = useState("");

  const notifyParent = (input, target) => {
    if (onDatasetSelect) {
      onDatasetSelect({
        inputDir: input,
        targetDir: target,
      });
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replaceAll("\\", "/");
    setInputPath(val);
    notifyParent(val, targetPath);
  };

  const handleTargetChange = (e) => {
    const val = e.target.value.replaceAll("\\", "/");
    setTargetPath(val);
    notifyParent(inputPath, val);
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <FolderUp className="w-5 h-5 text-indigo-400" />
          Dataset d'Entrenament
        </CardTitle>
        <CardDescription className="text-slate-400">
          Introdueix les rutes on es troben les imatges del datset.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <Folder className="w-4 h-4 text-indigo-400" />
            Ruta Carpeta Imatges d'Entrada (Abans)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputPath}
              onChange={handleInputChange}
              placeholder="Ex: C:/before"
              className="w-full p-2.5 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
            {inputPath && (
              <CheckCircle className="w-5 h-5 text-emerald-400 my-auto shrink-0" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <Folder className="w-4 h-4 text-indigo-400" />
            Ruta Carpeta Imatges Objectiu (Després)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={targetPath}
              onChange={handleTargetChange}
              placeholder="Ex: C:/after"
              className="w-full p-2.5 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
            {targetPath && (
              <CheckCircle className="w-5 h-5 text-emerald-400 my-auto shrink-0" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
