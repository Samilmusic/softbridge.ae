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
        className="fixed right-4 sm:right-5 bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-105 transition"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed right-4 sm:right-5 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-24 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-strong text-foreground flex items-center justify-center hover:border-gold/40 transition"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
