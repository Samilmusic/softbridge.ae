import ifzaPhoto from "@/assets/ifza-recognition.jpg";
import { Award } from "lucide-react";

export function Recognition() {
  return (
    <section id="recognition" className="relative py-24 overflow-hidden">
      {/* Dark glass background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.08),_transparent_70%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm mb-6">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium tracking-wide text-amber-200/90 uppercase">
              IFZA Recognition
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
            Trusted Performance. Recognized Results.
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Soft Bridge was recognized by IFZA as a Top Performing Partner of
            the Month, reflecting our consistent performance, client-focused
            approach, and strong relationship with one of the UAE's leading
            free zone authorities.
          </p>
        </div>

        <div className="max-w-5xl mx-auto reveal">
          <div className="relative group">
            {/* Golden glow */}
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/40 via-amber-200/10 to-amber-600/30 rounded-3xl blur-md opacity-50" />

            {/* Photo card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl">
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                <img
                  src={ifzaPhoto}
                  alt="Soft Bridge team receiving recognition from IFZA for outstanding monthly performance"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-amber-400/30 backdrop-blur-md mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[11px] font-medium tracking-widest text-amber-200/90 uppercase">
                          Top Performing Partner
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                        Soft Bridge team receiving recognition from IFZA for
                        outstanding monthly performance.
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                      <Award className="w-5 h-5 text-amber-400" />
                      <div className="text-left">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Awarded by
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          IFZA Dubai
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
