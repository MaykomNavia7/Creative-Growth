# @repo/tailwind-config

Shared **Tailwind CSS v4** design tokens and keyframe animations for the
Creative Growth monorepo.

---

## Contents

| File | Purpose |
|---|---|
| `theme.css` | Design tokens — colors, typography, spacing, radius, shadows, gradients, glass, animation variables |
| `keyframes.css` | `@keyframes` declarations — fade, slide, scale, shimmer, glow, float, spin |
| `index.css` | Full bundle — imports both `theme.css` and `keyframes.css` |

---

## Usage

In any app's global CSS file, after `@import "tailwindcss"`:

```css
/* Full bundle (recommended) */
@import "tailwindcss";
@import "@repo/tailwind-config/index.css";

/* Or selectively */
@import "tailwindcss";
@import "@repo/tailwind-config/theme.css";     /* tokens only  */
@import "@repo/tailwind-config/keyframes.css"; /* anims only   */
```

---

## Design Tokens

All tokens are CSS custom properties exposed via Tailwind's `@theme` block.

### Colors

| Variable | Value | Role |
|---|---|---|
| `--color-bg` | `#09090b` | Page background (Dark Obsidian) |
| `--color-surface` | `#18181b` | Cards, panels (Slate) |
| `--color-primary` | `#8b5cf6` | Brand violet (Ultraviolet) |
| `--color-secondary` | `#10b981` | Emerald green |
| `--color-accent` | `#f43f5e` | Rose / danger |
| `--color-foreground` | `#fafafa` | Primary text |
| `--color-foreground-muted` | `#a1a1aa` | Secondary text |

### Typography

| Variable | Value |
|---|---|
| `--font-heading` | `"Outfit", sans-serif` |
| `--font-sans` | `"Inter", sans-serif` |
| `--font-mono` | `"Geist Mono", monospace` |

### Animations (keyframes)

| Name | Effect |
|---|---|
| `fade-in` / `fade-out` | Opacity transitions |
| `slide-in-up/down/left/right` | Directional entrance |
| `scale-in` / `scale-out` | Scale + fade entrance |
| `shimmer` | Loading skeleton sweep |
| `pulse-glow` | Violet neon pulse |
| `float` | Subtle levitation |
| `spin-slow` | Continuous rotation |

---

## Source of Truth

All design decisions originate from [`PROJECT_ARCHITECTURE.md`](../../PROJECT_ARCHITECTURE.md).

No design token may be added or modified without updating that document first.
