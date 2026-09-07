"use client";

import {
  forwardRef,
  useEffect,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "./lib/cn";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Dialog({
  open,
  onClose,
  children,
  className,
  ariaLabel,
}: DialogProps) {
  const dialogId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl space-y-4 animate-scale-up text-foreground",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-2", className)}
    {...props}
  >
    {children}
  </div>
));
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-heading font-extrabold text-xl tracking-tight text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </h2>
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-foreground-muted leading-relaxed", className)}
    {...props}
  >
    {children}
  </p>
));
DialogDescription.displayName = "DialogDescription";

export const DialogContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("py-2", className)} {...props}>
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

export const DialogFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-border mt-4",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DialogFooter.displayName = "DialogFooter";
