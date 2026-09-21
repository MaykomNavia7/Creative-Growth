"use client";

import { motion } from "framer-motion";
import { Activity, Zap, Music, Disc, Sparkles } from "lucide-react";
import { Container, Section, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@repo/ui";

export function PracticeToolsSection() {
  const tools = [
    {
      icon: Activity,
      title: "Metrónomo Háptico & Visual",
      subtitle: "Tempo Preciso en Tiempo Real",
      description:
        "Siente y visualiza la subdivisión rítmica con pulsos en color, acentos personalizables y firma de tiempo dinámica.",
      accent: "from-primary/20 via-surface to-bg",
      borderColor: "hover:border-primary/50",
      badge: "Sincro LED",
      mockWidget: (
        <div className="mt-4 p-4 rounded-xl bg-bg border border-border space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="text-foreground-subtle">ACENTO: 1er TIEMPO</span>
            <span className="text-primary-light font-bold">140 BPM</span>
          </div>
          <div className="flex gap-1.5 justify-between">
            <div className="h-2 flex-1 rounded bg-primary shadow-glow-primary" />
            <div className="h-2 flex-1 rounded bg-surface-raised" />
            <div className="h-2 flex-1 rounded bg-surface-raised" />
            <div className="h-2 flex-1 rounded bg-surface-raised" />
          </div>
        </div>
      ),
    },
    {
      icon: Zap,
      title: "Teclado MIDI en Vivo",
      subtitle: "Reconocimiento Instantáneo",
      description:
        "Conecta cualquier teclado MIDI USB. La plataforma detecta automáticamente las notas tocadas, inversiones y armónicos.",
      accent: "from-secondary/20 via-surface to-bg",
      borderColor: "hover:border-secondary/50",
      badge: "Plug & Play",
      mockWidget: (
        <div className="mt-4 p-4 rounded-xl bg-bg border border-border space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="text-foreground-subtle">ACORDE RECONOCIDO:</span>
            <span className="text-secondary-light font-bold">Fm9 (Fa menor 9)</span>
          </div>
          <div className="flex gap-1 h-8 items-end justify-center">
            {[true, false, true, false, true, true, false].map((active, i) => (
              <div
                key={i}
                className={`flex-1 h-full rounded-b-sm border ${
                  active ? "bg-secondary border-secondary" : "bg-surface border-border"
                }`}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: Music,
      title: "Visualizador de Partituras",
      subtitle: "Lectura Interactiva",
      description:
        "Sigue el pentagrama nota a nota en tiempo real mientras escuchas el audio de referencia o tocas en tu instrumento.",
      accent: "from-accent/20 via-surface to-bg",
      borderColor: "hover:border-accent/50",
      badge: "Interactive Score",
      mockWidget: (
        <div className="mt-4 p-4 rounded-xl bg-bg border border-border space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-foreground-subtle">PENTAGRAMA: CLAVE DE SOL</span>
            <span className="text-accent-light">PASO 4/16</span>
          </div>
          <div className="h-8 border-b border-t border-border/80 flex items-center justify-around px-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-subtle" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-subtle" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-subtle" />
          </div>
        </div>
      ),
    },
    {
      icon: Disc,
      title: "Entrenador de Oído",
      subtitle: "Discriminación Tonal",
      description:
        "Desarrolla el oído armónico identificando intervalos, modos griegos y progresiones de acordes mediante cuestionarios auditivos.",
      accent: "from-primary/20 via-surface to-bg",
      borderColor: "hover:border-primary/50",
      badge: "Ear Training",
      mockWidget: (
        <div className="mt-4 p-4 rounded-xl bg-bg border border-border space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="text-foreground-subtle">INTERVALO ESCUCHADO:</span>
            <span className="text-primary-light font-bold">5ª Justa (7 semitonos)</span>
          </div>
          <div className="w-full bg-surface-raised h-2 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Section id="practice-tools" className="py-24 border-t border-border bg-bg-subtle/40 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-foreground-subtle text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span>HERRAMIENTAS INTERACTIVAS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Una Suite Musical en tu Navegador
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg">
            Todo lo necesario para sesiones de práctica efectivas, precisas y visualmente estimulantes.
          </p>
        </div>

        {/* Tools 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className={`h-full border border-border bg-surface transition-all duration-300 ${tool.borderColor} group overflow-hidden`}>
                  <CardHeader className="p-6 pb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-surface-raised flex items-center justify-center border border-border group-hover:border-primary/40 transition-colors">
                        <Icon className="w-5 h-5 text-primary-light" />
                      </div>
                      <Badge variant="primary" className="text-[10px] font-mono border-border bg-surface text-foreground-subtle">
                        {tool.badge}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-foreground-subtle">{tool.subtitle}</span>
                      <CardTitle className="text-xl font-heading text-white mt-0.5">
                        {tool.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-0 space-y-4">
                    <CardDescription className="text-sm text-foreground-muted leading-relaxed">
                      {tool.description}
                    </CardDescription>

                    {tool.mockWidget}
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
