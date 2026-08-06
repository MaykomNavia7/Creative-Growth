"use client";

import { useState } from "react";
import { 
  Trophy, 
  Award, 
  MessageSquare, 
  Sparkles, 
  Plus, 
  ArrowRight,
  BookOpen,
  FileCheck,
  UserCheck
} from "lucide-react";

export default function ExploreAndMetrics() {
  const [role, setRole] = useState<"student" | "teacher">("student");

  // Student metrics mock data
  const achievements = [
    { name: "Primer Acorde", desc: "Toca tu primer acorde triada mayor en el teclado MIDI.", date: "Hace 5 días", icon: Award },
    { name: "Tempo Firme", desc: "Practica 10 minutos seguidos con el metrónomo a 120 BPM.", date: "Hace 3 días", icon: Trophy },
    { name: "Lectura Perfecta", desc: "Completa la melodía de Twinkle Twinkle sin cometer errores.", date: "Ayer", icon: Sparkles },
  ];

  const teacherFeedback = [
    {
      teacher: "Prof. Alejandro Silva",
      course: "Fundamentos de Piano I",
      date: "Ayer, 4:32 PM",
      message: "Tu tempo en la escala de Do Mayor está mejorando mucho. Presta atención al cruce de pulgar en la nota Fa. Intenta relajar más la muñeca derecha al pulsar."
    },
    {
      teacher: "Dra. María Ortega",
      course: "Teoría Musical y Armonía",
      date: "Hace 4 días",
      message: "Excelente puntaje en el cuestionario de intervalos. En tu próximo ejercicio escrito, recuerda verificar las armaduras de clave con bemoles."
    }
  ];

  // Teacher tools mock states
  const [newScoreTitle, setNewScoreTitle] = useState("");
  const [newScoreLevel, setNewScoreLevel] = useState("Principiante");
  const [scores, setScores] = useState([
    { title: "Para Elisa - L. v. Beethoven", level: "Intermedio", date: "Subido hoy" },
    { title: "Estudio Op. 100 No. 2 - F. Burgmüller", level: "Principiante", date: "Subido hace 2 días" }
  ]);

  const handleUploadScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScoreTitle) return;
    setScores(prev => [{ title: newScoreTitle, level: newScoreLevel, date: "Subido recién" }, ...prev]);
    setNewScoreTitle("");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Role Toggle Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-3xl text-white">Progreso y Retroalimentación</h1>
          <p className="text-foreground-muted text-sm mt-1">Monitorea tus metas, logros y comentarios de profesores.</p>
        </div>

        {/* Dynamic Role Switcher */}
        <div className="flex p-1 bg-surface border border-border rounded-xl self-start">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              role === "student"
                ? "bg-primary text-white"
                : "text-foreground-muted hover:text-white"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Vista Estudiante
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              role === "teacher"
                ? "bg-secondary text-white"
                : "text-foreground-muted hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Vista Profesor
          </button>
        </div>
      </div>

      {/* STUDENT VIEW */}
      {role === "student" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Achievements list */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-light" />
              Logos Desbloqueados
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach) => {
                const Icon = ach.icon;
                return (
                  <div key={ach.name} className="p-5 rounded-2xl border border-border bg-surface/45 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-muted border border-primary/15 flex items-center justify-center text-primary-light shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">{ach.name}</h4>
                      <p className="text-[11px] text-foreground-muted leading-relaxed mt-1">{ach.desc}</p>
                      <span className="block text-[10px] text-foreground-subtle font-semibold font-mono mt-2">{ach.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teacher Feedback list */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-secondary-light" />
              Comentarios de Profesores
            </h3>

            <div className="space-y-4">
              {teacherFeedback.map((fb, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-border bg-surface space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white leading-none">{fb.teacher}</h4>
                      <span className="text-[10px] text-foreground-subtle font-semibold font-mono mt-1 block">{fb.course}</span>
                    </div>
                    <span className="text-[9px] text-foreground-subtle font-semibold font-mono">{fb.date}</span>
                  </div>
                  <p className="text-[11px] text-foreground-muted leading-relaxed italic border-l border-secondary/30 pl-3">
                    &ldquo;{fb.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          </div>
      )}

      {/* TEACHER VIEW */}
      {role === "teacher" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left panel: Upload and assign score */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-secondary-light" />
              Subir Nueva Partitura de Práctica
            </h3>

            <form onSubmit={handleUploadScore} className="p-6 border border-border bg-surface/45 rounded-3xl space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground-subtle">Título de la Pieza / Ejercicio</label>
                <input
                  type="text"
                  placeholder="ej. Sonata para Piano No. 16 en Do Mayor"
                  value={newScoreTitle}
                  onChange={(e) => setNewScoreTitle(e.target.value)}
                  className="w-full bg-bg-subtle text-foreground border border-border rounded-xl px-4 py-3 text-xs placeholder:text-foreground-subtle/50 focus:outline-none focus:border-secondary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground-subtle">Nivel de Dificultad</label>
                  <select
                    value={newScoreLevel}
                    onChange={(e) => setNewScoreLevel(e.target.value)}
                    className="w-full bg-bg-subtle text-foreground border border-border rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground-subtle">Archivo de Música (MusicXML/PDF)</label>
                  <div className="w-full h-10 border border-dashed border-border rounded-xl flex items-center justify-center text-[10px] text-foreground-subtle font-semibold cursor-not-allowed">
                    Haz clic para adjuntar archivo
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-lg shadow-glow-secondary/15 transition-all flex items-center justify-center gap-1.5"
              >
                Subir partitura interactiva
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right panel: Active sub scores directory */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary-light" />
              Directorio de Partituras
            </h3>

            <div className="space-y-3">
              {scores.map((score, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border bg-surface flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{score.title}</h4>
                    <span className="text-[9px] text-foreground-subtle font-mono font-semibold block mt-1">{score.date}</span>
                  </div>
                  <span className="px-2 py-0.5 border border-secondary/20 bg-secondary-muted text-[9px] font-bold text-secondary-light rounded-md">
                    {score.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
