"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Container, Section, Button } from "@repo/ui";

export function CtaSection() {
  return (
    <Section className="py-24 border-t border-border relative overflow-hidden bg-gradient-to-b from-bg to-bg-subtle">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/30 bg-gradient-to-r from-primary-dark/20 via-surface/80 to-bg p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl shadow-glow-primary/15"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary-muted text-primary-light text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Únete a Creative Growth</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            ¿Listo para transformar tu práctica musical?
          </h2>

          <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Ingresa a la suite interactiva y explora la plataforma shell diseñada para acompañar cada fase de tu aprendizaje.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2 px-8 py-4 shadow-glow-primary hover:scale-105 transition-transform text-base">
                <span>Entrar al Shell Ahora</span>
                <Play className="w-4 h-4 fill-white" />
              </Button>
            </Link>
            <a href="#courses" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 px-8 py-4 text-base">
                <span>Ver Plan de Estudios</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
