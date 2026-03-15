import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, Sparkles, Loader2, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const languages = ["JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "SQL", "HTML/CSS", "Bash"];

const AICodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-code', { body: { prompt, language } });
    try {
      await new Promise(r => setTimeout(r, 1500));
      setOutput(`// [API NOT CONNECTED]\n// Connect an AI API and update handleGenerate in AICodeGenerator.tsx.\n//\n// Prompt: "${prompt}"\n// Language: ${language}\n\nfunction placeholder() {\n  console.log("Replace this with AI-generated code");\n}`);
    } catch {
      toast({ title: "Error", description: "Failed to generate code.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-code-generator").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Code Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Generate code snippets from natural language descriptions. Supports 15+ programming languages.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Programming Language</label>
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                {languages.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Describe what you want *</label>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g., A function that sorts an array of objects by a specific key..."
                className="min-h-[200px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={!prompt.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? "Generating..." : "Generate Code"}
            </Button>
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Generated Code</label>
            <pre className="min-h-[340px] w-full overflow-auto rounded-xl border bg-muted/30 p-4 text-sm text-foreground shadow-card font-mono whitespace-pre-wrap">
              {output || "Generated code will appear here..."}
            </pre>
            <div className="absolute top-10 right-3 flex gap-1.5">
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); }} disabled={!output}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>
              <Button variant="outline" size="sm" onClick={() => setOutput("")} disabled={!output}><RotateCcw className="h-3.5 w-3.5" /></Button>
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

export default AICodeGenerator;
