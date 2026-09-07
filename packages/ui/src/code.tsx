import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Code({ children, className, ...props }: CodeProps) {
  return (
    <code
      className={cn(
        "font-mono text-xs px-1.5 py-0.5 rounded-md bg-surface-raised border border-border text-primary-light font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}
