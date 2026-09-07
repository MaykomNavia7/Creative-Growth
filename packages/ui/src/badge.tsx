import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "danger";
  children: ReactNode;
}

const variantStyles = {
  primary: "bg-primary-muted text-primary-light border-primary/20",
  success: "bg-success-muted text-success border-success/20",
  warning: "bg-warning-muted text-warning border-warning/20",
  danger: "bg-danger-muted text-danger border-danger/20",
};

export function Badge({
  children,
  className,
  variant = "primary",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide uppercase transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
