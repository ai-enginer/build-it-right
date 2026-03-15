import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Copy, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const emailTypes = ["Professional", "Follow-up", "Thank You", "Apology", "Introduction", "Request", "Invitation", "Complaint"];
const toneOptions = ["Formal", "Friendly", "Persuasive", "Neutral", "Urgent"];

const AIEmailWriter = () => {
  const [context, setContext] = useState("");
  const [emailType, setEmailType] = useState("Professional");
  const [tone, setTone] = useState("Formal");
  const [recipient, setRecipient] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!context.trim()) return;
    setLoading(true);
    setOutput("");

    // TODO: Replace with actual API call
    // Example: const res = await supabase.functions.invoke('ai-email', { body: { context, emailType, tone, recipient } });
    try {
      await new Promise(r => setTimeout(r, 1500));
      setOutput(`[API NOT CONNECTED] Placeholder email.\n\nConnect an AI API and update handleGenerate in AIEmailWriter.tsx.\n\nType: ${emailType}\nTone: ${tone}\nRecipient: ${recipient || "Not specified"}\nContext: ${context}`);
    } catch {
      toast({ title: "Error", description: "Failed to generate email.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-email-writer").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Email Writer</h1>
          <p className="mt-1 text-sm text-muted-foreground">Draft professional emails in seconds. Just describe what you need and let AI compose the perfect email.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">What's the email about? *</label>
              <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="Describe the purpose of your email..."
                className="min-h-[120px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Recipient (optional)</label>
              <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g., Manager, Client, Team"
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email Type</label>
                <select value={emailType} onChange={e => setEmailType(e.target.value)}
                  className="w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                  {emailTypes.map(t => <option key={t}>{t}</option>)}
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
            <Button className="w-full" onClick={handleGenerate} disabled={!context.trim() || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {loading ? "Writing..." : "Generate Email"}
            </Button>
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Generated Email</label>
            <textarea value={output} readOnly placeholder="Your email will appear here..."
              className="min-h-[350px] w-full resize-y rounded-xl border bg-muted/30 p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none" />
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

export default AIEmailWriter;
