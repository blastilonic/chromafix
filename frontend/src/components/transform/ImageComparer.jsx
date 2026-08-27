import { Sparkles, Download } from "lucide-react";
import ReactCompareImage from "react-compare-image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ImageComparer({
  beforeImage = null,
  afterImage = null,
  isProcessing = false,
}) {
  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Comparativa
          </CardTitle>
          <CardDescription className="text-slate-400">
            Compara el resultat amb la imatge original.
          </CardDescription>
        </div>
        {afterImage && !isProcessing && (
          <a href={afterImage} download="chromafix-result.png">
            <Button
              size="sm"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Guardar
            </Button>
          </a>
        )}
      </CardHeader>
      <CardContent>
        {isProcessing ? (
          <div className="h-80 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-slate-400">Processant imatge...</span>
          </div>
        ) : !beforeImage ? (
          <div className="h-80 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-sm">
            Aplica la correcció per veure la comparativa
          </div>
        ) : (
          <div className="mx-auto max-h-600px] max-w-5xl overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
            <ReactCompareImage
              leftImage={beforeImage}
              rightImage={afterImage || beforeImage}
              leftImageAlt="Original"
              rightImageAlt="Després"
              leftImageLabel="Original"
              rightImageLabel="Corregit"
              leftImageCss={{ objectFit: "contain" }}
              rightImageCss={{ objectFit: "contain" }}
              sliderPositionPercentage={0.5}
              sliderLineColor="#818cf8"
              sliderLineWidth={2}
              handleSize={40}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
