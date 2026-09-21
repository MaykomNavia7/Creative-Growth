"use client";

import Link from "next/link";
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Trophy, 
  Award, 
  CheckCircle, 
  BarChart2, 
  Zap, 
  ArrowRight 
} from "lucide-react";
import { Card, Badge, Button } from "@repo/ui";

export default function ProgressPage() {
  const stats = [
    { name: "Racha Actual", value: "14 Días", change: "+3 esta semana", icon: Flame, color: "text-amber-500 bg-amber-500/10" },
    { name: "Horas de Práctica", value: "28.5 hrs", change: "4.2 hrs esta semana", icon: Clock, color: "text-teal-400 bg-teal-400/10" },
    { name: "Precisión Rítmica", value: "94.2%", change: "+2.1% en metrónomo", icon: Zap, color: "text-violet-400 bg-violet-400/10" },
    { name: "Módulos Dominados", value: "18 / 24", change: "75% completado", icon: Trophy, color: "text-rose-400 bg-rose-400/10" },
  ];

  const recentMilestones = [
    { title: "Dominio de Tríadas Menores", date: "Ayer", score: "98% Precisión", icon: Award },
    { title: "Sesión de Metrónomo a 140 BPM", date: "Hace 3 días", score: "15 min continuos", icon: Clock },
    { title: "Entrenamiento de Oído: 5ª Justa", date: "Hace 5 días", score: "Nivel 2 Superado", icon: CheckCircle },
  ];

  const skillMatrix = [
    { category: "Teoría & Armonía", progress: 85, color: "from-primary to-primary-light" },
    { category: "Independencia de Manos", progress: 70, color: "from-secondary to-secondary-light" },
    { category: "Lectura en Pentagrama", progress: 60, color: "from-accent to-accent-light" },
    { category: "Dictado Rítmico", progress: 92, color: "from-primary to-secondary" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner Header */}
      <section className="p-8 rounded-2xl border border-border bg-gradient-to-r from-primary-dark/20 via-surface/60 to-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-muted rounded-full blur-3xl -z-10" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary-muted text-primary-light text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Centro de Métricas Estudiantil</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
              Tu Evolución Musical
            </h1>
            <p className="text-foreground-muted text-sm md:text-base max-w-xl">
              Monitorea la consistencia de tu práctica, la velocidad de respuesta en tu instrumento y tus logros alcanzados.
            </p>
          </div>
          <Link href="/dashboard/practice" className="shrink-0">
            <Button size="md" variant="primary" className="gap-2 shadow-glow-primary">
              <span>Continuar Práctica</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats 4-Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="border border-border bg-surface p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-foreground-subtle">{stat.change}</span>
              </div>
              <div>
                <p className="text-xs text-foreground-subtle font-medium">{stat.name}</p>
                <p className="text-2xl font-bold text-white font-heading mt-0.5">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Main Grid: Skill Matrix & Milestone History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Skill Matrix Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border bg-surface p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-primary-light" />
                  Matriz de Competencias
                </h3>
                <p className="text-xs text-foreground-subtle mt-0.5">Nivel evaluado según respuestas en ejercicios activos</p>
              </div>
              <Badge variant="primary" className="text-xs font-mono">Nivel 4 / 10</Badge>
            </div>

            <div className="space-y-5">
              {skillMatrix.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white">{item.category}</span>
                    <span className="font-mono text-primary-light font-bold">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-raised rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Recent Milestones */}
        <div className="space-y-6">
          <Card className="border border-border bg-surface p-6 space-y-6">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary-light" />
              Logros Recientes
            </h3>

            <div className="space-y-4">
              {recentMilestones.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-bg-subtle space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-secondary-light" />
                        <span className="text-xs font-semibold text-white">{m.title}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-foreground-subtle">
                      <span>{m.date}</span>
                      <span className="text-primary-light font-medium">{m.score}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
