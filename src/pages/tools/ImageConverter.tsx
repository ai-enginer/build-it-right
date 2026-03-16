import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FORMATS = [
  { label: "PNG", mime: "image/png", ext: "png" },
  { label: "JPEG", mime: "image/jpeg", ext: "jpg" },
  { label: "WebP", mime: "image/webp", ext: "webp" },
  { label: "BMP", mime: "image/bmp", ext: "bmp" },
];

const ImageConverter = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [targetFormat, setTargetFormat] = useState(FORMATS[0]);
  const [converting, setConverting] = useState(false);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast({ title: "Please upload an image", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setConvertedUrl("");
  }, []);

  const convert = () => {
    if (!file) return;
    setConverting(true);
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (targetFormat.mime === "image/jpeg") { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setConvertedUrl(URL.createObjectURL(blob));
          toast({ title: `Converted to ${targetFormat.label}!` });
        }
        setConverting(false);
      }, targetFormat.mime, 0.92);
    };
    img.src = URL.createObjectURL(file);
  };

  const getOrigFormat = () => file?.type.split("/")[1]?.toUpperCase() || "Unknown";

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Image Converter</h1>
        <p className="text-muted-foreground mb-6">Convert between PNG, JPG, WebP, and more</p>

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
              <img src={preview} alt="Preview" className="max-h-48 rounded-lg" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="bg-muted px-3 py-1 rounded font-mono text-sm">{getOrigFormat()}</span>
                <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                <div className="flex gap-2">
                  {FORMATS.map((fmt) => (
                    <Button key={fmt.ext} variant={targetFormat.ext === fmt.ext ? "default" : "outline"} size="sm" onClick={() => { setTargetFormat(fmt); setConvertedUrl(""); }}>
                      {fmt.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={convert} disabled={converting}>{converting ? "Converting…" : "Convert"}</Button>
              {convertedUrl && (
                <Button variant="outline" asChild>
                  <a href={convertedUrl} download={`converted.${targetFormat.ext}`}><Download className="h-4 w-4 mr-2" /> Download .{targetFormat.ext}</a>
                </Button>
              )}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(""); setConvertedUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default ImageConverter;
