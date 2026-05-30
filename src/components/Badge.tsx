import { type ReactNode, type CSSProperties } from "react";
import { clsx } from "../clsx";

type BadgeVariant = "default" | "success" | "warning" | "error" | "accent";

const variantStyles: Record<BadgeVariant, CSSProperties> = {
  default: {
    color: "var(--color-text-secondary)",
    borderColor: "var(--color-border-default)",
    background: "var(--color-bg-muted)",
  },
  success: {
    color: "var(--color-success)",
    borderColor: "var(--color-success-border)",
    background: "var(--color-success-subtle)",
  },
  warning: {
    color: "var(--color-warning)",
    borderColor: "var(--color-warning-border)",
    background: "var(--color-warning-subtle)",
  },
  error: {
    color: "var(--color-error)",
    borderColor: "var(--color-error-border)",
    background: "var(--color-error-subtle)",
  },
  accent: {
    color: "var(--color-accent)",
    borderColor: "var(--color-border-accent)",
    background: "var(--color-bg-accent)",
  },
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border",
        className
      )}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
