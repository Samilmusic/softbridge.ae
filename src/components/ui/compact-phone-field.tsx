import { useMemo, useState, useRef, useEffect } from "react";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
  type CountryIso2,
} from "react-international-phone";
import { ChevronDown, Search, Check } from "lucide-react";
import "react-international-phone/style.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: CountryIso2;
  placeholder?: string;
  className?: string;
};

export function CompactPhoneField({
  value,
  onChange,
  defaultCountry,
  placeholder = "WhatsApp number",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const guessed = useMemo<CountryIso2>(() => {
    if (defaultCountry) return defaultCountry;
    try {
      const region =
        new Intl.Locale(navigator.language).maximize().region?.toLowerCase() ?? "ae";
      const exists = defaultCountries.some((c) => parseCountry(c).iso2 === region);
      return (exists ? region : "ae") as CountryIso2;
    } catch {
      return "ae";
    }
  }, [defaultCountry]);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: guessed,
    value,
    countries: defaultCountries,
    onChange: (data) => onChange(data.phone),
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return defaultCountries
      .map(parseCountry)
      .filter(
        (c) => !q || c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.iso2.includes(q)
      );
  }, [query]);

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
      <div className="flex h-11 items-stretch rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 pl-2.5 pr-2 hover:bg-slate-50 transition"
          aria-label="Select country code"
        >
          <FlagImage iso2={country.iso2} style={{ width: 18, height: 18 }} />
          <span className="text-[12.5px] font-medium text-slate-600 tabular-nums">+{country.dialCode}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <div className="w-px self-stretch my-2 bg-slate-200" />
        <input
          ref={inputRef}
          type="tel"
          value={inputValue}
          onChange={handlePhoneValueChange}
          placeholder={placeholder}
          autoComplete="tel"
          className="flex-1 min-w-0 bg-transparent px-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 rounded-xl bg-white ring-1 ring-slate-200 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] overflow-hidden">
          <div className="relative p-2.5 border-b border-slate-100">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="w-full rounded-lg bg-slate-50 ring-1 ring-slate-100 pl-8 pr-3 py-2 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-violet-200 focus:bg-white transition"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1 overscroll-contain">
            {filtered.map((c) => {
              const isSel = c.iso2 === country.iso2;
              return (
                <li key={c.iso2}>
                  <button
                    type="button"
                    onClick={() => {
                      setCountry(c.iso2 as CountryIso2);
                      setOpen(false);
                      setQuery("");
                      setTimeout(() => inputRef.current?.focus(), 0);
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
