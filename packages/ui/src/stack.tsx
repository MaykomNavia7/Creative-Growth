"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./lib/cn";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  children?: ReactNode;
}

const directionStyles = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

const spacingStyles = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignStyles = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyStyles = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "col",
      spacing = "md",
      align = "stretch",
      justify = "start",
      wrap = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionStyles[direction],
          spacingStyles[spacing],
          alignStyles[align],
          justifyStyles[justify],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";
