"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "./lib/cn";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
}

const sizeStyles = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const statusSizeStyles = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
};

const statusStyles = {
  online: "bg-secondary",
  offline: "bg-foreground-subtle",
  busy: "bg-accent",
  away: "bg-warning",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1 && parts[0]) return parts[0].charAt(0).toUpperCase();
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return "?";
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = "Avatar",
      name,
      size = "md",
      status,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const showFallback = !src || imageError;

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-full bg-surface-raised border border-border overflow-hidden select-none font-bold text-foreground-muted",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-bg ring-1 ring-border",
              statusSizeStyles[size],
              statusStyles[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
