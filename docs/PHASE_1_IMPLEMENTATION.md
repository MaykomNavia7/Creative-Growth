# PHASE 1 — Core Foundation Implementation

## Role

You are the Lead Software Engineer of the Creative Growth platform.

You are working inside a Turborepo using:

- Next.js 16
- React 19
- TypeScript
- Turborepo
- pnpm

Before making any change you MUST read:

- PROJECT_ARCHITECTURE.md
- docs/PROJECT_VISION.md
- docs/ROADMAP.md
- docs/UI_GUIDELINES.md

Those documents are the source of truth.

---

# Objective

Implement ONLY Phase 1.

Do NOT implement application features.

Do NOT build music functionality.

Do NOT create authentication.

Do NOT create database schemas.

Do NOT create dashboards.

Your only objective is preparing the engineering foundation.

---

# Tasks

## 1. Install styling infrastructure

Configure Tailwind CSS for the Turborepo.

Use the latest stable version compatible with Next.js 16.

Configure:

- PostCSS
- shared presets
- dark mode
- CSS variables

---

## 2. Create shared packages

Create:

packages/design-system

packages/tailwind-config

packages/config

These packages must be reusable across every app.

---

## 3. Configure Design Tokens

Create tokens for:

Colors

Typography

Spacing

Radius

Shadows

Animations

Breakpoints

Never hardcode colors inside components.

---

## 4. Theme

Create two themes

Light

Dark

The default theme is Dark.

Use CSS Variables.

---

## 5. Typography

Configure

Outfit

Inter

using Next Font.

---

## 6. Configure UI package

Refactor packages/ui into primitives.

Example:

Button

Card

Input

Textarea

Dialog

Modal

Badge

Avatar

Tabs

Accordion

Tooltip

Container

Section

Stack

Grid

Icons

Everything must be reusable.

---

## 7. Folder Architecture

Reorganize apps/web following Feature Architecture.

Example

app/

components/

features/

hooks/

providers/

services/

styles/

types/

utils/

Do NOT place everything inside components.

---

## 8. Providers

Prepare providers.

ThemeProvider

AnimationProvider

AudioProvider (stub only)

MidiProvider (stub only)

QueryProvider

No business logic.

Only architecture.

---

## 9. Configure ESLint

Improve rules.

No warnings.

Strict TypeScript.

---

## 10. Configure Prettier

Shared configuration.

---

## 11. Configure Absolute Imports

Support

@/

@repo/ui

@repo/config

etc.

---

## 12. Improve README

Replace starter README.

Explain:

Project

Apps

Packages

Architecture

Development

Build

---

# Constraints

DO NOT implement

Authentication

Dashboard

Landing Page

Music Player

Metronome

Database

Courses

Lessons

API

Everything above belongs to future phases.

---

# Deliverables

Return:

1. Summary of changes

2. New folder tree

3. Installed packages

4. Modified files

5. Remaining TODOs

Wait for approval before starting Phase 2.