import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Download, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FONTS = ["Arial", "Georgia", "Courier New", "Impact", "Comic Sans MS", "Verdana"];
const COLORS = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF6600"];

const AddTextToImage = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [text, setText] = useState("Your text here");
  const [fontSize, setFontSize] = useState(48);
  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#FFFFFF");
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
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
    ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
    const scaledFontSize = Math.round(fontSize * scale);
    ctx.font = `${scaledFontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.fillText(text, canvas.width * posX / 100, canvas.height * posY / 100);
  }, [imgEl, text, fontSize, font, color, posX, posY]);

  const exportImage = () => {
    if (!imgEl) return;
    const canvas = document.createElement("canvas");
    canvas.width = imgEl.width;
    canvas.height = imgEl.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgEl, 0, 0);
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.fillText(text, imgEl.width * posX / 100, imgEl.height * posY / 100);
    canvas.toBlob((blob) => {
      if (blob) { setResultUrl(URL.createObjectURL(blob)); toast({ title: "Text added!" }); }
    }, "image/png");
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Add Text to Image</h1>
        <p className="text-muted-foreground mb-6">Overlay text on images with custom fonts</p>

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
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input value={text} onChange={(e) => setText(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-sm font-medium">Font Size</label>
                  <Input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} min={12} max={200} />
                </div>
                <div>
                  <label className="text-sm font-medium">Font</label>
                  <select className="w-full border rounded px-2 py-2 text-sm bg-background" value={font} onChange={(e) => setFont(e.target.value)}>
                    {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">X Position (%)</label>
                  <Input type="number" value={posX} onChange={(e) => setPosX(Number(e.target.value))} min={0} max={100} />
                </div>
                <div>
                  <label className="text-sm font-medium">Y Position (%)</label>
                  <Input type="number" value={posY} onChange={(e) => setPosY(Number(e.target.value))} min={0} max={100} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Color</label>
                <div className="flex gap-2 mt-1">
                  {COLORS.map((c) => (
                    <button key={c} className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-primary" : "border-muted"}`} style={{ backgroundColor: c }} onClick={() => setColor(c)} />
                  ))}
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={exportImage}><Type className="h-4 w-4 mr-2" /> Apply & Export</Button>
              {resultUrl && <Button variant="outline" asChild><a href={resultUrl} download={`text-${file?.name}`}><Download className="h-4 w-4 mr-2" /> Download</a></Button>}
              <Button variant="ghost" onClick={() => { setImgEl(null); setFile(null); setResultUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default AddTextToImage;
