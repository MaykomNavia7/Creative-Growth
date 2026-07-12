import Link from "next/link";
import { getCourses } from "../../../services/courseService";
import { BookOpen, Clock, BarChart, Play } from "lucide-react";

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-heading font-extrabold text-3xl text-white">Catálogo de Cursos</h1>
        <p className="text-slate-400 text-sm mt-1">Explora nuestras lecciones interactivas diseñadas por educadores musicales certificados.</p>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="group rounded-3xl border border-white/5 bg-[#07041c]/45 p-6 hover:border-violet-500/20 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs font-semibold text-violet-300">
                  {course.category}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <BarChart className="w-3.5 h-3.5" />
                  {course.level}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading font-bold text-xl text-white mt-4 group-hover:text-violet-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mt-2">
                {course.description}
              </p>
            </div>

            {/* Course Meta Info */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {course.lessonsCount} lecciones
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Progreso</span>
                  <span className="text-violet-400 font-mono">{course.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-600 to-teal-400"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Start/Resume Button */}
              <Link 
                href={`/dashboard/courses/${course.id}`}
                className="w-full py-3 bg-white/5 group-hover:bg-violet-600 border border-white/5 group-hover:border-violet-500/30 rounded-xl text-xs font-bold text-slate-300 group-hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                Continuar Curso
                <Play className="w-3.5 h-3.5 fill-current" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
