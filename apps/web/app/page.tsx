import Link from "next/link";
import { Music, Zap, BookOpen, Activity, Play, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-height-screen bg-[#030014] overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />

      {/* Header/Navbar */}
      <header className="border-b border-white/5 bg-[#030014]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-teal-400 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Creative Growth
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Características</a>
            <a href="#tools" className="hover:text-white transition-colors">Instrumentos</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planes</a>
          </nav>
          <Link 
            href="/dashboard" 
            className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#030014] rounded-md group-hover:bg-opacity-0 flex items-center gap-2">
              Comenzar Práctica
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-xs font-semibold mb-8 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          Reinventando la Educación Musical
        </div>
        
        <h1 className="font-heading font-extrabold text-5xl md:text-7xl tracking-tight max-w-4xl mx-auto leading-tight md:leading-[1.1] mb-6">
          Domina la música a través de la{" "}
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-teal-400 bg-clip-text text-transparent">
            Práctica Interactiva
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Una suite de herramientas integradas en tiempo real: metrónomo háptico visual, piano MIDI inteligente y cursos dinámicos para guiar tu crecimiento creativo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 transition-all hover:scale-105"
          >
            Entrar a la Plataforma
            <Play className="w-4 h-4 fill-white" />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all"
          >
            Explorar Herramientas
          </a>
        </div>

        {/* Hero Interactive Shell Preview */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#07041a]/60 p-4 shadow-2xl shadow-violet-950/20 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/80 to-[#030014] rounded-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-teal-500/80" />
            </div>
            <div className="text-xs text-slate-500 font-mono">practice_room.tsx</div>
            <div className="w-8" />
          </div>
          {/* Mock Interactive Widget UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[300px] text-left opacity-90 p-4">
            {/* Metronome Mock */}
            <div className="border border-white/5 rounded-xl bg-white/5 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-violet-400 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="font-heading font-semibold text-sm">Metrónomo Inteligente</span>
                </div>
                <h3 className="text-white font-bold text-2xl font-mono">120 <span className="text-xs text-slate-500">BPM</span></h3>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-teal-400 animate-ping" />
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-violet-600 to-teal-400" />
                </div>
              </div>
            </div>
            
            {/* Piano Board Mock */}
            <div className="border border-white/5 rounded-xl bg-white/5 p-5 flex flex-col justify-between col-span-1 md:col-span-2">
              <div>
                <div className="flex items-center gap-2 text-teal-400 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="font-heading font-semibold text-sm">Teclado MIDI en Vivo</span>
                </div>
                <p className="text-xs text-slate-400">Conecta tu teclado por USB para ver notas y acordes en tiempo real.</p>
              </div>
              {/* Simple Piano keys mock */}
              <div className="flex gap-1 h-20 items-end justify-center">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`rounded-b-sm border-t border-slate-600 ${
                      i === 4 || i === 7 ? "w-7 h-20 bg-teal-400" : "w-7 h-20 bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-white/5 relative bg-[#06031f]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
              Herramientas Diseñadas para tu Progreso
            </h2>
            <p className="text-slate-400">
              Un enfoque práctico interactivo que acelera el aprendizaje y la retención musical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:border-violet-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">Práctica con Feedback Visual</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ejercicios dinámicos con metrónomos visuales y analizadores que te enseñan a mantener el tempo perfecto de forma intuitiva.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:border-teal-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-teal-600/10 flex items-center justify-center text-teal-400 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">Integración MIDI Directa</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Conéctate instantáneamente. Visualiza acordes, intervalos y progresiones a medida que tocas en tu teclado midi físico o digital.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:border-fuchsia-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-600/10 flex items-center justify-center text-fuchsia-400 mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">Visualizador de Partituras</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Renderiza y practica con partituras interactivas que siguen tu progreso nota por nota con reproducción de audio integrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Creative Growth. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacidad</a>
            <a href="#" className="hover:text-slate-300">Términos</a>
            <a href="/docs" className="hover:text-slate-300">Documentación</a>
          </div>
        </div>
      </footer>
    </div>
  );
}