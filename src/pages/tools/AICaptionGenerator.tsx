import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, Sparkles, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const platformOptions = ["Instagram", "Twitter/X", "TikTok", "Facebook", "LinkedIn", "YouTube"];
const vibeOptions = ["Funny", "Inspirational", "Informative", "Casual", "Professional", "Poetic"];

const AICaptionGenerator = () => {
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [vibe, setVibe] = useState("Casual");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setCaptions([]);

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-caption', { body: { description, platform, vibe, includeHashtags } });
    try {
      await new Promise(r => setTimeout(r, 1500));
      setCaptions([
        `[API NOT CONNECTED] Connect an AI API and update handleGenerate in AICaptionGenerator.tsx.`,
        `Placeholder caption for "${description}" on ${platform}. Vibe: ${vibe}.`,
        `Hashtags: ${includeHashtags ? "Yes" : "No"}.`,
      ]);
    } catch {
      toast({ title: "Error", description: "Failed to generate captions.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-caption-generator").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Caption Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Generate engaging captions for social media posts. Tailored to your platform and vibe.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">What's your post about? *</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your photo, video, or post topic..."
                className="min-h-[120px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                  {platformOptions.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Vibe</label>
                <select value={vibe} onChange={e => setVibe(e.target.value)}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                  {vibeOptions.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={includeHashtags} onChange={e => setIncludeHashtags(e.target.checked)}
                className="rounded border-muted-foreground" />
              <span className="text-sm text-foreground">Include hashtags</span>
            </label>
            <Button className="w-full" onClick={handleGenerate} disabled={!description.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? "Generating..." : "Generate Captions"}
            </Button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">Generated Captions</label>
            {captions.length === 0 ? (
              <div className="flex items-center justify-center rounded-xl border bg-card p-12 shadow-card text-center text-muted-foreground">
                <div>
                  <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Your captions will appear here</p>
                  <p className="text-xs mt-1 opacity-60">Requires AI API connection</p>
                </div>
              </div>
            ) : (
              captions.map((caption, i) => (
                <div key={i} className="rounded-xl border bg-card p-4 shadow-card group relative">
                  <p className="text-sm text-foreground pr-12">{caption}</p>
                  <Button variant="outline" size="sm" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => { navigator.clipboard.writeText(caption); toast({ title: "Caption copied!" }); }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))
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

export default AICaptionGenerator;
