export const colors = {
  // Background Colors (Obsidian)
  bg: "#09090b",
  bgSubtle: "#0f0f12",

  // Surface Colors (Slate)
  surface: "#18181b",
  surfaceRaised: "#27272a",
  surfaceOverlay: "#3f3f46",

  // Border Colors
  border: "#27272a",
  borderSubtle: "#18181b",

  // Primary Color (Ultraviolet)
  primary: {
    light: "#a78bfa",
    base: "#8b5cf6",
    dark: "#7c3aed",
    muted: "rgba(139, 92, 246, 0.15)",
  },

  // Secondary Color (Emerald)
  secondary: {
    light: "#34d399",
    base: "#10b981",
    dark: "#059669",
    muted: "rgba(16, 185, 129, 0.15)",
  },

  // Accent Color (Rose)
  accent: {
    light: "#fb7185",
    base: "#f43f5e",
    dark: "#e11d48",
    muted: "rgba(244, 63, 94, 0.15)",
  },

  // Feedback Colors
  success: {
    base: "#22c55e",
    muted: "rgba(34, 197, 94, 0.15)",
  },
  warning: {
    base: "#f59e0b",
    muted: "rgba(245, 158, 11, 0.15)",
  },
  danger: {
    base: "#ef4444",
    muted: "rgba(239, 68, 68, 0.15)",
  },

  // Foreground Colors
  foreground: {
    base: "#fafafa",
    muted: "#a1a1aa",
    subtle: "#71717a",
  },
} as const;
