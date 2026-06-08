import { useState, type ReactNode, type CSSProperties } from "react";
import { LayoutGrid, Menu, X, LogOut } from "lucide-react";
import { DomeLogo } from "./DomeLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthContext";
import { getAuthSiteUrl, getHubUrl } from "../auth";
import { clsx } from "../clsx";

interface NavLink {
  label: string;
  href: string;
}

type LinkRenderer = (props: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  onClick?: () => void;
}) => ReactNode;

interface ToolHeaderProps {
  /** Tool name, rendered next to the logo for wayfinding. */
  toolName: string;
  homeHref?: string;
  /** Tool-specific links (e.g. Saved). Page navigation for multi-page tools belongs in a sidebar, not here. */
  navLinks?: NavLink[];
  /** Framework link renderer (e.g. Next.js <Link>). Falls back to <a>. */
  renderLink?: LinkRenderer;
  /** Extra desktop nav content (escape hatch). */
  extra?: ReactNode;
  /** "contained" = centered max-width; "fluid" = full-width, edge-aligned to page content. */
  width?: "contained" | "fluid";
  /** Show the host-aware "All tools" hub link. Default true. */
  showHubLink?: boolean;
  /** Label for the hub link. Default "All tools". */
  hubLabel?: string;
  /** Custom sign-in handler (e.g. open a modal). Defaults to redirecting to the auth site. */
  onSignIn?: () => void;
}

function DefaultLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  onClick?: () => void;
}) {
  return <a {...props} />;
}

export function ToolHeader({
  toolName,
  homeHref = "/",
  navLinks = [],
  renderLink,
  extra,
  width = "contained",
  showHubLink = true,
  hubLabel = "All tools",
  onSignIn,
}: ToolHeaderProps) {
  const { isAuthenticated, user, signOut } = useAuth();
  const Link = renderLink ?? DefaultLink;

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const email = user?.email;
  const initial = email ? email.charAt(0).toUpperCase() : "?";
  const hubHref = getHubUrl();

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
      return;
    }
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${getAuthSiteUrl()}/login?redirect=${returnUrl}`;
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = `${getAuthSiteUrl()}/login`;
  };

  const renderHub = (className: string, onClick?: () => void) =>
    showHubLink
      ? Link({
          href: hubHref,
          className,
          onClick,
          children: (
            <>
              <LayoutGrid size={15} strokeWidth={1.75} aria-hidden="true" />
              {hubLabel}
            </>
          ),
        })
      : null;

  return (
    <header className="site-header sticky top-0 z-40">
      <div
        className={clsx(
          "h-16 flex items-center justify-between gap-4 px-6 md:px-8",
          width === "fluid" ? "w-full" : "max-w-[1152px] mx-auto"
        )}
      >
        {/* Brand + wayfinding */}
        <div className="flex items-center min-w-0">
          {Link({
            href: homeHref,
            "aria-label": "Home",
            className: "dome-brand",
            children: <DomeLogo size="md" />,
          })}
          {toolName ? <span className="dome-toolname">{toolName}</span> : null}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {renderHub("dome-navlink")}
          {navLinks.map((link) => (
            <span key={link.href}>
              {Link({
                href: link.href,
                className: "dome-navlink",
                children: link.label,
              })}
            </span>
          ))}

          {isAuthenticated && email ? (
            <div className="dome-account">
              <button
                type="button"
                className="dome-avatar"
                aria-label={`Account: ${email}`}
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((v) => !v)}
              >
                {initial}
              </button>
              {accountOpen ? (
                <>
                  <button
                    type="button"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="dome-menu-backdrop"
                    onClick={() => setAccountOpen(false)}
                  />
                  <div className="dome-menu" role="menu">
                    <p className="dome-menu-email" title={email}>
                      {email}
                    </p>
                    <button
                      type="button"
                      role="menuitem"
                      className="dome-menu-item"
                      onClick={handleSignOut}
                    >
                      <LogOut size={15} strokeWidth={1.75} aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          ) : isAuthenticated ? (
            <button className="btn btn-neutral" onClick={handleSignOut}>
              Sign out
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSignIn}>
              Sign in
            </button>
          )}

          {extra}

          <ThemeToggle />
        </nav>

        {/* Mobile cluster: theme toggle stays inline, the rest collapses */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="dome-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X size={18} strokeWidth={1.75} />
            ) : (
              <Menu size={18} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {menuOpen ? (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="dome-menu-backdrop"
            onClick={() => setMenuOpen(false)}
          />
          <div className="dome-mobile-panel md:hidden">
            {renderHub("dome-mobile-link", () => setMenuOpen(false))}
            {navLinks.map((link) => (
              <span key={link.href}>
                {Link({
                  href: link.href,
                  className: "dome-mobile-link",
                  onClick: () => setMenuOpen(false),
                  children: link.label,
                })}
              </span>
            ))}
            {isAuthenticated ? (
              <>
                {email ? (
                  <p className="dome-menu-email" title={email}>
                    {email}
                  </p>
                ) : null}
                <button className="btn btn-neutral" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setMenuOpen(false);
                  handleSignIn();
                }}
              >
                Sign in
              </button>
            )}
          </div>
        </>
      ) : null}
    </header>
  );
}
