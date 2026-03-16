import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageUpscaler = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(2);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast({ title: "Please upload an image", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResultUrl("");
  }, []);

  const upscale = async () => {
    if (!file) return;
    setLoading(true);

    // TODO: Replace with actual AI upscaling API call
    // Example: Use an AI image upscaling service
    // const formData = new FormData();
    // formData.append("image", file);
    // formData.append("scale", scaleFactor.toString());
    // const response = await fetch("YOUR_UPSCALE_API_ENDPOINT", {
    //   method: "POST",
    //   headers: { "Authorization": "Bearer YOUR_API_KEY" },
    //   body: formData,
    // });
    // const blob = await response.blob();
    // setResultUrl(URL.createObjectURL(blob));

    // Basic client-side upscale (nearest-neighbor — not AI quality)
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          setResultUrl(URL.createObjectURL(blob));
          toast({ title: `Upscaled ${scaleFactor}x (basic). For AI-quality upscaling, add an API key.` });
        }
        setLoading(false);
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
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">Image Upscaler</h1>
          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">AI</span>
        </div>
        <p className="text-muted-foreground mb-6">Upscale and enhance image resolution</p>

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
              <img src={resultUrl || preview} alt="Preview" className="max-h-64 rounded-lg" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-4 justify-center">
              <span className="text-sm font-medium">Scale:</span>
              {[2, 3, 4].map((s) => (
                <Button key={s} variant={scaleFactor === s ? "default" : "outline"} size="sm" onClick={() => { setScaleFactor(s); setResultUrl(""); }}>
                  {s}x
                </Button>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Note:</strong> Currently uses basic canvas upscaling. For AI-powered super-resolution, add an upscaling API key in the code.
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={upscale} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Upscale {scaleFactor}x
              </Button>
              {resultUrl && <Button variant="outline" asChild><a href={resultUrl} download={`upscaled-${scaleFactor}x.png`}><Download className="h-4 w-4 mr-2" /> Download</a></Button>}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(""); setResultUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default ImageUpscaler;
