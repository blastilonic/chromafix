import { useState } from "react";
import { Upload, Play, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function TransformControl({ onTransform, isProcessing }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRunTransform = () => {
    if (selectedFile && onTransform) {
      onTransform(selectedFile, previewUrl);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <Upload className="w-5 h-5 text-indigo-400" />
          {t("transform.imageSelector.title")}
        </CardTitle>
        <CardDescription className="text-slate-400">
          {t("transform.imageSelector.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 cursor-pointer bg-slate-950/40 hover:bg-slate-950/80 transition-all text-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
          <ImageIcon className="w-10 h-10 text-slate-500 mb-2" />
          <span className="text-sm font-medium text-slate-300">
            {t("transform.imageSelector.step")}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {t("transform.imageSelector.formats")}
          </span>
        </label>

        {selectedFile && (
          <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg text-sm">
            <div className="flex items-center gap-2 truncate pr-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium text-slate-200 truncate">
                {selectedFile.name}
              </span>
            </div>
            <span className="text-xs text-slate-500 shrink-0">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        )}

        <Button
          onClick={handleRunTransform}
          disabled={!selectedFile || isProcessing}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          {isProcessing ? "Processant..." : "Aplicar Correcció de Color"}
        </Button>
      </CardContent>
    </Card>
  );
}
