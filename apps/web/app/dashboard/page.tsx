import Link from "next/link";
import { 
  Play, 
  Flame, 
  Clock, 
  Trophy, 
  ArrowRight, 
  Activity, 
  Zap, 
  BookOpen 
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { name: "Racha Diaria", value: "8 días", icon: Flame, color: "text-amber-500 bg-amber-500/10" },
    { name: "Tiempo de Práctica", value: "14.5 hrs", icon: Clock, color: "text-teal-400 bg-teal-400/10" },
    { name: "Lecciones Listas", value: "12 / 30", icon: Trophy, color: "text-violet-400 bg-violet-400/10" },
  ];

  const recentCourses = [
    {
      title: "Fundamentos de Piano I",
      description: "Aprende postura, escalas básicas y digitación con el teclado MIDI.",
      progress: 35,
      level: "Principiante",
      href: "/dashboard/courses/piano-101",
    },
    {
      title: "Teoría Musical y Armonía",
      description: "Entiende intervalos, construcción de acordes y escalas armónicas.",
      progress: 60,
      level: "Intermedio",
      href: "/dashboard/courses/theory-101",
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome banner */}
      <section className="p-8 rounded-2xl border border-border bg-gradient-to-r from-primary-dark/20 via-surface/60 to-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-muted rounded-full blur-3xl -z-10" />
        <div className="max-w-2xl">
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-2">
            ¡Hola de nuevo, Juan!
          </h1>
          <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
            Tu racha se mantiene fuerte. Hoy tienes 3 lecciones disponibles y una sesión de práctica recomendada de 20 minutos con tu teclado.
          </p>
          <div className="mt-6">
            <Link 
              href="/dashboard/practice"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all hover:scale-105 shadow-glow-primary"
            >
              Comenzar Práctica Diaria
              <Play className="w-3.5 h-3.5 fill-white" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="p-6 rounded-2xl border border-border bg-surface flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-foreground-subtle font-medium">{stat.name}</p>
                <p className="text-lg font-bold text-white font-heading">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Courses progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-light" />
                Tus Cursos Activos
            </h3>
            <Link href="/dashboard/courses" className="text-xs font-semibold text-primary-light hover:text-white flex items-center gap-1">
              Ver Todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.title} className="p-6 rounded-2xl border border-border bg-surface hover:border-border transition-all space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded-full border border-primary/20 bg-primary-muted text-[10px] font-semibold text-primary-light">
                      {course.level}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-white mt-2">{course.title}</h4>
                    <p className="text-xs text-foreground-muted mt-1">{course.description}</p>
                  </div>
                  <Link 
                    href={course.href} 
                    className="p-3 rounded-lg bg-surface hover:bg-primary-muted text-foreground hover:text-primary-light border border-border hover:border-primary/30 transition-all shrink-0"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </Link>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground-subtle">Progreso</span>
                    <span className="text-primary-light font-mono">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-raised rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Quick Tools Shortcuts */}
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary-light" />
            Herramientas Rápidas
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <Link 
              href="/dashboard/practice?tool=metronome"
              className="p-5 rounded-2xl border border-border bg-surface hover:border-primary/30 transition-all flex flex-col justify-between h-40 group"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-primary-muted text-primary-light flex items-center justify-center border border-primary/15">
                  <Activity className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-primary-light group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-white">Metrónomo</h4>
                <p className="text-xs text-foreground-subtle mt-1">Practica el tempo perfecto con señales visuales dinámicas.</p>
              </div>
            </Link>

            <Link 
              href="/dashboard/practice?tool=midi"
              className="p-5 rounded-2xl border border-border bg-surface hover:border-secondary/30 transition-all flex flex-col justify-between h-40 group"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-secondary-muted text-secondary-light flex items-center justify-center border border-secondary/15">
                  <Zap className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-secondary-light group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-white">Teclado MIDI</h4>
                <p className="text-xs text-foreground-subtle mt-1">Conecta tu piano digital por USB para ver acordes interactivos.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
