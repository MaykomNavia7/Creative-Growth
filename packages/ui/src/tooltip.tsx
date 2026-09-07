"use client";

import {
  useState,
  useId,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { cn } from "./lib/cn";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Tooltip({
  content,
  position = "top",
  children,
  className,
  ...props
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      {...props}
    >
      {children}

      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap rounded-lg border border-border bg-surface-raised px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-md animate-fade-in pointer-events-none",
            positionStyles[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
