import {
  useState,
  useSyncExternalStore,
  type ReactNode,
  type CSSProperties,
} from "react";
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
  "aria-current"?: "page";
  onClick?: () => void;
}) => ReactNode;

interface ToolHeaderProps {
  /** Tool name, rendered next to the logo for wayfinding. */
  toolName: string;
  /** Tool home: the logo and the "Home" nav link point here. Default "/". */
  homeHref?: string;
  /** Show the "Home" nav link (paired with navLinks). Default true. Multi-page tools with a sidebar (DocI) set this false. */
  showHomeLink?: boolean;
  /** Label for the home link. Default "Home". */
  homeLabel?: string;
  /** Tool-specific links (e.g. Saved), shown next to Home. */
  navLinks?: NavLink[];
  /** Framework link renderer (e.g. Next.js <Link>) for internal routes. Falls back to <a>. */
  renderLink?: LinkRenderer;
  /** Extra desktop nav content (escape hatch). */
  extra?: ReactNode;
  /** "contained" = centered max-width; "fluid" = full-width, edge-aligned to page content. */
  width?: "contained" | "fluid";
  /** Include the host-aware "All tools" hub link inside the account menu. Default true. */
  showHubLink?: boolean;
  /** Label for the hub link. Default "All tools". */
  hubLabel?: string;
  /** Custom sign-in handler (e.g. open a modal). Defaults to redirecting to the auth site. */
  onSignIn?: () => void;
  /**
   * Path of the page being shown, for the current-page marker (e.g. Next.js `usePathname()`,
   * React Router `useLocation().pathname`). Defaults to the browser location, read after mount.
   */
  currentPath?: string;
}

function DefaultLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  "aria-current"?: "page";
  onClick?: () => void;
}) {
  return <a {...props} />;
}

// Browser path for the current-page marker when the tool does not pass currentPath. Re-read on
// back/forward and, where the Navigation API exists, on client-side route changes. Null on the
// server, so the marker never causes a hydration mismatch.
function subscribeToLocation(onChange: () => void) {
  const navigation = (window as Window & { navigation?: EventTarget }).navigation;
  window.addEventListener("popstate", onChange);
  navigation?.addEventListener("currententrychange", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    navigation?.removeEventListener("currententrychange", onChange);
  };
}

function useBrowserPath(): string | null {
  return useSyncExternalStore(
    subscribeToLocation,
    () => window.location.pathname,
    () => null
  );
}

function normalisePath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

// The path an href points to on this site, or null for another origin.
function pathOf(href: string): string | null {
  try {
    const url = new URL(href, "http://dome.invalid");
    if (url.origin !== "http://dome.invalid" && url.origin !== window.location.origin) return null;
    return normalisePath(url.pathname);
  } catch {
    return null;
  }
}

// Index of the nav item for the page being shown: an exact match, or the longest link the path
// sits under (e.g. /saved/42 under Saved). The home link only matches exactly.
function currentIndex(
  items: { href: string; exact: boolean }[],
  path: string | null
): number {
  if (path === null) return -1;
  const here = normalisePath(path);
  let best = -1;
  let bestLength = -1;
  items.forEach((item, i) => {
    const target = pathOf(item.href);
    if (target === null) return;
    const matches =
      here === target ||
      (!item.exact && target !== "/" && here.startsWith(`${target}/`));
    if (matches && target.length > bestLength) {
      best = i;
      bestLength = target.length;
    }
  });
  return best;
}

export function ToolHeader({
  toolName,
  homeHref = "/",
  showHomeLink = true,
  homeLabel = "Home",
  navLinks = [],
  renderLink,
  extra,
  width = "contained",
  showHubLink = true,
  hubLabel = "All tools",
  onSignIn,
  currentPath,
}: ToolHeaderProps) {
  const { isAuthenticated, user, signOut } = useAuth();
  const Link = renderLink ?? DefaultLink;

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const email = user?.email;
  const initial = email ? email.charAt(0).toUpperCase() : "?";
  const hubHref = getHubUrl();

  // In-tool navigation, left to right: Home (optional) then tool-specific links (Saved...).
  const navItems = [
    ...(showHomeLink ? [{ label: homeLabel, href: homeHref, exact: true }] : []),
    ...navLinks.map((link) => ({ ...link, exact: false })),
  ];
  const browserPath = useBrowserPath();
  const current = currentIndex(navItems, currentPath ?? browserPath);

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

  return (
    <header className="site-header dome-bar sticky top-0 z-40">
      <div
        className={clsx(
          "h-16 flex items-center justify-between gap-4 px-6 md:px-8",
          width === "fluid" ? "w-full" : "max-w-[1152px] mx-auto"
        )}
      >
        {/* Brand + wayfinding (logo → tool home) */}
        <div className="flex items-center min-w-0">
          {Link({
            href: homeHref,
            "aria-label": "Home",
            className: "dome-brand",
            children: <DomeLogo size="md" variant="white" />,
          })}
          {toolName ? <span className="dome-toolname">{toolName}</span> : null}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((link, i) => (
            <span key={`${link.href}:${link.label}`}>
              {Link({
                href: link.href,
                className: clsx("dome-navlink", i === current && "is-current"),
                "aria-current": i === current ? "page" : undefined,
                children: link.label,
              })}
            </span>
          ))}

          {isAuthenticated ? (
            <div className="dome-account">
              <button
                type="button"
                className="dome-avatar"
                aria-label={email ? `Account: ${email}` : "Account"}
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
                    {email ? (
                      <p className="dome-menu-email" title={email}>
                        {email}
                      </p>
                    ) : null}
                    {showHubLink ? (
                      <a href={hubHref} role="menuitem" className="dome-menu-item">
                        <LayoutGrid size={15} strokeWidth={1.75} aria-hidden="true" />
                        {hubLabel}
                      </a>
                    ) : null}
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
          ) : (
            <button type="button" className="btn btn-inverse" onClick={handleSignIn}>
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
            {navItems.map((link, i) => (
              <span key={`${link.href}:${link.label}`}>
                {Link({
                  href: link.href,
                  className: clsx("dome-mobile-link", i === current && "is-current"),
                  "aria-current": i === current ? "page" : undefined,
                  onClick: () => setMenuOpen(false),
                  children: link.label,
                })}
              </span>
            ))}
            {isAuthenticated && showHubLink ? (
              <a
                href={hubHref}
                className="dome-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                <LayoutGrid size={16} strokeWidth={1.75} aria-hidden="true" />
                {hubLabel}
              </a>
            ) : null}
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
