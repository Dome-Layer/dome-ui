import { type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from "react";
import { clsx } from "../clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  children: ReactNode;
}

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  whiteSpace: "nowrap",
  border: "none",
  outline: "none",
  textDecoration: "none",
};

const variantStyles: Record<string, CSSProperties> = {
  primary: {
    background: "var(--color-accent)",
    color: "var(--color-text-on-accent)",
    padding: "12px 24px",
  },
  secondary: {
    background: "transparent",
    color: "var(--color-accent)",
    border: "1px solid var(--color-border-accent)",
    padding: "12px 24px",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-accent)",
    padding: "8px 12px",
    textDecoration: "underline",
    textUnderlineOffset: 4,
  },
};

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  className,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx("dome-btn", className)}
      disabled={disabled || loading}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...(disabled || loading ? { opacity: 0.4, cursor: "not-allowed" } : {}),
        ...style,
      }}
      {...props}
    >
      {loading && (
        <span
          className="animate-spin"
          style={{
            width: 16,
            height: 16,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
          }}
        />
      )}
      {children}
    </button>
  );
}
