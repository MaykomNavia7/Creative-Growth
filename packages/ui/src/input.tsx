"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "./lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      disabled,
      id: customId,
      type = "text",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold text-foreground-muted select-none"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            "w-full bg-bg-subtle text-foreground text-xs border border-border rounded-xl px-4 py-3 placeholder:text-foreground-subtle/50 transition-colors focus:outline-none focus:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-danger focus:border-danger",
            className
          )}
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="text-xs font-semibold text-danger">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-foreground-subtle">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
