import { useState, useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, RotateCcw, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";

const SAMPLE_JSON = `{
  "name": "ToolBox",
  "version": "1.0.0",
  "tools": 76,
  "categories": ["PDF", "Image", "AI", "Text"],
  "free": true
}`;

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", error: null, valid: null as boolean | null };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, indent), error: null, valid: true };
    } catch (e: any) {
      return { output: "", error: e.message, valid: false };
    }
  }, [input, indent]);

  const relatedTools = tools.filter(t => t.categorySlug === "developer" && t.slug !== "json-formatter").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all tools
        </Link>

        <div className="mb-6">
          <p className="text-xs font-medium text-cat-dev mb-1">Developer Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">JSON Formatter & Validator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Format, validate, and beautify JSON data instantly. Free, private, runs in your browser.</p>
        </div>

        {/* Controls */}
        <div className="mb-3 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 shadow-card">
            <span className="text-xs text-muted-foreground">Indent:</span>
            {[2, 4].map(n => (
              <button
                key={n}
                onClick={() => setIndent(n)}
                className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${indent === n ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n} spaces
              </button>
            ))}
          </div>
          <button
            onClick={() => setInput(SAMPLE_JSON)}
            className="text-xs font-medium text-primary hover:underline"
          >
            Load sample
          </button>
          {result.valid !== null && (
            <div className={`ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${result.valid ? "bg-cat-converter/10 text-cat-converter" : "bg-destructive/10 text-destructive"}`}>
              {result.valid ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {result.valid ? "Valid JSON" : "Invalid JSON"}
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Input</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='Paste JSON here...'
              className="min-h-[320px] w-full resize-y rounded-xl border bg-card p-4 font-mono text-xs text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              spellCheck={false}
            />
            <div className="absolute bottom-3 right-3">
              <Button variant="outline" size="sm" onClick={() => { setInput(""); }}>
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
              </Button>
            </div>
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Output</label>
            <textarea
              readOnly
              value={result.error ? `Error: ${result.error}` : result.output}
              className={`min-h-[320px] w-full resize-y rounded-xl border p-4 font-mono text-xs shadow-card outline-none ${result.error ? "bg-destructive/5 text-destructive border-destructive/20" : "bg-card text-foreground"}`}
            />
            {result.output && (
              <div className="absolute bottom-3 right-3">
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(result.output)}>
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-10 rounded-xl border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground">How it works</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { step: "1", title: "Paste JSON", desc: "Paste your raw JSON data into the input box" },
              { step: "2", title: "Auto-format", desc: "JSON is validated and formatted instantly" },
              { step: "3", title: "Copy result", desc: "Copy the formatted output — nothing leaves your browser" },
            ].map(s => (
              <div key={s.step} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{s.step}</div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
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

export default JsonFormatter;
