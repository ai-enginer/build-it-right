import { useState, useEffect, useRef } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Play, Square, RotateCcw, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

const AITextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const available = synthRef.current.getVoices();
      setVoices(available);
      if (available.length > 0 && !selectedVoice) {
        const defaultVoice = available.find(v => v.default) || available[0];
        setSelectedVoice(defaultVoice.name);
      }
    };
    loadVoices();
    synthRef.current.onvoiceschanged = loadVoices;
    return () => { synthRef.current.onvoiceschanged = null; };
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;
    if (speaking) {
      synthRef.current.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      toast({ title: "Error", description: "Speech synthesis failed.", variant: "destructive" });
    };

    synthRef.current.speak(utterance);
    setSpeaking(true);
  };

  const handleStop = () => {
    synthRef.current.cancel();
    setSpeaking(false);
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-text-to-speech").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6">
          <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Text to Speech</h1>
          <p className="mt-1 text-sm text-muted-foreground">Convert text to natural-sounding speech using your browser's built-in voices. No API needed.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Your Text</label>
              <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter or paste the text you want to hear..."
                className="min-h-[250px] w-full resize-y rounded-xl border bg-card p-4 text-sm text-foreground shadow-card placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSpeak} disabled={!text.trim()} className={speaking ? "bg-destructive hover:bg-destructive/90" : ""}>
                {speaking ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {speaking ? "Stop" : "Speak"}
              </Button>
              <Button variant="outline" onClick={() => { handleStop(); setText(""); }}>
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-xl border bg-card p-5 shadow-card space-y-5">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Volume2 className="h-4 w-4" /> Voice Settings</h3>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Voice ({voices.length} available)</label>
              <select value={selectedVoice} onChange={e => setSelectedVoice(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 flex justify-between text-xs font-medium text-muted-foreground">
                <span>Speed</span><span>{rate}x</span>
              </label>
              <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>
            <div>
              <label className="mb-1.5 flex justify-between text-xs font-medium text-muted-foreground">
                <span>Pitch</span><span>{pitch}</span>
              </label>
              <input type="range" min={0.5} max={2} step={0.1} value={pitch} onChange={e => setPitch(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Uses your browser's built-in Web Speech API — works offline, no API key required.</p>
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

export default AITextToSpeech;
