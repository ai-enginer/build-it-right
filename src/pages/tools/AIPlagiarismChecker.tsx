import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Sparkles, Loader2, RotateCcw, ShieldCheck, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

interface Result {
  score: number;
  status: "original" | "warning" | "plagiarized" | null;
  details: string;
}

const AIPlagiarismChecker = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result>({ score: 0, status: null, details: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult({ score: 0, status: null, details: "" });

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-plagiarism', { body: { text: input } });
    try {
      await new Promise(r => setTimeout(r, 2000));
      setResult({
        score: 0,
        status: null,
        details: "[API NOT CONNECTED] Connect an AI plagiarism detection API and update handleCheck in AIPlagiarismChecker.tsx to enable real plagiarism checking.",
      });
    } catch {
      toast({ title: "Error", description: "Failed to check plagiarism.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!result.status) return "text-muted-foreground";
    if (result.status === "original") return "text-green-500";
    if (result.status === "warning") return "text-yellow-500";
    return "text-red-500";
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-plagiarism-checker").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Plagiarism Checker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Check your text for plagiarism and originality. Get a detailed analysis with source matching.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Your Text</label>
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste the text you want to check for plagiarism..."
              className="min-h-[350px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="mt-2 flex gap-2">
              <Button onClick={handleCheck} disabled={!input.trim() || loading}>
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                {loading ? "Analyzing..." : "Check Plagiarism"}
              </Button>
              <Button variant="outline" onClick={() => { setInput(""); setResult({ score: 0, status: null, details: "" }); }}>
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>
          </div>

          {/* Results panel */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">Analysis Results</h3>
            {result.status === null && !loading ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShieldCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Paste text and click "Check Plagiarism"</p>
                <p className="text-xs mt-1 opacity-60">Requires AI API connection</p>
              </div>
            ) : loading ? (
              <div className="text-center py-8">
                <Loader2 className="h-10 w-10 mx-auto animate-spin text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">Scanning for plagiarism...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getStatusColor()}`}>{result.score}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Originality Score</p>
                </div>
                {result.status && (
                  <div className={`flex items-start gap-2 rounded-lg p-3 text-xs ${
                    result.status === "original" ? "bg-green-500/10" : result.status === "warning" ? "bg-yellow-500/10" : "bg-red-500/10"
                  }`}>
                    {result.status === "original" ? <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" /> : <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />}
                    <span>{result.details}</span>
                  </div>
                )}
                {!result.status && <p className="text-xs text-muted-foreground">{result.details}</p>}
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

export default AIPlagiarismChecker;
