"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Play, ArrowRight, Activity, Zap, Volume2, Music2 } from "lucide-react";
import { Button, Badge } from "@repo/ui";

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="text-center max-w-4xl mx-auto space-y-8">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2"
        >
          <Badge variant="primary" className="py-1.5 px-4 text-xs gap-2 font-medium border border-primary/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>Conservatorio Digital + Suite de Práctica Sensorial</span>
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-white"
        >
          El espacio definitivo para{" "}
          <span className="bg-gradient-to-r from-primary-light via-accent-light to-secondary-light bg-clip-text text-transparent">
            acelerar tu maestría musical
          </span>
        </motion.h1>

        {/* Subheadline Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-foreground-muted text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Fusionamos teoría estructurada, metrónomo visual háptico y retroalimentación MIDI en tiempo real en una plataforma obsidian elegante y responsive.
        </motion.p>

        {/* Call-to-action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2 text-base px-8 py-4 shadow-glow-primary hover:scale-105 transition-transform">
              <span>Explorar Plataforma Shell</span>
              <Play className="w-4 h-4 fill-white" />
            </Button>
          </Link>
          <a href="#practice-tools" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-8 py-4">
              <span>Ver Herramientas</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Hero Interactive Shell Preview Visual Component */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-border bg-surface/70 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-glow-primary/10"
      >
        {/* Shell Window Bar */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-subtle font-mono bg-bg-subtle px-3 py-1 rounded-md border border-border">
            <Music2 className="w-3.5 h-3.5 text-primary-light" />
            <span>live_studio_environment.tsx</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[11px] font-mono text-secondary-light">STUDIO ONLINE</span>
          </div>
        </div>

        {/* Content Mock Grid inside Visual Component */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Metronome Mock Widget */}
          <div className="border border-border rounded-xl bg-bg-subtle p-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-primary-light">
                  <Activity className="w-4 h-4" />
                  <span className="font-heading font-semibold text-xs tracking-wider uppercase">Metrónomo Háptico</span>
                </div>
                <Badge variant="primary" className="text-[10px] py-0 px-2">Visual Beat</Badge>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-white font-mono tracking-tight">120</span>
                <span className="text-xs text-foreground-subtle uppercase font-mono">BPM · 4/4</span>
              </div>
            </div>

            {/* Visual Beat Indicator Pulsing Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-foreground-subtle font-mono">
                <span>Tiempo 3 de 4</span>
                <span className="text-secondary-light font-semibold">EN SINCRO</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((beat) => (
                  <div
                    key={beat}
                    className={`h-3 rounded-md transition-all duration-300 ${
                      beat === 3
                        ? "bg-secondary shadow-glow-secondary scale-105"
                        : "bg-surface-raised border border-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* MIDI Live Keyboard Interactive Visual Widget */}
          <div className="lg:col-span-2 border border-border rounded-xl bg-bg-subtle p-5 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-secondary-light mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="font-heading font-semibold text-xs tracking-wider uppercase">Teclado MIDI en Vivo</span>
                </div>
                <p className="text-xs text-foreground-muted">
                  Detección instantánea de acordes: <span className="text-white font-mono font-semibold">Cmaj7 (Do Mayor 7)</span>
                </p>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface border border-border text-xs text-foreground-subtle">
                <Volume2 className="w-3.5 h-3.5 text-secondary" />
                <span>USB MIDI OK</span>
              </div>
            </div>

            {/* Stylized Piano Board Render */}
            <div className="relative pt-2 pb-1 bg-surface-raised/40 rounded-xl border border-border p-3 overflow-hidden">
              <div className="flex justify-center gap-1.5 h-24">
                {[
                  { note: "C4", active: true },
                  { note: "D4", active: false },
                  { note: "E4", active: true },
                  { note: "F4", active: false },
                  { note: "G4", active: true },
                  { note: "A4", active: false },
                  { note: "B4", active: true },
                  { note: "C5", active: false },
                ].map((key, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-b-md border transition-all flex items-end justify-center pb-2 text-[10px] font-mono ${
                      key.active
                        ? "bg-gradient-to-b from-primary-dark to-primary text-white border-primary shadow-glow-primary scale-[0.98]"
                        : "bg-surface hover:bg-surface-raised border-border text-foreground-subtle"
                    }`}
                  >
                    {key.note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
