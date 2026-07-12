# AGENTS.md

# Creative Growth — AI Engineering Manual

Version: 1.0

---

# Purpose

This document defines the rules every AI coding agent must follow when contributing to Creative Growth.

PROJECT_ARCHITECTURE.md is the source of truth.

If this file conflicts with PROJECT_ARCHITECTURE.md, the architecture document always wins.

---

# Mission

Your mission is NOT to build random features.

Your mission is to build a scalable, elegant, production-ready music education platform.

Every decision must improve:

- Maintainability
- Scalability
- Performance
- Accessibility
- Reusability

---

# Development Philosophy

Always think like a Senior Software Engineer.

Never think like a code generator.

Before writing code:

Analyze

Plan

Implement

Review

Optimize

---

# Architecture

Always follow Feature Driven Architecture.

Never organize the project around pages.

Business logic belongs inside features.

Reusable UI belongs inside packages/ui.

Shared utilities belong inside packages/lib.

Configurations belong inside packages/config.

Never violate this structure.

---

# Technology Stack

Framework

- Next.js 16

Language

- TypeScript

UI

- React

Monorepo

- Turborepo

Package Manager

- pnpm

Styling

- Tailwind CSS

Animation

- Framer Motion

Icons

- Lucide React

Validation

- Zod

State

- TanStack Query

---

# General Rules

Never use any.

Never disable TypeScript.

Never ignore ESLint errors.

Never duplicate code.

Never hardcode colors.

Never hardcode spacing.

Never hardcode typography.

Never hardcode shadows.

Never hardcode breakpoints.

Always use design tokens.

---

# Components

Components must be

Reusable

Composable

Responsive

Accessible

Typed

Small

Independent

---

# Naming

Use

PascalCase

for components.

camelCase

for variables.

kebab-case

for folders.

Never invent inconsistent naming.

---

# Styling

Use Tailwind utilities.

Avoid custom CSS whenever possible.

Use CSS variables for design tokens.

Dark Mode must always work.

---

# Accessibility

Every component must support

Keyboard navigation

Focus visibility

ARIA attributes

Semantic HTML

Color contrast

---

# Performance

Prefer Server Components.

Use Client Components only when required.

Lazy load heavy modules.

Optimize images.

Avoid unnecessary re-renders.

Avoid unnecessary state.

---

# Folder Rules

Never place business logic inside app/.

Never place API logic inside UI.

Never mix concerns.

Keep folders small.

---

# Features

Each feature should contain

components

hooks

services

types

utils

constants

Never create gigantic folders.

---

# UI Package

packages/ui contains only reusable primitives.

Never place business logic there.

---

# Documentation

Every architectural decision should be documented.

Never modify architecture documents without approval.

---

# Dependencies

Never install packages unless necessary.

Explain why a package is required.

Avoid unnecessary dependencies.

---

# Git

Small commits.

One concern per commit.

Clear commit messages.

---

# Refactoring

Refactor only when it improves:

Readability

Maintainability

Performance

Do not refactor for personal preference.

---

# Code Quality

Prefer readability over cleverness.

Prefer explicit code over magic.

Prefer composition over inheritance.

Prefer small functions.

Prefer pure functions.

---

# Security

Never expose secrets.

Never hardcode API keys.

Never commit credentials.

---

# Phase Rules

Work only on the approved phase.

Never implement future phases.

Stop after finishing the assigned phase.

Wait for approval.

---

# Forbidden

Do NOT create:

Authentication

Database

Courses

Dashboard

Audio Engine

Music Theory

Payments

Notifications

Analytics

unless explicitly requested.

---

# Communication

Before making changes:

Explain the plan.

After finishing:

Explain

Files changed

Packages installed

Architecture impact

Remaining TODOs

---

# Goal

Build software that can be maintained for the next 10 years.

Every line of code should make the platform stronger.

Quality is always more important than speed.