import { useMemo, useRef, useState, useEffect } from "react";
import { defaultCountries, parseCountry, FlagImage, type CountryIso2 } from "react-international-phone";
import { ChevronDown, Search, Check } from "lucide-react";

type Props = {
  value: string;
  onChange: (countryName: string, iso2: CountryIso2) => void;
  placeholder?: string;
  className?: string;
};

export function CountrySelect({ value, onChange, placeholder = "Country of residence", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const all = useMemo(() => defaultCountries.map(parseCountry), []);
  const selected = useMemo(
    () => all.find((c) => c.name.toLowerCase() === value.toLowerCase()) ?? null,
    [all, value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.iso2.includes(q)
    );
  }, [all, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full h-11 rounded-xl border bg-white px-3 text-left text-[14px] flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-violet-100 ${
          open ? "border-violet-400 ring-2 ring-violet-100" : "border-slate-200 hover:border-slate-300"
        }`}
      >
        {selected ? (
          <>
            <FlagImage iso2={selected.iso2} style={{ width: 18, height: 18 }} />
            <span className="flex-1 truncate text-slate-900">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 truncate text-slate-400">{placeholder}</span>
        )}
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 rounded-xl bg-white ring-1 ring-slate-200 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] overflow-hidden">
          <div className="relative p-2.5 border-b border-slate-100">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country…"
              className="w-full rounded-lg bg-slate-50 ring-1 ring-slate-100 pl-8 pr-3 py-2 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-violet-200 focus:bg-white transition"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1 overscroll-contain">
            {filtered.map((c) => {
              const isSel = selected?.iso2 === c.iso2;
              return (
                <li key={c.iso2}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.name, c.iso2 as CountryIso2);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-violet-50 transition ${
                      isSel ? "bg-violet-50/70" : ""
                    }`}
                  >
                    <FlagImage iso2={c.iso2} style={{ width: 18, height: 18 }} />
                    <span className="flex-1 text-[13.5px] text-slate-800 truncate">{c.name}</span>
                    <span className="text-[12px] text-slate-400 tabular-nums">+{c.dialCode}</span>
                    {isSel && <Check className="w-4 h-4 text-violet-600" />}
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-4 py-6 text-center text-[13px] text-slate-400">No country found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
