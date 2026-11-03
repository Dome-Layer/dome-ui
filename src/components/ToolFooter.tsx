import { DEFAULT_LOCALE } from "../locale";
import { useLocale } from "../useLocale";
import { UI_MESSAGES } from "../messages";

interface ToolFooterProps {
  toolName: string;
  className?: string;
  /**
   * The footer in the visitor's language (EN, IT, NL, DE), as ToolHeader's `languages` does for the
   * bar. Default false, so a tool stays English throughout until its own strings are translated.
   */
  languages?: boolean;
}

export function ToolFooter({ toolName, className, languages = false }: ToolFooterProps) {
  const visitorLocale = useLocale();
  const t = UI_MESSAGES[languages ? visitorLocale : DEFAULT_LOCALE];
  return (
    <footer
      className={className}
      style={{
        borderTop: "1px solid var(--color-border-default)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: "var(--font-sans)",
          fontSize: 14,
        }}
      >
        <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
          {t.footerBy(toolName)}{" "}
          <a
            href="https://www.domelayer.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 600,
              color: "var(--color-text-primary)",
              textDecoration: "none",
            }}
          >
            Dome
          </a>
          {t.footerTagline}
        </p>
        <a
          href="https://www.domelayer.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
            color: "var(--color-accent)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {t.footerExplore}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 7h9M8 3.5 11.5 7 8 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
