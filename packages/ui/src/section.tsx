import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  centered?: boolean;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

const sizeStyles = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
};

export function Section({
  title,
  description,
  centered = false,
  size = "md",
  children,
  className,
  ...props
}: SectionProps) {
  const hasHeader = Boolean(title || description);

  return (
    <section
      className={cn("w-full relative", sizeStyles[size], className)}
      {...props}
    >
      {hasHeader && (
        <div
          className={cn(
            "mb-10 space-y-2 max-w-3xl",
            centered && "mx-auto text-center"
          )}
        >
          {title && (
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl tracking-tight text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
