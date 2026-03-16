import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SvgToPng = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [scale, setScale] = useState(2);

  const handleFile = useCallback((f: File) => {
    if (!f.name.endsWith(".svg") && f.type !== "image/svg+xml") { toast({ title: "Please upload an SVG file", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setConvertedUrl("");
  }, []);

  const convert = () => {
    if (!file) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) { setConvertedUrl(URL.createObjectURL(blob)); toast({ title: `Converted at ${scale}x scale!` }); }
      }, "image/png");
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">SVG to PNG</h1>
        <p className="text-muted-foreground mb-6">Convert SVG vector files to PNG raster images</p>
        {!preview ? (
          <div className="border-2 border-dashed rounded-xl p-8 text-center" onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <span className="text-muted-foreground">Drop SVG file here or click to upload</span>
              <input type="file" accept=".svg,image/svg+xml" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center bg-muted/30 rounded-lg p-4">
              <img src={preview} alt="SVG Preview" className="max-h-48" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-4 justify-center">
              <span className="text-sm font-medium">Scale:</span>
              {[1, 2, 3, 4].map((s) => (
                <Button key={s} variant={scale === s ? "default" : "outline"} size="sm" onClick={() => { setScale(s); setConvertedUrl(""); }}>
                  {s}x
                </Button>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={convert}>Convert to PNG</Button>
              {convertedUrl && <Button variant="outline" asChild><a href={convertedUrl} download={`${file?.name?.replace(".svg", "")}.png`}><Download className="h-4 w-4 mr-2" /> Download PNG</a></Button>}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(""); setConvertedUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default SvgToPng;
