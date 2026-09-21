"use client";

import { motion } from "framer-motion";
import { BookOpen, Activity, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { Container, Section, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui";

export function ValuePropSection() {
  const pillars = [
    {
      icon: BookOpen,
      color: "text-primary-light bg-primary-muted border-primary/20",
      accentGlow: "hover:border-primary/40",
      title: "Aprendizaje Estructurado",
      subtitle: "Rutas pedagógicas sin rodeos",
      description:
        "Metodología guiada paso a paso desde conceptos fundamentales hasta armonía avanzada y composición contemporánea.",
      bullets: [
        "Módulos interactivos secuenciales",
        "Material teórico directo y sin relleno",
        "Ejercicios adaptativos paso a paso",
      ],
    },
    {
      icon: Activity,
      color: "text-secondary-light bg-secondary-muted border-secondary/20",
      accentGlow: "hover:border-secondary/40",
      title: "Práctica Sensorial Activa",
      subtitle: "Retroalimentación en tiempo real",
      description:
        "Entrena tu oído, tiempo y digitación mediante herramientas interactivas diseñadas para maximizar la retención muscular.",
      bullets: [
        "Metrónomo háptico & visual dinámico",
        "Conexión con tu teclado MIDI físico",
        "Evaluación rítmica instantánea",
      ],
    },
    {
      icon: TrendingUp,
      color: "text-accent-light bg-accent-muted border-accent/20",
      accentGlow: "hover:border-accent/40",
      title: "Crecimiento Medible",
      subtitle: "Evolución constante del estudiante",
      description:
        "Mantén la motivación con indicadores claros de constancia, tiempo real dedicado a la práctica y matrices de habilidades.",
      bullets: [
        "Rachas de estudio y constancia",
        "Métricas detalladas de tiempo y precisión",
        "Reporte de dominio de acordes y escalas",
      ],
    },
  ];

  return (
    <Section id="value-prop" className="py-24 border-t border-border bg-bg-subtle/50 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-foreground-subtle text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-primary-light" />
            <span>NUESTRO ENFOQUE PEDAGÓGICO</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Diseñado para la forma en que los músicos realmente aprenden
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
            Eliminamos la frustración de la teoría abstracta conectando la comprensión teórica directamente con la ejecución en tu instrumento.
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card className={`h-full border border-border bg-surface hover:bg-surface-raised transition-all duration-300 ${pillar.accentGlow}`}>
                  <CardHeader className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider">
                        {pillar.subtitle}
                      </span>
                      <CardTitle className="text-xl font-heading text-white mt-1">
                        {pillar.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-0 space-y-6">
                    <CardDescription className="text-sm text-foreground-muted leading-relaxed">
                      {pillar.description}
                    </CardDescription>

                    <div className="space-y-2.5 border-t border-border/60 pt-4">
                      {pillar.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                          <CheckCircle2 className="w-4 h-4 text-secondary-light shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
