import * as React from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const Ctx = React.createContext<AuthState>({
  isAuthenticated: false, user: null, session: null, loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({
    isAuthenticated: false, user: null, session: null, loading: true,
  });

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      setState({
        isAuthenticated: !!session,
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });
    supabase.auth.getSession().then(({ data }) => {
      setState({
        isAuthenticated: !!data.session,
        user: data.session?.user ?? null,
        session: data.session,
        loading: false,
      });
    });
    return () => subscription.unsubscribe();
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function useAuth() { return React.useContext(Ctx); }
