# Creative Growth — UI Guidelines

Version: 1.0

---

## Vision & Design Philosophy

Creative Growth is a premium, state-of-the-art music education platform. The user interface must feel modern, highly responsive, and inspiring at first glance.

Core principles:
- **Dark-First Glassmorphism**: Clean obsidian backgrounds (`#09090b`), slate surface cards, and subtle glassmorphic blurs (`backdrop-blur-md`).
- **Design System Token Integrity**: Every component, layout, and page MUST consume shared design tokens from `@repo/design-system` and `@repo/tailwind-config`. Hardcoded hex colors and arbitrary spacing are strictly prohibited.
- **Accessibility First**: Keyboard navigation, visible focus indicators, semantic HTML elements, and high contrast ratios are enforced across all components.
- **Micro-Animations & Smooth Motion**: Utilize Framer Motion and standard CSS transitions for smooth interactive feedback (hover effects, active states, loading indicators).

---

## Design System Tokens

### 1. Color Palette

All colors map directly to CSS variables defined in `@repo/tailwind-config/theme.css` and JS constants in `@repo/design-system`:

- **Background (Dark Obsidian)**:
  - Base: `--color-bg` (`#09090b`)
  - Subtle: `--color-bg-subtle` (`#0f0f12`)
- **Surface (Slate)**:
  - Base: `--color-surface` (`#18181b`)
  - Raised: `--color-surface-raised` (`#27272a`)
  - Overlay: `--color-surface-overlay` (`#3f3f46`)
- **Border**:
  - Base: `--color-border` (`#27272a`)
  - Subtle: `--color-border-subtle` (`#18181b`)
- **Primary (Ultraviolet)**:
  - Base: `--color-primary` (`#8b5cf6`)
  - Light: `--color-primary-light` (`#a78bfa`)
  - Dark: `--color-primary-dark` (`#7c3aed`)
  - Muted: `--color-primary-muted` (`rgba(139, 92, 246, 0.15)`)
- **Secondary (Emerald)**:
  - Base: `--color-secondary` (`#10b981`)
  - Light: `--color-secondary-light` (`#34d399`)
  - Dark: `--color-secondary-dark` (`#059669`)
  - Muted: `--color-secondary-muted` (`rgba(16, 185, 129, 0.15)`)
- **Accent (Rose)**:
  - Base: `--color-accent` (`#f43f5e`)
  - Light: `--color-accent-light` (`#fb7185`)
  - Dark: `--color-accent-dark` (`#e11d48`)
  - Muted: `--color-accent-muted` (`rgba(244, 63, 94, 0.15)`)
- **Foreground (Text)**:
  - Base: `--color-foreground` (`#fafafa`)
  - Muted: `--color-foreground-muted` (`#a1a1aa`)
  - Subtle: `--color-foreground-subtle` (`#71717a`)

---

### 2. Typography

- **Headings**: `font-heading` (`Outfit`, sans-serif)
- **Body & Controls**: `font-sans` (`Inter`, sans-serif)
- **Code & Numerical Reads**: `font-mono` (`Geist Mono`, monospace)

Scale:
- `text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-lg` (18px), `text-xl` (20px), `text-2xl` (24px), `text-3xl` (30px), `text-4xl` (36px).

---

### 3. Spacing & Border Radius

- **Border Radius**:
  - Cards & Containers: `rounded-2xl` (16px) or `rounded-3xl` (24px)
  - Inputs & Buttons: `rounded-xl` (12px) or `rounded-lg` (8px)
  - Badges & Pills: `rounded-full`
- **Gaps & Padding**:
  - Container padding: `p-6` or `p-8`
  - Stack spacing: `space-y-4` or `space-y-6`

---

## Component Architecture Rules

1. **Primitives Belong in `packages/ui`**:
   - All shared, non-domain components (Button, Input, Card, Badge, Avatar, Container, Dialog, Tabs, Tooltip, Stack, Grid) reside in `@repo/ui`.
   - Never embed business or API logic inside `@repo/ui`.

2. **Strict Design Token Usage**:
   - Do NOT use arbitrary hex strings in Tailwind classes (e.g. avoid `bg-[#123456]`).
   - Use semantic Tailwind token classes (`bg-surface`, `bg-bg-subtle`, `text-primary-light`, `border-border`).
   - For canvas/SVG fill and stroke attributes, use CSS variables (`stroke="var(--color-border)"`, `fill="var(--color-primary)"`).

3. **Dark Mode & Focus Rules**:
   - Dark mode is default.
   - All interactive elements must show a distinct focus ring: `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`.

---

## Quality Checklist for New UI Components

- [ ] Consumes `@repo/design-system` / `@repo/tailwind-config` tokens cleanly.
- [ ] Supports dark mode and high contrast.
- [ ] Accessible via keyboard (Tab / Enter / Space).
- [ ] Typed strictly in TypeScript (`no any`).
- [ ] Cleanly merged via `cn()` from `@repo/ui`.
