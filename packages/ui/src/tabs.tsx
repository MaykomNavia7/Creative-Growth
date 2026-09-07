"use client";

import {
  createContext,
  useContext,
  useState,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "./lib/cn";

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue || ""
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
  };

  const baseId = useId();

  return (
    <TabsContext.Provider
      value={{ value: currentValue, onChange: handleChange, baseId }}
    >
      <div className={cn("w-full flex flex-col space-y-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 p-1 bg-surface-raised border border-border rounded-xl self-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps
  extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export function TabsTrigger({
  value: tabValue,
  children,
  className,
  disabled = false,
  ...props
}: TabsTriggerProps) {
  const { value, onChange, baseId } = useTabsContext();
  const isSelected = value === tabValue;

  const triggerId = `${baseId}-trigger-${tabValue}`;
  const panelId = `${baseId}-panel-${tabValue}`;

  return (
    <button
      id={triggerId}
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => onChange(tabValue)}
      className={cn(
        "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary select-none disabled:opacity-50 disabled:cursor-not-allowed",
        isSelected
          ? "bg-primary text-foreground shadow-glow-primary/10"
          : "text-foreground-muted hover:text-foreground hover:bg-surface",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export function TabsContent({
  value: tabValue,
  children,
  className,
  ...props
}: TabsContentProps) {
  const { value, baseId } = useTabsContext();
  const isSelected = value === tabValue;

  const triggerId = `${baseId}-trigger-${tabValue}`;
  const panelId = `${baseId}-panel-${tabValue}`;

  if (!isSelected) return null;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={triggerId}
      tabIndex={0}
      className={cn("focus-visible:outline-none animate-fade-in", className)}
      {...props}
    >
      {children}
    </div>
  );
}
