"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "./lib/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

const variantStyles = {
  primary:
    "bg-primary text-foreground hover:bg-primary-light active:bg-primary-dark shadow-glow-primary/20 border border-transparent",
  secondary:
    "bg-secondary text-foreground hover:bg-secondary-light active:bg-secondary-dark shadow-glow-secondary/20 border border-transparent",
  ghost:
    "bg-transparent text-foreground-muted hover:text-foreground hover:bg-surface border border-transparent",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-surface hover:border-border-subtle",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      iconStart,
      iconEnd,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-fast cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 shrink-0 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          iconStart && <span className="shrink-0">{iconStart}</span>
        )}

        {children && <span>{children}</span>}

        {!loading && iconEnd && <span className="shrink-0">{iconEnd}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
