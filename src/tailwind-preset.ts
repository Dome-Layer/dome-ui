const domePreset = {
  theme: {
    extend: {
      colors: {
        "dome-bg": "var(--color-bg-base)",
        "dome-surface": "var(--color-bg-subtle)",
        "dome-elevated": "var(--color-bg-muted)",
        "dome-bg-accent": "var(--color-bg-accent)",
        "dome-bg-accent-hover": "var(--color-bg-accent-hover)",
        "dome-bg-inverse": "var(--color-bg-inverse)",

        "dome-text": "var(--color-text-primary)",
        "dome-muted": "var(--color-text-secondary)",
        "dome-tertiary": "var(--color-text-tertiary)",
        "dome-text-accent": "var(--color-text-accent)",
        "dome-text-on-accent": "var(--color-text-on-accent)",
        "dome-text-on-inverse": "var(--color-text-on-inverse)",

        "dome-border-subtle": "var(--color-border-subtle)",
        "dome-border": "var(--color-border-default)",
        "dome-border-strong": "var(--color-border-strong)",
        "dome-border-accent": "var(--color-border-accent)",

        "dome-accent": "var(--color-accent)",
        "dome-accent-hover": "var(--color-accent-hover)",
        "dome-accent-active": "var(--color-accent-active)",
        "dome-accent-subtle": "var(--color-accent-subtle)",

        "dome-success": "var(--color-success)",
        "dome-success-subtle": "var(--color-success-subtle)",
        "dome-success-border": "var(--color-success-border)",
        "dome-warning": "var(--color-warning)",
        "dome-warning-subtle": "var(--color-warning-subtle)",
        "dome-warning-border": "var(--color-warning-border)",
        "dome-error": "var(--color-error)",
        "dome-error-subtle": "var(--color-error-subtle)",
        "dome-error-border": "var(--color-error-border)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      borderRadius: {
        dome: "var(--radius-md)",
        "dome-sm": "var(--radius-sm)",
        "dome-lg": "var(--radius-lg)",
        "dome-xl": "var(--radius-xl)",
      },
      boxShadow: {
        "dome-sm": "var(--shadow-sm)",
        "dome-md": "var(--shadow-md)",
        "dome-lg": "var(--shadow-lg)",
      },
    },
  },
};

export default domePreset;
