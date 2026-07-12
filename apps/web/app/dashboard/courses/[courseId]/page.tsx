"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { getCourseById } from "../../../../services/courseService";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  FileText,
  Check,
  Video
} from "lucide-react";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default function CoursePlayerPage({ params }: PageProps) {
  const { courseId } = use(params);
  const course = getCourseById(courseId);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  if (!course) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-white">Curso no encontrado</h2>
        <Link href="/dashboard/courses" className="text-violet-400 font-semibold flex items-center justify-center gap-1.5 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver a cursos
        </Link>
      </div>
    );
  }

  const activeLesson = course.lessons[activeLessonIndex] || course.lessons[0];

  const toggleLessonComplete = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering active lesson switch
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
  };

  const nextLesson = () => {
    if (activeLessonIndex + 1 < course.lessons.length) {
      setActiveLessonIndex(prev => prev + 1);
    }
  };

  const prevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
    }
  };

  // Calculate dynamic progress percentage
  const totalLessons = course.lessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <Link 
          href="/dashboard/courses" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Cursos
        </Link>
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          {course.title}
        </span>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Lesson Player and Material (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Custom styled HTML5 Video Player */}
          {activeLesson?.videoUrl ? (
            <div className="relative aspect-video rounded-3xl border border-white/5 overflow-hidden bg-black shadow-xl group">
              <video 
                key={activeLesson.id} // Forces reload when active lesson changes
                src={activeLesson.videoUrl} 
                controls 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-3xl border border-white/5 bg-[#050314]/80 flex flex-col items-center justify-center text-slate-500 space-y-2">
              <Video className="w-12 h-12 text-slate-600 animate-pulse" />
              <p className="text-sm">Video no disponible en esta lección.</p>
            </div>
          )}

          {/* Lesson Header Title */}
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-white mb-2">
              {activeLesson?.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeLesson?.duration}
              </span>
              <span className="flex items-center gap-1.5 text-violet-400 bg-violet-400/5 px-2 py-0.5 rounded-lg border border-violet-500/10">
                <BookOpen className="w-3.5 h-3.5" />
                Lección {activeLessonIndex + 1} de {course.lessons.length}
              </span>
            </div>
          </div>

          {/* Lesson Body Content (Simulated Markdown parse) */}
          <article className="border border-white/5 bg-[#07041c]/40 p-6 rounded-2xl backdrop-blur-md prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
            <div className="flex items-center gap-2 text-violet-400 font-heading font-bold text-base mb-2">
              <FileText className="w-4.5 h-4.5" />
              Material de Lectura y Ejercicios
            </div>
            
            {/* Split lines to mock basic markdown elements */}
            {activeLesson?.content.split("\n").map((line, index) => {
              if (line.startsWith("###")) {
                return (
                  <h4 key={index} className="text-white font-bold text-base font-heading mt-6 mb-2">
                    {line.replace("###", "").trim()}
                  </h4>
                );
              }
              if (line.startsWith("*")) {
                return (
                  <li key={index} className="list-disc list-inside pl-4 text-slate-400 text-xs mt-1.5">
                    {line.replace("*", "").trim()}
                  </li>
                );
              }
              if (line.match(/^\d+\./)) {
                return (
                  <li key={index} className="list-decimal list-inside pl-4 text-slate-400 text-xs mt-1.5">
                    {line.replace(/^\d+\./, "").trim()}
                  </li>
                );
              }
              return (
                <p key={index} className="mt-2 text-slate-300">
                  {line.trim()}
                </p>
              );
            })}
          </article>
        </div>

        {/* Right Column: Syllabus Sidebar (1/3 width) */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="p-5 border border-white/5 bg-[#07041c]/45 rounded-2xl">
            <h3 className="font-heading font-bold text-sm text-slate-400">Progreso del Curso</h3>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-mono text-3xl font-extrabold text-white">{progressPercent}%</span>
              <span className="text-xs text-slate-500 font-medium">
                {completedCount} de {totalLessons} completados
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-3">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 to-teal-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Lessons List Checklist */}
          <div className="border border-white/5 bg-[#07041c]/45 rounded-2xl overflow-hidden">
            <div className="p-4 bg-white/5 border-b border-white/5">
              <h3 className="font-heading font-bold text-sm text-white">Contenido del Curso</h3>
            </div>
            
            <div className="divide-y divide-white/5">
              {course.lessons.map((lesson, idx) => {
                const isSelected = idx === activeLessonIndex;
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`p-4 flex items-start gap-3 cursor-pointer transition-all hover:bg-white/5 ${
                      isSelected ? "bg-violet-600/10 hover:bg-violet-600/15 border-l-2 border-violet-500" : ""
                    }`}
                  >
                    {/* Completion checkbox button */}
                    <button
                      onClick={(e) => toggleLessonComplete(lesson.id, e)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isCompleted
                          ? "bg-teal-500 border-teal-400 text-white"
                          : "border-slate-700 hover:border-slate-500 text-transparent"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="min-w-0">
                      <p className={`text-xs font-semibold leading-tight ${isSelected ? "text-violet-400" : "text-white"}`}>
                        {lesson.title}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer Toolbar */}
      <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
        <button
          onClick={prevLesson}
          disabled={activeLessonIndex === 0}
          className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/5 text-slate-300 disabled:text-slate-600 font-semibold text-xs transition-all flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Lección Anterior
        </button>

        <button
          onClick={nextLesson}
          disabled={activeLessonIndex + 1 === course.lessons.length}
          className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:hover:bg-violet-600 border border-violet-500/20 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-violet-500/10"
        >
          Siguiente Lección
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
