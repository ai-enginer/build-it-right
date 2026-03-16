import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RotateImage = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [resultUrl, setResultUrl] = useState("");

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setRotation(0); setFlipH(false); setFlipV(false); setResultUrl("");
    const img = new window.Image();
    img.onload = () => setImgEl(img);
    img.src = URL.createObjectURL(f);
  }, []);

  const drawCanvas = (canvas: HTMLCanvasElement, img: HTMLImageElement, fullRes = false) => {
    const scale = fullRes ? 1 : Math.min(500 / img.width, 400 / img.height, 1);
    const w = img.width * scale;
    const h = img.height * scale;
    const isRotated = rotation % 180 !== 0;
    canvas.width = isRotated ? h : w;
    canvas.height = isRotated ? w : h;
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();
  };

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    drawCanvas(canvasRef.current, imgEl);
  }, [imgEl, rotation, flipH, flipV]);

  const exportImage = () => {
    if (!imgEl) return;
    const canvas = document.createElement("canvas");
    drawCanvas(canvas, imgEl, true);
    canvas.toBlob((blob) => {
      if (blob) { setResultUrl(URL.createObjectURL(blob)); toast({ title: "Image transformed!" }); }
    }, "image/png");
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Rotate & Flip Image</h1>
        <p className="text-muted-foreground mb-6">Rotate and flip images easily</p>

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
            <div className="flex gap-2 justify-center flex-wrap">
              <Button variant="outline" size="sm" onClick={() => setRotation((r) => (r + 90) % 360)}><RotateCw className="h-4 w-4 mr-1" /> Rotate 90°</Button>
              <Button variant="outline" size="sm" onClick={() => setRotation((r) => (r + 180) % 360)}><RotateCw className="h-4 w-4 mr-1" /> Rotate 180°</Button>
              <Button variant={flipH ? "default" : "outline"} size="sm" onClick={() => setFlipH(!flipH)}><FlipHorizontal className="h-4 w-4 mr-1" /> Flip H</Button>
              <Button variant={flipV ? "default" : "outline"} size="sm" onClick={() => setFlipV(!flipV)}><FlipVertical className="h-4 w-4 mr-1" /> Flip V</Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">Rotation: {rotation}° | Flip H: {flipH ? "Yes" : "No"} | Flip V: {flipV ? "Yes" : "No"}</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={exportImage}>Apply & Export</Button>
              {resultUrl && <Button variant="outline" asChild><a href={resultUrl} download={`rotated-${file?.name}`}><Download className="h-4 w-4 mr-2" /> Download</a></Button>}
              <Button variant="ghost" onClick={() => { setImgEl(null); setFile(null); setResultUrl(""); setRotation(0); setFlipH(false); setFlipV(false); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default RotateImage;
