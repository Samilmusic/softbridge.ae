import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({ component: AuthLayout });

function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) navigate({ to: "/login", replace: true });
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );
  }
  return <Outlet />;
}
