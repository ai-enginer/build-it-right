import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Download, Sparkles, Loader2, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const styles = ["Realistic", "Anime", "Digital Art", "Oil Painting", "Watercolor", "Sketch", "3D Render", "Pixel Art"];
const sizes = ["512×512", "768×768", "1024×1024", "1024×768", "768×1024"];

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [size, setSize] = useState("1024×1024");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl(null);

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-image', { body: { prompt, style, size } });
    // setImageUrl(res.data.imageUrl);
    try {
      await new Promise(r => setTimeout(r, 2000));
      setImageUrl(null);
      toast({ title: "API Not Connected", description: "Connect an AI image API and update handleGenerate in AIImageGenerator.tsx to enable image generation." });
    } catch {
      toast({ title: "Error", description: "Failed to generate image.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-image-generator").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Image Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create stunning images from text descriptions. Choose styles, sizes, and generate unique artwork.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Describe your image *</label>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g., A serene mountain landscape at sunset with a crystal clear lake..."
                className="min-h-[140px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Style</label>
                <select value={style} onChange={e => setStyle(e.target.value)}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                  {styles.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Size</label>
                <select value={size} onChange={e => setSize(e.target.value)}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                  {sizes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={!prompt.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? "Generating..." : "Generate Image"}
            </Button>
          </div>

          {/* Image preview */}
          <div className="flex items-center justify-center rounded-xl border bg-muted/30 shadow-card min-h-[400px]">
            {loading ? (
              <div className="text-center">
                <Loader2 className="h-10 w-10 mx-auto animate-spin text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">Creating your image...</p>
              </div>
            ) : imageUrl ? (
              <div className="relative w-full h-full">
                <img src={imageUrl} alt="Generated" className="w-full h-full object-contain rounded-xl" />
                <Button variant="outline" size="sm" className="absolute bottom-3 right-3" asChild>
                  <a href={imageUrl} download><Download className="h-3.5 w-3.5 mr-1" /> Download</a>
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Your generated image will appear here</p>
                <p className="text-xs mt-1 opacity-60">Requires AI API connection</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Related Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{relatedTools.map(t => <ToolCard key={t.slug} tool={t} />)}</div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default AIImageGenerator;
