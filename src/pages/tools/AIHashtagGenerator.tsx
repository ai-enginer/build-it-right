import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, Sparkles, Loader2, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const platforms = ["Instagram", "Twitter/X", "TikTok", "LinkedIn", "YouTube"];

const AIHashtagGenerator = () => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [count, setCount] = useState(15);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setHashtags([]);

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-hashtags', { body: { topic, platform, count } });
    try {
      await new Promise(r => setTimeout(r, 1500));
      setHashtags(["#APINotConnected", "#ConnectAIAPI", "#UpdateHandleGenerate", "#AIHashtagGenerator"]);
      toast({ title: "API Not Connected", description: "Connect an AI API to generate real hashtags." });
    } catch {
      toast({ title: "Error", description: "Failed to generate hashtags.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    toast({ title: "All hashtags copied!" });
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-hashtag-generator").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Hashtag Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Generate relevant, trending hashtags for your social media posts. Optimized for each platform.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Topic or Description *</label>
              <textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder="Describe your post or topic..."
                className="min-h-[120px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                  {platforms.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Number of Hashtags</label>
                <input type="number" min={5} max={30} value={count} onChange={e => setCount(Number(e.target.value))}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={!topic.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? "Generating..." : "Generate Hashtags"}
            </Button>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Generated Hashtags</h3>
              {hashtags.length > 0 && (
                <Button variant="outline" size="sm" onClick={copyAll}><Copy className="h-3.5 w-3.5 mr-1" /> Copy All</Button>
              )}
            </div>
            {hashtags.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Hash className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Your hashtags will appear here</p>
                <p className="text-xs mt-1 opacity-60">Requires AI API connection</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, i) => (
                  <button key={i} onClick={() => { navigator.clipboard.writeText(tag); toast({ title: `${tag} copied!` }); }}
                    className="rounded-full border bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                    {tag}
                  </button>
                ))}
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

export default AIHashtagGenerator;
