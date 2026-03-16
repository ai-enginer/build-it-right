import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload, Download, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageResizer = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [resizedUrl, setResizedUrl] = useState("");
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [aspect, setAspect] = useState(1);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast({ title: "Please upload an image", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    const img = new window.Image();
    img.onload = () => { setOrigW(img.width); setOrigH(img.height); setWidth(img.width); setHeight(img.height); setAspect(img.width / img.height); };
    img.src = URL.createObjectURL(f);
    setResizedUrl("");
  }, []);

  const onWidthChange = (w: number) => {
    setWidth(w);
    if (lockAspect) setHeight(Math.round(w / aspect));
  };
  const onHeightChange = (h: number) => {
    setHeight(h);
    if (lockAspect) setWidth(Math.round(h * aspect));
  };

  const resize = () => {
    if (!file) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) setResizedUrl(URL.createObjectURL(blob));
        toast({ title: "Image resized!" });
      }, file.type.includes("png") ? "image/png" : "image/jpeg", 0.92);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Image Resizer</h1>
        <p className="text-muted-foreground mb-6">Resize images to any dimension</p>

        {!preview ? (
          <div className="border-2 border-dashed rounded-xl p-8 text-center" onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <span className="text-muted-foreground">Drop image here or click to upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img src={resizedUrl || preview} alt="Preview" className="max-h-64 rounded-lg" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <p className="text-sm text-muted-foreground">Original: {origW} × {origH}px</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Width (px)</label>
                  <Input type="number" value={width} onChange={(e) => onWidthChange(Number(e.target.value))} />
                </div>
                <button onClick={() => setLockAspect(!lockAspect)} className="mt-5">
                  <Lock className={`h-5 w-5 ${lockAspect ? "text-primary" : "text-muted-foreground"}`} />
                </button>
                <div className="flex-1">
                  <label className="text-sm font-medium">Height (px)</label>
                  <Input type="number" value={height} onChange={(e) => onHeightChange(Number(e.target.value))} />
                </div>
              </div>
              <div className="flex gap-2">
                {[25, 50, 75, 100, 150, 200].map((p) => (
                  <Button key={p} variant="outline" size="sm" onClick={() => { onWidthChange(Math.round(origW * p / 100)); }}>
                    {p}%
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={resize}>Resize Image</Button>
              {resizedUrl && (
                <Button variant="outline" asChild>
                  <a href={resizedUrl} download={`resized-${file?.name}`}><Download className="h-4 w-4 mr-2" /> Download</a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default ImageResizer;
