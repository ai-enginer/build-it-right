import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download, Crop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PRESETS = [
  { label: "Free", ratio: 0 },
  { label: "1:1", ratio: 1 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "3:2", ratio: 3 / 2 },
  { label: "2:3", ratio: 2 / 3 },
];

const ImageCropper = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [croppedUrl, setCroppedUrl] = useState("");
  const [cropRect, setCropRect] = useState({ x: 0, y: 0, w: 200, h: 200 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, cx: 0, cy: 0 });
  const [selectedRatio, setSelectedRatio] = useState(0);
  const [canvasScale, setCanvasScale] = useState(1);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setCroppedUrl("");
    const img = new window.Image();
    img.onload = () => {
      setImgEl(img);
      const scale = Math.min(600 / img.width, 400 / img.height, 1);
      setCanvasScale(scale);
      const cw = Math.round(img.width * scale);
      const ch = Math.round(img.height * scale);
      const cs = Math.min(cw, ch, 200);
      setCropRect({ x: Math.round((cw - cs) / 2), y: Math.round((ch - cs) / 2), w: cs, h: cs });
    };
    img.src = URL.createObjectURL(f);
  }, []);

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const cw = Math.round(imgEl.width * canvasScale);
    const ch = Math.round(imgEl.height * canvasScale);
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgEl, 0, 0, cw, ch);
    // Darken outside crop
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, cw, cropRect.y);
    ctx.fillRect(0, cropRect.y, cropRect.x, cropRect.h);
    ctx.fillRect(cropRect.x + cropRect.w, cropRect.y, cw - cropRect.x - cropRect.w, cropRect.h);
    ctx.fillRect(0, cropRect.y + cropRect.h, cw, ch - cropRect.y - cropRect.h);
    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropRect.x, cropRect.y, cropRect.w, cropRect.h);
    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(cropRect.x + cropRect.w * i / 3, cropRect.y); ctx.lineTo(cropRect.x + cropRect.w * i / 3, cropRect.y + cropRect.h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cropRect.x, cropRect.y + cropRect.h * i / 3); ctx.lineTo(cropRect.x + cropRect.w, cropRect.y + cropRect.h * i / 3); ctx.stroke();
    }
  }, [imgEl, cropRect, canvasScale]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= cropRect.x && x <= cropRect.x + cropRect.w && y >= cropRect.y && y <= cropRect.y + cropRect.h) {
      setDragging(true);
      setDragStart({ x, y, cx: cropRect.x, cy: cropRect.y });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxX = canvasRef.current.width - cropRect.w;
    const maxY = canvasRef.current.height - cropRect.h;
    setCropRect(prev => ({
      ...prev,
      x: Math.max(0, Math.min(maxX, dragStart.cx + (x - dragStart.x))),
      y: Math.max(0, Math.min(maxY, dragStart.cy + (y - dragStart.y))),
    }));
  };

  const onMouseUp = () => setDragging(false);

  const applyPreset = (ratio: number) => {
    setSelectedRatio(ratio);
    if (!canvasRef.current || ratio === 0) return;
    const cw = canvasRef.current.width;
    const ch = canvasRef.current.height;
    let w: number, h: number;
    if (ratio > cw / ch) { w = cw * 0.8; h = w / ratio; } else { h = ch * 0.8; w = h * ratio; }
    setCropRect({ x: Math.round((cw - w) / 2), y: Math.round((ch - h) / 2), w: Math.round(w), h: Math.round(h) });
  };

  const doCrop = () => {
    if (!imgEl) return;
    const s = 1 / canvasScale;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(cropRect.w * s);
    canvas.height = Math.round(cropRect.h * s);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgEl, cropRect.x * s, cropRect.y * s, cropRect.w * s, cropRect.h * s, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) { setCroppedUrl(URL.createObjectURL(blob)); toast({ title: "Image cropped!" }); }
    }, "image/png");
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Image Cropper</h1>
        <p className="text-muted-foreground mb-6">Crop images to custom dimensions or aspect ratios</p>

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
            <div className="flex gap-2 flex-wrap">
              {PRESETS.map((p) => (
                <Button key={p.label} variant={selectedRatio === p.ratio ? "default" : "outline"} size="sm" onClick={() => applyPreset(p.ratio)}>
                  {p.label}
                </Button>
              ))}
            </div>
            <div className="flex justify-center bg-muted/30 rounded-lg p-2 overflow-auto">
              <canvas
                ref={canvasRef}
                className="cursor-move rounded"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Crop: {Math.round(cropRect.w / canvasScale)} × {Math.round(cropRect.h / canvasScale)}px — Drag to reposition
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={doCrop}><Crop className="h-4 w-4 mr-2" /> Crop</Button>
              {croppedUrl && (
                <Button variant="outline" asChild>
                  <a href={croppedUrl} download={`cropped-${file?.name}`}><Download className="h-4 w-4 mr-2" /> Download</a>
                </Button>
              )}
              <Button variant="ghost" onClick={() => { setImgEl(null); setFile(null); setCroppedUrl(""); }}>Reset</Button>
            </div>
            {croppedUrl && (
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Cropped Result</p>
                <img src={croppedUrl} alt="Cropped" className="max-h-48 mx-auto rounded-lg border" />
              </div>
            )}
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default ImageCropper;
