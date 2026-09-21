"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Trophy, Award, TrendingUp, CheckCircle, BarChart3 } from "lucide-react";
import { Container, Section, Card } from "@repo/ui";

export function ProgressGrowthSection() {
  const metrics = [
    {
      icon: Flame,
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      value: "14 Días",
      label: "Racha de Práctica Diaria",
      description: "La constancia constante desarrolla memoria muscular duradera.",
    },
    {
      icon: Clock,
      iconColor: "text-secondary-light bg-secondary-muted border-secondary/20",
      value: "28.5 Hrs",
      label: "Tiempo Total de Práctica",
      description: "Medición exacta de minutos practicados activamente en instrumento.",
    },
    {
      icon: Trophy,
      iconColor: "text-primary-light bg-primary-muted border-primary/20",
      value: "24 / 30",
      label: "Habilidades Dominadas",
      description: "Evaluaciones superadas en acordes, escalas y dictado rítmico.",
    },
  ];

  const skillTree = [
    { skill: "Tríadas Mayores & Menores", level: 100, status: "Dominado" },
    { skill: "Acordes de 7ª & Dominantes", level: 85, status: "En progreso" },
    { skill: "Independencia de Manos", level: 70, status: "En progreso" },
    { skill: "Lectura en Clave de Fa", level: 50, status: "Practicando" },
  ];

  return (
    <Section id="progress" className="py-24 border-t border-border bg-bg relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-foreground-subtle text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-accent-light" />
            <span>MÉTRICAS Y EVOLUCIÓN</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Visualiza tu Progreso Musical
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg">
            Convierte tus horas de práctica en indicadores claros que demuestran tu evolución día con día.
          </p>
        </div>

        {/* Top 3 Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="border border-border bg-surface p-6 hover:border-border/80 transition-all flex flex-col justify-between h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${metric.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold font-heading text-white font-mono">{metric.value}</span>
                      <p className="text-xs text-foreground-subtle font-medium">{metric.label}</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed">{metric.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Progress Showcase Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-surface/80 p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2 text-primary-light mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="font-heading font-semibold text-xs tracking-wider uppercase">Matriz de Habilidades</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white">Dominio Técnico por Módulo</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-secondary-light bg-secondary-muted border border-secondary/20 px-3 py-1.5 rounded-lg shrink-0">
              <Award className="w-4 h-4 text-secondary-light" />
              <span>NIVEL DE ESTUDIANTE: INTERMEDIO II</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillTree.map((item) => (
              <div key={item.skill} className="p-4 rounded-xl border border-border bg-bg-subtle space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">{item.skill}</span>
                  <span className="text-foreground-subtle font-mono">{item.level}%</span>
                </div>
                <div className="w-full h-2 bg-surface-raised rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-foreground-subtle pt-1 font-mono">
                  <span>Estado: {item.status}</span>
                  {item.level === 100 && (
                    <span className="text-secondary-light flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
