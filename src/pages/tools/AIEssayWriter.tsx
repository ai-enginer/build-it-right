import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const essayTypes = ["Argumentative", "Persuasive", "Narrative", "Expository", "Descriptive", "Analytical"];
const lengths = ["Short (~300 words)", "Medium (~500 words)", "Long (~800 words)", "Extended (~1200 words)"];

const AIEssayWriter = () => {
  const [topic, setTopic] = useState("");
  const [essayType, setEssayType] = useState("Argumentative");
  const [length, setLength] = useState("Medium (~500 words)");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setOutput("");

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-essay', { body: { topic, essayType, length, additionalNotes } });
    try {
      await new Promise(r => setTimeout(r, 2000));
      setOutput(`[API NOT CONNECTED] Placeholder essay.\n\nConnect an AI API and update handleGenerate in AIEssayWriter.tsx.\n\nTopic: "${topic}"\nType: ${essayType}\nLength: ${length}\nNotes: ${additionalNotes || "None"}`);
    } catch {
      toast({ title: "Error", description: "Failed to generate essay.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-essay-writer").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Essay Writer</h1>
          <p className="mt-1 text-sm text-muted-foreground">Generate well-structured essays on any topic. Choose your style, length, and let AI do the writing.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Config panel */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Essay Topic *</label>
              <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., The impact of AI on education"
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Essay Type</label>
              <select value={essayType} onChange={e => setEssayType(e.target.value)}
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                {essayTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Length</label>
              <select value={length} onChange={e => setLength(e.target.value)}
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                {lengths.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Additional Instructions (optional)</label>
              <textarea value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)} placeholder="Any specific requirements or focus areas..."
                className="min-h-[100px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={!topic.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? "Writing..." : "Generate Essay"}
            </Button>
          </div>

          {/* Output */}
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Generated Essay</label>
            <textarea value={output} readOnly placeholder="Your essay will appear here..."
              className="min-h-[440px] w-full resize-y rounded-xl border bg-muted/30 p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none" />
            <div className="absolute bottom-3 right-3">
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); }} disabled={!output}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>
            </div>
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

export default AIEssayWriter;
