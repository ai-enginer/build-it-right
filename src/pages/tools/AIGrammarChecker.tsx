import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, RotateCcw, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const AIGrammarChecker = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-grammar', { body: { text: input } });
    // setOutput(res.data.corrected);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setOutput(`[API NOT CONNECTED] This is a placeholder.\n\nTo enable grammar checking, connect an AI API and update handleCheck in AIGrammarChecker.tsx.\n\nInput: ${input.split(/\s+/).length} words.`);
    } catch {
      toast({ title: "Error", description: "Failed to check grammar.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-grammar-checker").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Grammar Checker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Fix grammar, spelling, and punctuation errors with AI. Improve your writing style instantly.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Original Text</label>
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text to check for grammar errors..."
              className="min-h-[280px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            <div className="absolute bottom-3 right-3">
              <Button variant="outline" size="sm" onClick={() => setInput("")} disabled={!input}><RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear</Button>
            </div>
          </div>
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Corrected Text</label>
            <textarea value={output} readOnly placeholder="Corrected text will appear here..."
              className="min-h-[280px] w-full resize-y rounded-xl border bg-muted/30 p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none" />
            <div className="absolute bottom-3 right-3">
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); }} disabled={!output}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>
            </div>
          </div>
        </div>

        <Button className="mt-4 w-full sm:w-auto" onClick={handleCheck} disabled={!input.trim() || loading}>
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Checking..." : "Check Grammar"}
        </Button>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Related Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{relatedTools.map(t => <ToolCard key={t.slug} tool={t} />)}</div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default AIGrammarChecker;
