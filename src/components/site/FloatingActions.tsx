import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { WA_LINK } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-105 transition"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 right-5 z-40 w-11 h-11 rounded-full glass-strong text-foreground flex items-center justify-center hover:border-gold/40 transition"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
