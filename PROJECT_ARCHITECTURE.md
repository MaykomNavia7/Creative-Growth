# Creative Growth

## Project Architecture

Version: 1.0

---

# Vision

Creative Growth será una plataforma premium de educación musical que combine aprendizaje estructurado, práctica interactiva, seguimiento del progreso, herramientas musicales profesionales e inteligencia artificial.

El proyecto debe ser altamente escalable, mantenible y preparado para crecer durante muchos años.

---

# Core Principles

- Clean Architecture
- Feature Driven Development
- Component Reusability
- Accessibility First
- Mobile First
- Performance First
- Type Safety
- Developer Experience
- Scalability

---

# Technology Stack

## Framework

- Next.js
- React
- TypeScript
- Turborepo

## Styling

- TailwindCSS
- Framer Motion
- Lucide React

## Validation

- Zod

## Data

- React Query

## Future

- Clerk
- Prisma o Drizzle
- Tone.js
- OpenSheetMusicDisplay

---

# Monorepo Structure

apps/

- web
- docs
- admin (future)

packages/

- ui
- design-system
- tailwind-config
- database
- audio
- lib
- eslint-config
- typescript-config

---

# Feature Architecture

features/

- landing
- dashboard
- courses
- practice
- theory
- metronome
- piano
- notation
- auth
- profile
- teacher
- student
- settings

---

# UI Architecture

packages/ui/

## Primitives

- Button
- Input
- Card
- Badge
- Avatar
- Tooltip
- Dialog
- Sheet
- Dropdown
- Tabs
- Navigation
- Sidebar

---

# Design Tokens

Typography

Spacing

Radius

Elevation

Motion

Gradients

Glass

Animations

Dark Mode

Light Mode

---

# Color Palette

Background

Dark Obsidian

Surface

Slate

Primary

Ultraviolet

Secondary

Emerald

Accent

Rose

Success

Green

Warning

Amber

Danger

Red

---

# Fonts

Headings

Outfit

Body

Inter

Code

Geist Mono

---

# Development Rules

Every new component must:

- be reusable
- be responsive
- support dark mode
- use TypeScript
- avoid duplicated logic
- include accessibility attributes
- follow the design system

---

# Folder Rules

No business logic inside pages.

Business logic belongs inside features.

Shared logic belongs inside packages/lib.

Reusable UI belongs inside packages/ui.

---

# Performance Rules

Use Server Components whenever possible.

Client Components only when required.

Lazy load heavy modules.

Optimize images.

Avoid unnecessary renders.

---

# Roadmap

Phase 1

Foundation

Phase 2

Design System

Phase 3

Landing

Phase 4

Dashboard

Phase 5

Audio Engine

Phase 6

Music Theory

Phase 7

Courses

Phase 8

Authentication

Phase 9

Teacher Dashboard

Phase 10

Production Release

---

# Golden Rule

No architectural decision may contradict this document without explicit approval.