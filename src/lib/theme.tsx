import * as React from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "sb-theme";

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggleTheme: () => void };
const ThemeContext = React.createContext<Ctx | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");

  React.useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Ctx {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) return { theme: "light", setTheme: () => {}, toggleTheme: () => {} };
  return ctx;
}

/**
 * Inline script that applies the theme before paint to avoid FOUC.
 * Embed inside <head>.
 */
export const themeInitScript = `(()=>{try{var s=localStorage.getItem('${STORAGE_KEY}');var t=(s==='dark'||s==='light')?s:'light';var r=document.documentElement;if(t==='dark')r.classList.add('dark');else r.classList.remove('dark');r.style.colorScheme=t;}catch(e){}})();`;
