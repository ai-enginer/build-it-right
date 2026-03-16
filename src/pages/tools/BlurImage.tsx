import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BlurImage = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [blur, setBlur] = useState([5]);
  const [resultUrl, setResultUrl] = useState("");

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResultUrl("");
    const img = new window.Image();
    img.onload = () => setImgEl(img);
    img.src = URL.createObjectURL(f);
  }, []);

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const scale = Math.min(600 / imgEl.width, 400 / imgEl.height, 1);
    canvas.width = Math.round(imgEl.width * scale);
    canvas.height = Math.round(imgEl.height * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `blur(${blur[0]}px)`;
    ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  }, [imgEl, blur]);

  const exportImage = () => {
    if (!imgEl) return;
    const canvas = document.createElement("canvas");
    canvas.width = imgEl.width;
    canvas.height = imgEl.height;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `blur(${blur[0]}px)`;
    ctx.drawImage(imgEl, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) { setResultUrl(URL.createObjectURL(blob)); toast({ title: "Blur applied!" }); }
    }, "image/png");
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Blur Image</h1>
        <p className="text-muted-foreground mb-6">Apply blur effects to images</p>

        {!imgEl ? (
          <div className="border-2 border-dashed rounded-xl p-8 text-center" onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <span className="text-muted-foreground">Drop image here or click to upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center bg-muted/30 rounded-lg p-2">
              <canvas ref={canvasRef} className="rounded" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Blur Radius: {blur[0]}px</span>
              </div>
              <Slider value={blur} onValueChange={setBlur} min={0} max={30} step={1} />
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={exportImage}>Apply & Export</Button>
              {resultUrl && <Button variant="outline" asChild><a href={resultUrl} download={`blurred-${file?.name}`}><Download className="h-4 w-4 mr-2" /> Download</a></Button>}
              <Button variant="ghost" onClick={() => { setImgEl(null); setFile(null); setResultUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default BlurImage;
