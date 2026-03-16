import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScreenshotToCode = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [framework, setFramework] = useState<"html" | "react" | "tailwind">("tailwind");

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast({ title: "Please upload an image", variant: "destructive" }); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setCode("");
  }, []);

  const generate = async () => {
    if (!file) return;
    setLoading(true);

    // TODO: Replace with actual AI vision API call
    // Example with AI gateway:
    // const base64 = await fileToBase64(file);
    // const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    //   method: "POST",
    //   headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     model: "gpt-4o",
    //     messages: [{
    //       role: "user",
    //       content: [
    //         { type: "text", text: `Convert this screenshot to ${framework} code. Output only the code.` },
    //         { type: "image_url", image_url: { url: base64 } }
    //       ]
    //     }]
    //   })
    // });
    // const data = await response.json();
    // setCode(data.choices[0].message.content);

    await new Promise(r => setTimeout(r, 2000));
    toast({ title: "⚠️ API key required", description: "Connect an AI vision API to enable screenshot-to-code conversion." });
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!" });
  };

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/image-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Image Tools
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">Screenshot to Code</h1>
          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">AI</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">New</span>
        </div>
        <p className="text-muted-foreground mb-6">Convert screenshots to HTML/CSS code with AI</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {!preview ? (
              <div className="border-2 border-dashed rounded-xl p-8 text-center h-64 flex items-center justify-center" onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
                <label className="cursor-pointer flex flex-col items-center gap-3">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">Upload screenshot</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                <img src={preview} alt="Screenshot" className="w-full rounded-lg border" />
                <div className="flex gap-2">
                  {(["html", "react", "tailwind"] as const).map((fw) => (
                    <Button key={fw} variant={framework === fw ? "default" : "outline"} size="sm" onClick={() => setFramework(fw)}>
                      {fw === "html" ? "HTML/CSS" : fw === "react" ? "React" : "Tailwind"}
                    </Button>
                  ))}
                </div>
                <Button onClick={generate} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Generate Code
                </Button>
              </div>
            )}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              <strong>API Required:</strong> This tool needs an AI vision API (e.g., GPT-4o). The interface is ready — add your API key in the code.
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Generated Code</span>
              {code && (
                <Button variant="ghost" size="sm" onClick={copyCode}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
            <Textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Generated code will appear here…" className="font-mono text-sm min-h-[400px]" />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ScreenshotToCode;
