import { useState, useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return { words: 0, characters: text.length, charactersNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: "0 sec" };

    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const minutes = Math.floor(words / 200);
    const seconds = Math.round((words % 200) / 200 * 60);
    const readingTime = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "No Spaces", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading Time", value: stats.readingTime },
  ];

  const relatedTools = tools.filter(t => t.categorySlug === "text" && t.slug !== "word-counter").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/text-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Text Tools
        </Link>

        <div className="mb-6">
          <p className="text-xs font-medium text-cat-text mb-1">Text Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Word Counter</h1>
          <p className="mt-1 text-sm text-muted-foreground">Count words, characters, sentences, and paragraphs. Estimate reading time. Free, instant, private.</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-4 grid grid-cols-3 gap-2 md:grid-cols-6">
          {statCards.map(s => (
            <div key={s.label} className="rounded-xl border bg-card p-3 text-center shadow-card">
              <div className="text-xl font-bold tabular-nums text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="min-h-[280px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(text)} disabled={!text}>
              <Copy className="h-3.5 w-3.5 mr-1" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => setText("")} disabled={!text}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
            </Button>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-10 rounded-xl border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground">How it works</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { step: "1", title: "Paste or type", desc: "Enter your text in the box above" },
              { step: "2", title: "Instant results", desc: "Stats update in real-time as you type" },
              { step: "3", title: "Copy & go", desc: "Copy text or stats — nothing is stored" },
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

        {/* Related Tools */}
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

export default WordCounter;
