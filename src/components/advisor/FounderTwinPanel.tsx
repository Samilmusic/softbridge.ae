import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdvisorOrb } from "./AdvisorOrb";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { Send, Sparkles, X, Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_PROMPTS = [
  "What's my next step?",
  "Do I need more documents?",
  "How long until license issuance?",
  "Which bank is best for my activity?",
  "Can I add visas later?",
];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  greeting?: string;
  founderName?: string;
  initialMessages?: Msg[];
}

export function FounderTwinPanel({ open, onOpenChange, greeting, founderName, initialMessages }: Props) {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const abortRef = React.useRef<AbortController | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (initialMessages && initialMessages.length) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const showGreeting = !messages.length;

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || streaming) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error("Please sign in to chat with your advisor.");
        setStreaming(false);
        return;
      }

      const resp = await fetch("/api/advisor/chat", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Failed to reach advisor" }));
        toast.error(err.error || "Unable to reach the advisor right now.");
        setStreaming(false);
        return;
      }

      // seed assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      let assistant = "";

      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (typeof delta === "string") {
              assistant += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        console.error(e);
        toast.error("Advisor request failed.");
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl p-0 border-l border-white/10 bg-background/95 backdrop-blur-2xl">
        {/* Ambient gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-5 border-b border-white/5">
            <AdvisorOrb size={44} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary/90 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Founder Digital Twin™
              </div>
              <div className="text-sm text-foreground font-medium truncate">Your Soft Bridge AI Advisor</div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online · responding in real time
              </div>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
            {showGreeting && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                <div className="flex gap-3">
                  <AdvisorOrb size={36} />
                  <div className="glass rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                    <p className="text-sm text-foreground leading-relaxed">
                      {greeting || `Welcome back${founderName ? `, ${founderName.split(" ")[0]}` : ""}. I'm your Soft Bridge AI advisor — I've reviewed your file and I'm ready when you are.`}
                    </p>
                  </div>
                </div>
                <div className="mt-5 ml-12 flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3 animate-in fade-in-50 slide-in-from-bottom-1 duration-300", m.role === "user" ? "justify-end" : "")}>
                {m.role === "assistant" && <AdvisorOrb size={32} className="mt-1" />}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm shadow-[0_0_24px_oklch(0.66_0.22_285_/_0.35)]"
                      : "glass rounded-tl-sm text-foreground",
                  )}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-strong:text-foreground prose-strong:font-semibold">
                      <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {streaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <AdvisorOrb size={32} className="mt-1" />
                <div className="glass rounded-2xl rounded-tl-sm p-4">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-white/5 p-4"
          >
            <div className="glass rounded-2xl p-2 flex items-end gap-2 focus-within:border-primary/50 transition-colors">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask your advisor anything…"
                className="flex-1 min-h-[40px] max-h-32 resize-none bg-transparent border-0 focus-visible:ring-0 px-3 py-2 text-sm"
              />
              <button type="button" disabled title="Voice (coming soon)" className="p-2 rounded-lg text-muted-foreground/50 cursor-not-allowed">
                <Mic className="w-4 h-4" />
              </button>
              <Button type="submit" size="icon" disabled={!input.trim() || streaming} className="rounded-xl">
                {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground/70 mt-2 text-center">Replies are AI-generated. Your human advisor reviews critical decisions.</p>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
