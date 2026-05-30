import { type ReactNode, type CSSProperties } from "react";
import { DomeLogo } from "./DomeLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthContext";
import { getAuthSiteUrl } from "../auth";

interface NavLink {
  label: string;
  href: string;
}

interface ToolHeaderProps {
  toolName: string;
  homeHref?: string;
  navLinks?: NavLink[];
  renderLink?: (props: {
    href: string;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    "aria-label"?: string;
  }) => ReactNode;
  extra?: ReactNode;
}

function DefaultLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}) {
  return <a {...props} />;
}

export function ToolHeader({
  homeHref = "/",
  navLinks = [],
  renderLink,
  extra,
}: ToolHeaderProps) {
  const { isAuthenticated, signOut } = useAuth();
  const Link = renderLink ?? DefaultLink;

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="max-w-[1152px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {Link({
          href: homeHref,
          "aria-label": "Home",
          children: <DomeLogo size="md" />,
        })}

        <nav className="flex items-center gap-4">
          {navLinks.map((link) => (
            <span key={link.href}>
              {Link({
                href: link.href,
                className:
                  "font-sans text-sm font-medium transition-colors duration-150",
                style: { color: "var(--color-text-secondary)" },
                children: link.label,
              })}
            </span>
          ))}

          {isAuthenticated ? (
            <button
              onClick={async () => {
                await signOut();
                window.location.href = `${getAuthSiteUrl()}/login`;
              }}
              className="btn btn-neutral"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => {
                const returnUrl = encodeURIComponent(window.location.href);
                window.location.href = `${getAuthSiteUrl()}/login?redirect=${returnUrl}`;
              }}
              className="btn btn-primary"
            >
              Sign in
            </button>
          )}

          {extra}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
