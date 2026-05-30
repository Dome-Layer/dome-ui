import { useEffect, useState } from "react";
import { getToken, getAuthSiteUrl } from "../auth";

interface AuthGuardProps {
  children: React.ReactNode;
  skip?: boolean;
}

export function AuthGuard({ children, skip = false }: AuthGuardProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (skip) {
      setChecked(true);
      return;
    }
    if (!getToken()) {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `${getAuthSiteUrl()}/login?redirect=${returnUrl}`;
    } else {
      setChecked(true);
    }
  }, [skip]);

  if (!checked) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "var(--color-bg-subtle)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-6 w-6 animate-spin rounded-full border-2"
            style={{
              borderColor: "var(--color-border-default)",
              borderTopColor: "var(--color-accent)",
            }}
          />
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Loading
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
