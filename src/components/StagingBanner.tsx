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
export function StagingBanner({ environment, className }: StagingBannerProps) {
  if (environment !== "staging") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={className}
      style={{
        width: "100%",
        padding: "6px 16px",
        textAlign: "center",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-warning)",
        background: "var(--color-warning-subtle)",
        borderBottom: "1px solid var(--color-warning-border)",
      }}
    >
      Staging environment — not production
    </div>
  );
}
