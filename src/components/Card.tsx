import { type ReactNode } from "react";
import { clsx } from "../clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx("rounded-lg border p-6", className)}
      style={{
        background: "var(--color-bg-subtle)",
        borderColor: "var(--color-border-default)",
      }}
    >
      {children}
    </div>
  );
}
