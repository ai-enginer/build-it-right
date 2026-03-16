import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Upload, Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageCompressor = () => {
  const { toast } = useToast();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please upload an image file", variant: "destructive" });
      return;
    }
    setOriginalFile(file);
    setOriginalSize(file.size);
    setOriginalPreview(URL.createObjectURL(file));
    compressImage(file, quality[0]);
  }, [quality]);

  const compressImage = (file: File, q: number) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            setCompressedUrl(URL.createObjectURL(blob));
          }
        },
        "image/jpeg",
        q / 100
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const onQualityChange = (val: number[]) => {
    setQuality(val);
    if (originalFile) compressImage(originalFile, val[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const savings = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
        <p className="text-muted-foreground mb-6">Compress images without losing quality</p>

        <div
          className="border-2 border-dashed rounded-xl p-8 text-center mb-6 hover:border-primary/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {!originalPreview ? (
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <span className="text-muted-foreground">Drop image here or click to upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Original ({formatSize(originalSize)})</p>
                  <img src={originalPreview} alt="Original" className="max-h-64 mx-auto rounded-lg" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Compressed ({formatSize(compressedSize)})</p>
                  {compressedUrl && <img src={compressedUrl} alt="Compressed" className="max-h-64 mx-auto rounded-lg" />}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Quality: {quality[0]}%</span>
                  <span className="text-sm font-bold text-green-600">{savings}% smaller</span>
                </div>
                <Slider value={quality} onValueChange={onQualityChange} min={10} max={100} step={5} />
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => { setOriginalFile(null); setOriginalPreview(""); setCompressedUrl(""); setOriginalSize(0); setCompressedSize(0); }}>
                  Upload New
                </Button>
                {compressedUrl && (
                  <Button asChild>
                    <a href={compressedUrl} download={`compressed-${originalFile?.name || "image.jpg"}`}>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
};

export default ImageCompressor;
