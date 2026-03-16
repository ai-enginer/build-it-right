import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PngToWebp = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [sizes, setSizes] = useState({ orig: 0, conv: 0 });

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast({ title: "Please upload an image", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setSizes(s => ({ ...s, orig: f.size }));
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) { setConvertedUrl(URL.createObjectURL(blob)); setSizes(s => ({ ...s, conv: blob.size })); toast({ title: "Converted to WebP!" }); }
      }, "image/webp", 0.9);
    };
    img.src = URL.createObjectURL(f);
  }, []);

  const fmt = (b: number) => b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + " MB" : (b / 1024).toFixed(1) + " KB";

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">PNG to WebP</h1>
        <p className="text-muted-foreground mb-6">Convert PNG images to WebP for faster loading</p>
        {!preview ? (
          <div className="border-2 border-dashed rounded-xl p-8 text-center" onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <span className="text-muted-foreground">Drop image here or click to upload</span>
              <input type="file" accept="image/png,image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
            {sizes.conv > 0 && (
              <p className="text-sm text-muted-foreground">{fmt(sizes.orig)} → {fmt(sizes.conv)} ({Math.round((1 - sizes.conv / sizes.orig) * 100)}% smaller)</p>
            )}
            <div className="flex gap-3 justify-center">
              {convertedUrl && <Button asChild><a href={convertedUrl} download={`${file?.name?.split(".")[0] || "image"}.webp`}><Download className="h-4 w-4 mr-2" /> Download WebP</a></Button>}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(""); setConvertedUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default PngToWebp;
