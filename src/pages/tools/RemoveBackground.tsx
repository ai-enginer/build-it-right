import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RemoveBackground = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast({ title: "Please upload an image", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResultUrl("");
  }, []);

  const removeBackground = async () => {
    if (!file) return;
    setLoading(true);

    // TODO: Replace with actual API call (e.g., remove.bg API or AI gateway)
    // Example integration:
    // const formData = new FormData();
    // formData.append("image_file", file);
    // const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    //   method: "POST",
    //   headers: { "X-Api-Key": "YOUR_API_KEY" },
    //   body: formData,
    // });
    // const blob = await response.blob();
    // setResultUrl(URL.createObjectURL(blob));

    // Simulated delay for demo
    await new Promise(r => setTimeout(r, 2000));
    toast({ title: "⚠️ API key required", description: "Connect a background removal API to enable this feature. The UI is ready — just add your API key." });
    setLoading(false);
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">Remove Background</h1>
          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">AI</span>
        </div>
        <p className="text-muted-foreground mb-6">Remove image backgrounds automatically with AI</p>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Original</p>
                <img src={preview} alt="Original" className="max-h-64 mx-auto rounded-lg" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Result</p>
                {resultUrl ? (
                  <img src={resultUrl} alt="No background" className="max-h-64 mx-auto rounded-lg" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Crect width=%2210%22 height=%2210%22 fill=%22%23ccc%22/%3E%3Crect x=%2210%22 y=%2210%22 width=%2210%22 height=%2210%22 fill=%22%23ccc%22/%3E%3C/svg%3E')" }} />
                ) : (
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground text-sm">Result will appear here</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>API Required:</strong> This tool needs a background removal API (e.g., remove.bg or AI gateway). The interface is fully built — just add your API key in the code where indicated by the TODO comment.
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={removeBackground} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Remove Background
              </Button>
              {resultUrl && <Button variant="outline" asChild><a href={resultUrl} download="no-bg.png"><Download className="h-4 w-4 mr-2" /> Download</a></Button>}
              <Button variant="ghost" onClick={() => { setFile(null); setPreview(""); setResultUrl(""); }}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default RemoveBackground;
