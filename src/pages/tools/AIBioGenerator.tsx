import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const platformOptions = ["LinkedIn", "Twitter/X", "Instagram", "Personal Website", "GitHub", "TikTok"];
const toneOptions = ["Professional", "Casual", "Witty", "Inspirational", "Minimalist"];

const AIBioGenerator = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [tone, setTone] = useState("Professional");
  const [keywords, setKeywords] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!name.trim() || !role.trim()) return;
    setLoading(true);
    setBios([]);

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-bio', { body: { name, role, platform, tone, keywords } });
    try {
      await new Promise(r => setTimeout(r, 1500));
      setBios([
        `[API NOT CONNECTED] Connect an AI API and update handleGenerate in AIBioGenerator.tsx.`,
        `Placeholder bio for ${name}, ${role} on ${platform}. Tone: ${tone}.`,
        `Keywords: ${keywords || "None specified"}.`,
      ]);
    } catch {
      toast({ title: "Error", description: "Failed to generate bios.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-bio-generator").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Bio Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create professional bios for social profiles. Tailored to each platform and your personal brand.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Your Name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe"
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Role / Title *</label>
                <input value={role} onChange={e => setRole(e.target.value)} placeholder="Software Engineer"
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
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
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Tone</label>
                <select value={tone} onChange={e => setTone(e.target.value)}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                  {toneOptions.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Keywords (optional)</label>
              <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="e.g., React, AI, startup, mentor"
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={!name.trim() || !role.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? "Generating..." : "Generate Bios"}
            </Button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">Generated Bios</label>
            {bios.length === 0 ? (
              <div className="flex items-center justify-center rounded-xl border bg-card p-12 shadow-card text-center text-muted-foreground">
                <div>
                  <RefreshCw className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Your bios will appear here</p>
                  <p className="text-xs mt-1 opacity-60">Requires AI API connection</p>
                </div>
              </div>
            ) : (
              bios.map((bio, i) => (
                <div key={i} className="rounded-xl border bg-card p-4 shadow-card group relative">
                  <p className="text-sm text-foreground pr-16">{bio}</p>
                  <Button variant="outline" size="sm" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => { navigator.clipboard.writeText(bio); toast({ title: "Bio copied!" }); }}>
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

export default AIBioGenerator;
