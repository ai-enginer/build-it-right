import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageToJpg = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast({ title: "Please upload an image", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) { setConvertedUrl(URL.createObjectURL(blob)); toast({ title: "Converted to JPG!" }); }
      }, "image/jpeg", 0.92);
    };
    img.src = URL.createObjectURL(f);
  }, []);

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Image to JPG</h1>
        <p className="text-muted-foreground mb-6">Convert any image format to JPG</p>
        {!preview ? (
          <div className="border-2 border-dashed rounded-xl p-8 text-center" onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <span className="text-muted-foreground">Drop image here or click to upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
            <div className="flex gap-3 justify-center">
              {convertedUrl && <Button asChild><a href={convertedUrl} download={`${file?.name?.split(".")[0] || "image"}.jpg`}><Download className="h-4 w-4 mr-2" /> Download JPG</a></Button>}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(""); setConvertedUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default ImageToJpg;
