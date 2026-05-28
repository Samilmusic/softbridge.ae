import { useMemo, useState } from "react";
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
  label?: string;
  defaultCountry?: CountryIso2;
  className?: string;
  floatingLabel?: boolean;
};

export function PhoneField({
  value,
  onChange,
  label = "Phone / WhatsApp",
  defaultCountry,
  className = "",
  floatingLabel = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  // Best-effort country guess from browser locale (e.g. en-AE -> ae)
  const guessed = useMemo<CountryIso2>(() => {
    if (defaultCountry) return defaultCountry;
    try {
      const region =
        new Intl.Locale(navigator.language).maximize().region?.toLowerCase() ??
        "ae";
      const exists = defaultCountries.some(
        (c) => parseCountry(c).iso2 === region,
      );
      return (exists ? region : "ae") as CountryIso2;
    } catch {
      return "ae";
    }
  }, [defaultCountry]);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
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
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.dialCode.includes(q) ||
          c.iso2.includes(q),
      );
  }, [query]);

  const hasValue = (inputValue?.length ?? 0) > 0;
  const active = focused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative flex items-stretch rounded-2xl bg-white/70 backdrop-blur-md border transition-all duration-300 overflow-hidden ${
          focused
            ? "border-violet-400 bg-white shadow-[0_0_0_4px_rgba(167,139,250,0.18),0_10px_30px_-12px_rgba(124,58,237,0.25)]"
            : "border-violet-200/70 hover:border-violet-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(91,33,182,0.04)]"
        }`}
      >
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 pl-4 pr-2.5 text-sm text-slate-700 hover:bg-violet-50/60 transition-colors min-h-[52px]"
          aria-label="Select country"
        >
          <FlagImage iso2={country.iso2} style={{ width: 22, height: 22 }} />
          <span className="text-[13px] font-medium text-slate-600 tabular-nums">
            +{country.dialCode}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-violet-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Separator */}
        <div className="w-px self-stretch my-2 bg-gradient-to-b from-transparent via-violet-200 to-transparent" />

        {/* Input */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="tel"
            value={inputValue}
            onChange={handlePhoneValueChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={floatingLabel ? "" : label}
            className="w-full h-full bg-transparent px-4 pt-5 pb-2 text-[15px] text-slate-900 placeholder-slate-400 focus:outline-none min-h-[52px]"
          />
          {floatingLabel && (
            <label
              className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                active
                  ? "top-2 text-[11px] font-medium text-violet-600 tracking-wide uppercase"
                  : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
              }`}
            >
              {label}
            </label>
          )}
        </div>
      </div>

      {/* Country dropdown */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          />
          <div className="absolute z-50 left-0 right-0 mt-2 rounded-2xl bg-white/95 backdrop-blur-xl ring-1 ring-violet-200 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.4)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="relative p-3 border-b border-violet-100">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
              <input
                
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code…"
                className="w-full rounded-xl bg-violet-50/60 ring-1 ring-violet-100 pl-9 pr-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-violet-300 focus:bg-white transition"
              />
            </div>
            <ul className="max-h-72 overflow-y-auto py-1 overscroll-contain">
              {filtered.map((c) => {
                const selected = c.iso2 === country.iso2;
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
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-violet-50 transition-colors ${
                        selected ? "bg-violet-50/70" : ""
                      }`}
                    >
                      <FlagImage
                        iso2={c.iso2}
                        style={{ width: 22, height: 22 }}
                      />
                      <span className="flex-1 text-sm text-slate-800 truncate">
                        {c.name}
                      </span>
                      <span className="text-xs text-slate-500 tabular-nums">
                        +{c.dialCode}
                      </span>
                      {selected && (
                        <Check className="w-4 h-4 text-violet-600" />
                      )}
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-slate-400">
                  No country found
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
