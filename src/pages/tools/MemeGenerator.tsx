import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MemeGenerator = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState(40);
  const [resultUrl, setResultUrl] = useState("");

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResultUrl("");
    const img = new window.Image();
    img.onload = () => setImgEl(img);
    img.src = URL.createObjectURL(f);
  }, []);

  const drawMeme = (canvas: HTMLCanvasElement, img: HTMLImageElement, scale = 1) => {
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const fs = Math.round(fontSize * scale);
    ctx.font = `bold ${fs}px Impact`;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.max(2, fs / 15);
    ctx.lineJoin = "round";
    if (topText) {
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, fs + 10 * scale);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, fs + 10 * scale);
    }
    if (bottomText) {
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 15 * scale);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 15 * scale);
    }
  };

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    const scale = Math.min(600 / imgEl.width, 500 / imgEl.height, 1);
    drawMeme(canvasRef.current, imgEl, scale);
  }, [imgEl, topText, bottomText, fontSize]);

  const exportMeme = () => {
    if (!imgEl) return;
    const canvas = document.createElement("canvas");
    drawMeme(canvas, imgEl);
    canvas.toBlob((blob) => {
      if (blob) { setResultUrl(URL.createObjectURL(blob)); toast({ title: "Meme created!" }); }
    }, "image/png");
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Meme Generator</h1>
        <p className="text-muted-foreground mb-6">Create memes with custom text and templates</p>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Top Text</label>
                  <Input value={topText} onChange={(e) => setTopText(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Bottom Text</label>
                  <Input value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Font Size: {fontSize}px</label>
                <Input type="range" min={20} max={100} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={exportMeme}>Generate Meme</Button>
              {resultUrl && <Button variant="outline" asChild><a href={resultUrl} download="meme.png"><Download className="h-4 w-4 mr-2" /> Download</a></Button>}
              <Button variant="ghost" onClick={() => { setImgEl(null); setFile(null); setResultUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default MemeGenerator;
