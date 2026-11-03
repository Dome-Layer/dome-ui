import * as react from 'react';
import { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react';

interface DomeLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    /**
     * "accent" (default) is the brand blue for white or black surfaces; "white" is the same
     * wordmark for the blue surface and the top bar (design system v2.7, "Wordmark").
     */
    variant?: "accent" | "white";
    /** Explicit fill; overrides variant. */
    color?: string;
}
declare function DomeLogo({ className, size, variant, color, }: DomeLogoProps): react.JSX.Element;
declare function DomeLogoLarge({ className, size, variant, color, }: DomeLogoProps): react.JSX.Element;
declare function DomeSymbol({ className, size, }: {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}): react.JSX.Element;
declare function DomeFavicon({ className, size, }: {
    className?: string;
    size?: number;
}): react.JSX.Element;

/** The site's four languages, which the tools follow (DOME_DECISIONS 2026-11-02, roadmap row 6). */
declare const LOCALES: readonly ["en", "it", "nl", "de"];
type Locale = (typeof LOCALES)[number];
/**
 * A tool's own strings, one object per language. English is the source type, so a key missing from
 * another language fails the type check, as on the site.
 */
type Catalogue<T> = Record<Locale, T>;

interface ThemeToggleProps {
    /** Language of the accessible label. English unless the tool has turned languages on. */
    locale?: Locale;
}
declare function ThemeToggle({ locale }?: ThemeToggleProps): react.JSX.Element;

interface LanguageMenuProps {
    /** "bar": the button in the desktop tool bar with a menu below it. "panel": the list inside the phone menu. */
    variant?: "bar" | "panel";
    /** Called after a language is chosen (the phone menu closes itself with it). */
    onChoose?: () => void;
}
/**
 * The tools' language switch (row 6 canvas, signed off 2026-11-02). Every language is named in
 * itself and carries its own `lang`; the current one is marked with a tick and `aria-current`.
 * A choice is remembered for the site and every tool (`setLocale`), which the note under the list says.
 */
declare function LanguageMenu({ variant, onChoose }: LanguageMenuProps): react.JSX.Element;

/**
 * The current language, re-rendering on setLocale. English while rendering on the server and during
 * hydration (a static export is prerendered in English), so the first client render matches the HTML.
 */
declare function useLocale(): Locale;
/** The current language's entry of a catalogue. */
declare function useMessages<T>(catalogue: Catalogue<T>): T;

/**
 * The shared parts' own words: the tool bar, its menus, the theme switch and the footer. Worded as on
 * domelayer.com (its `nav` catalogue), so the site, the hub and the tools say the same thing.
 * English is the source type.
 */
declare const en: {
    home: string;
    hub: string;
    signIn: string;
    signOut: string;
    account: string;
    accountOf: (email: string) => string;
    openMenu: string;
    closeMenu: string;
    switchToLight: string;
    switchToDark: string;
    language: string;
    languageButton: (name: string) => string;
    languageNote: string;
    footerBy: (toolName: string) => string;
    footerTagline: string;
    footerExplore: string;
};
type UiMessages = typeof en;
declare const UI_MESSAGES: Catalogue<UiMessages>;

interface AuthGuardProps {
    children: React.ReactNode;
    skip?: boolean;
}
declare function AuthGuard({ children, skip }: AuthGuardProps): react.JSX.Element;

