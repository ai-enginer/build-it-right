import { useState, useRef, useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { ArrowLeft, Send, Loader2, Trash2, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools-data";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // TODO: Replace with actual API call (streaming recommended)
    // Example:
    // const allMessages = [...messages, userMsg];
    // await streamChat({ messages: allMessages, onDelta: (chunk) => { ... }, onDone: () => setLoading(false) });
    try {
      await new Promise(r => setTimeout(r, 1500));
      const assistantMsg: Message = {
        role: "assistant",
        content: `[API NOT CONNECTED] This is a placeholder response.\n\nTo enable the chatbot, connect an AI API (e.g., Lovable AI Gateway) and update handleSend in AIChatbot.tsx with streaming support.\n\nYou said: "${userMsg.content}"`,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      toast({ title: "Error", description: "Failed to get response.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const relatedTools = tools.filter(t => t.categorySlug === "ai" && t.slug !== "ai-chatbot").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container py-8">
        <Link to="/ai-tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to AI Tools
        </Link>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-cat-ai mb-1">AI Tools</p>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">AI Chatbot</h1>
            <p className="mt-1 text-sm text-muted-foreground">Chat with an AI assistant for any task. Ask questions, brainstorm, or get help with writing.</p>
          </div>
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setMessages([])}><Trash2 className="h-3.5 w-3.5 mr-1" /> Clear</Button>
          )}
        </div>

        {/* Chat area */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <div className="h-[450px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                <div>
                  <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Start a conversation</p>
                  <p className="text-xs mt-1 opacity-60">Requires AI API connection for real responses</p>
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}>
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-xl bg-muted px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="border-t p-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
            <Button onClick={handleSend} disabled={!input.trim() || loading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
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

export default AIChatbot;
