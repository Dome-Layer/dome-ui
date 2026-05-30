interface ToolFooterProps {
  toolName: string;
  className?: string;
}

export function ToolFooter({ toolName, className }: ToolFooterProps) {
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
          {toolName} is a free tool by{" "}
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
          {" "}&mdash; Governance-Driven Operational AI.
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
          Explore Dome
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