interface AuthUser {
    email?: string;
}
interface AuthState {
    isAuthenticated: boolean;
    /** Signed-in user identity, decoded from the session JWT (display-only). */
    user: AuthUser | null;
    signIn: (token: string, expiresAt?: string) => void;
    signOut: () => Promise<void>;
}
interface AuthProviderProps {
    children: ReactNode;
    onSignOut?: () => Promise<void>;
}
declare function AuthProvider({ children, onSignOut }: AuthProviderProps): react.JSX.Element;
declare function useAuth(): AuthState;

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
    /** Label for the home link. Default "Home", in the visitor's language when `languages` is on. */
    homeLabel?: string;
    /** Tool-specific links (e.g. Saved), shown next to Home. */
    navLinks?: NavLink[];
    /** Framework link renderer (e.g. Next.js <Link>) for internal routes. Falls back to <a>. */
    renderLink?: LinkRenderer;
    /** Extra desktop nav content (escape hatch). */
    extra?: ReactNode;
    /** "contained" = centered max-width; "fluid" = full-width, edge-aligned to page content. */
    width?: "contained" | "fluid";
    /**
     * Show the host-aware "All tools" link back to the signed-in hub (domelayer.com/app) when signed in:
     * leftmost in the desktop nav and first in the phone menu. Default true.
     */
    showHubLink?: boolean;
    /** Label for the hub link. Default "All tools", in the visitor's language when `languages` is on. */
    hubLabel?: string;
    /**
     * Turns the tool's languages on (roadmap row 6): the bar speaks the visitor's language (EN, IT, NL,
     * DE) and shows the language menu. Default false, so a tool that bumps dome-ui before its own
     * strings are translated stays English throughout rather than half translated.
     */
    languages?: boolean;
    /** Custom sign-in handler (e.g. open a modal). Defaults to redirecting to the auth site. */
    onSignIn?: () => void;
    /**
     * Path of the page being shown, for the current-page marker (e.g. Next.js `usePathname()`,
     * React Router `useLocation().pathname`). Defaults to the browser location, read after mount.
     */
    currentPath?: string;
}
declare function ToolHeader({ toolName, homeHref, showHomeLink, homeLabel, navLinks, renderLink, extra, width, showHubLink, hubLabel, onSignIn, currentPath, languages, }: ToolHeaderProps): react.JSX.Element;

interface ToolFooterProps {
    toolName: string;
    className?: string;
    /**
     * The footer in the visitor's language (EN, IT, NL, DE), as ToolHeader's `languages` does for the
     * bar. Default false, so a tool stays English throughout until its own strings are translated.
     */
    languages?: boolean;
}
declare function ToolFooter({ toolName, className, languages }: ToolFooterProps): react.JSX.Element;

type BadgeVariant = "default" | "success" | "warning" | "error" | "accent";
interface BadgeProps {
    variant?: BadgeVariant;
    children: ReactNode;
    className?: string;
}
declare function Badge({ variant, children, className, }: BadgeProps): react.JSX.Element;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    loading?: boolean;
    children: ReactNode;
}
declare function Button({ variant, loading, disabled, className, children, style, ...props }: ButtonProps): react.JSX.Element;

interface CardProps {
    children: ReactNode;
    className?: string;
}
declare function Card({ children, className }: CardProps): react.JSX.Element;

interface StagingBannerProps {
    /**
     * The deploy environment. The banner renders only when this equals
     * "staging". Consumers pass their existing environment signal, e.g.
     * `process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT` (Next.js) or
     * `import.meta.env.VITE_SENTRY_ENVIRONMENT` (Vite).
     */
    environment?: string;
    className?: string;
}
/**
 * Full-width banner marking non-production deploys.
 *
 * Renders nothing unless `environment === "staging"`, so it is safe to mount
 * unconditionally at the top of every app's root layout. It styles itself with
 * design-token CSS variables via inline styles (not Tailwind classes), so it
 * needs no Tailwind content-scan entry and can never be purged from a consumer's
 * CSS bundle.
 */
declare function StagingBanner({ environment, className }: StagingBannerProps): react.JSX.Element | null;

declare function clsx(...args: (string | undefined | null | false)[]): string;

export { AuthGuard, AuthProvider, Badge, Button, Card, type Catalogue, DomeFavicon, DomeLogo, DomeLogoLarge, DomeSymbol, LanguageMenu, type Locale, StagingBanner, ThemeToggle, ToolFooter, ToolHeader, UI_MESSAGES, type UiMessages, clsx, useAuth, useLocale, useMessages };
