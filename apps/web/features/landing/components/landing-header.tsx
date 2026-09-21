"use client";

import Link from "next/link";
import { Music, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-glow-primary transition-transform group-hover:scale-105">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground-muted bg-clip-text text-transparent">
            Creative Growth
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-muted">
          <a href="#value-prop" className="hover:text-white transition-colors">
            Filosofía
          </a>
          <a href="#courses" className="hover:text-white transition-colors">
            Cursos
          </a>
          <a href="#practice-tools" className="hover:text-white transition-colors">
            Herramientas
          </a>
          <a href="#progress" className="hover:text-white transition-colors">
            Progreso
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button size="sm" variant="primary" className="gap-2 shadow-glow-primary">
              <span>Entrar al Shell</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
