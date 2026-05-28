import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) navigate({ to: "/portal", replace: true });
  }, [isAuthenticated, navigate]);

  const sendMagic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/portal` },
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send link");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/portal` });
    if (result.error) toast.error(result.error.message);
    if (!result.redirected && !result.error) navigate({ to: "/portal", replace: true });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(circle_at_top,oklch(0.2_0.04_265),oklch(0.135_0.02_260))]">
      <div className="w-full max-w-md glass-strong rounded-3xl p-8 border border-white/10">
        <Link to="/" className="text-[11px] uppercase tracking-[0.25em] text-gold">Soft Bridge</Link>
        <h1 className="font-display text-2xl text-foreground mt-3">Client portal access</h1>
        <p className="text-sm text-muted-foreground mt-2">Secure passwordless sign-in. We'll send a magic link to your inbox.</p>

        {sent ? (
          <div className="mt-6 p-5 rounded-2xl border border-gold/30 bg-gold/5 text-center">
            <Mail className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-sm text-foreground">Magic link sent to <span className="font-medium">{email}</span>.</p>
            <p className="text-xs text-muted-foreground mt-1">Open the link from this device to sign in.</p>
          </div>
        ) : (
          <form onSubmit={sendMagic} className="mt-6 grid gap-3">
            <div>
              <Label htmlFor="em">Email</Label>
              <Input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending…</> : <><Sparkles className="w-4 h-4 mr-2" />Send magic link</>}
            </Button>
            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-card px-2 text-muted-foreground">or</span></div>
            </div>
            <Button type="button" variant="outline" disabled={loading} onClick={google} className="w-full border-white/15">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.3h5.9c-.3 1.4-1.1 2.5-2.3 3.3v2.7h3.7c2.2-2 3.4-5 3.4-8.1z"/><path fill="#34A853" d="M12 23c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.8H1.8v3C3.7 20.5 7.5 23 12 23z"/><path fill="#FBBC05" d="M5.6 13.6c-.2-.7-.3-1.4-.3-2.1s.1-1.4.3-2.1V6.4H1.8C1 7.9.5 9.6.5 11.5s.4 3.6 1.3 5.1l3.8-3z"/><path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.5 0 3.7 2.5 1.8 6.4l3.8 3C6.5 6.6 9 4.6 12 4.6z"/></svg>
              Continue with Google
            </Button>
          </form>
        )}
        <p className="text-[11px] text-muted-foreground text-center mt-6">By signing in you agree to Soft Bridge's terms. <Link to="/" className="text-foreground/70 hover:text-foreground">Back to site</Link></p>
      </div>
    </div>
  );
}
