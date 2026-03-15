import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, RotateCcw, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const AISummarizer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [length, setLength] = useState<"short" | "medium" | "detailed">("medium");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    // TODO: Replace with actual API call to AI backend
    // Example: const res = await supabase.functions.invoke('ai-summarize', { body: { text: input, length } });
    // setOutput(res.data.summary);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setOutput(`[API NOT CONNECTED] This is a placeholder summary.\n\nTo enable this tool, connect an AI API (e.g., Lovable AI Gateway) and update the handleSummarize function in AISummarizer.tsx.\n\nYour input was ${input.split(/\s+/).length} words long, requesting a "${length}" summary.`);
    } catch {
      toast({ title: "Error", description: "Failed to generate summary. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-summarizer").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>

        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Summarizer</h1>
          <p className="mt-1 text-sm text-muted-foreground">Summarize any text with AI in seconds. Paste an article, essay, or document and get a concise summary.</p>
        </div>

        {/* Length selector */}
        <div className="mb-4 flex gap-2">
          {(["short", "medium", "detailed"] as const).map(l => (
            <Button key={l} variant={length === l ? "default" : "outline"} size="sm" onClick={() => setLength(l)} className="capitalize">
              {l}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Input */}
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Input Text</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste the text you want to summarize..."
              className="min-h-[280px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <div className="absolute bottom-3 right-3">
              <Button variant="outline" size="sm" onClick={() => setInput("")} disabled={!input}>
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
              </Button>
            </div>
          </div>

          {/* Output */}
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Summary</label>
            <textarea
              value={output}
              readOnly
              placeholder="Your summary will appear here..."
              className="min-h-[280px] w-full resize-y rounded-xl border bg-muted/30 p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none"
            />
            <div className="absolute bottom-3 right-3">
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); }} disabled={!output}>
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            </div>
          </div>
        </div>

        <Button className="mt-4 w-full sm:w-auto" onClick={handleSummarize} disabled={!input.trim() || loading}>
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Summarizing..." : "Summarize"}
        </Button>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Related Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default AISummarizer;
