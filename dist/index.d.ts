import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react';

interface DomeLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    color?: string;
}
declare function DomeLogo({ className, size, color, }: DomeLogoProps): react_jsx_runtime.JSX.Element;
declare function DomeLogoLarge({ className, size, color, }: DomeLogoProps): react_jsx_runtime.JSX.Element;
declare function DomeSymbol({ className, size, }: {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}): react_jsx_runtime.JSX.Element;
declare function DomeFavicon({ className, size, }: {
    className?: string;
    size?: number;
}): react_jsx_runtime.JSX.Element;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

interface AuthGuardProps {
    children: React.ReactNode;
    skip?: boolean;
}
declare function AuthGuard({ children, skip }: AuthGuardProps): react_jsx_runtime.JSX.Element;

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
declare function AuthProvider({ children, onSignOut }: AuthProviderProps): react_jsx_runtime.JSX.Element;
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
    onClick?: () => void;
}) => ReactNode;
interface ToolHeaderProps {
    /** Tool name, rendered next to the logo for wayfinding. */
    toolName: string;
    /** Tool home — the logo and the "Home" nav link point here. Default "/". */
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
}
declare function ToolHeader({ toolName, homeHref, showHomeLink, homeLabel, navLinks, renderLink, extra, width, showHubLink, hubLabel, onSignIn, }: ToolHeaderProps): react_jsx_runtime.JSX.Element;

interface ToolFooterProps {
    toolName: string;
    className?: string;
}
declare function ToolFooter({ toolName, className }: ToolFooterProps): react_jsx_runtime.JSX.Element;

type BadgeVariant = "default" | "success" | "warning" | "error" | "accent";
interface BadgeProps {
    variant?: BadgeVariant;
    children: ReactNode;
    className?: string;
}
declare function Badge({ variant, children, className, }: BadgeProps): react_jsx_runtime.JSX.Element;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    loading?: boolean;
    children: ReactNode;
}
declare function Button({ variant, loading, disabled, className, children, style, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

interface CardProps {
    children: ReactNode;
    className?: string;
}
declare function Card({ children, className }: CardProps): react_jsx_runtime.JSX.Element;

interface StagingBannerProps {
    /**
     * The deploy environment. The banner renders only when this equals
     * "staging". Consumers pass their existing environment signal — e.g.
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
declare function StagingBanner({ environment, className }: StagingBannerProps): react_jsx_runtime.JSX.Element | null;

declare function clsx(...args: (string | undefined | null | false)[]): string;

export { AuthGuard, AuthProvider, Badge, Button, Card, DomeFavicon, DomeLogo, DomeLogoLarge, DomeSymbol, StagingBanner, ThemeToggle, ToolFooter, ToolHeader, clsx, useAuth };
