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
            className="group rounded-3xl border border-border bg-surface/45 p-6 hover:border-primary/20 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary-light">
                  {course.category}
                </span>
                <span className="text-xs text-foreground-subtle font-medium flex items-center gap-1">
                  <BarChart className="w-3.5 h-3.5" />
                  {course.level}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading font-bold text-xl text-foreground mt-4 group-hover:text-primary-light transition-colors">
                {course.title}
              </h3>
              <p className="text-foreground-muted text-xs leading-relaxed mt-2">
                {course.description}
              </p>
            </div>

            {/* Course Meta Info */}
            <div className="mt-8 pt-6 border-t border-border space-y-4">
              <div className="flex items-center justify-between text-xs text-foreground-subtle">
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
                  <span className="text-foreground-subtle">Progreso</span>
                  <span className="text-primary-light font-mono">{course.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-raised rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Start/Resume Button */}
              <Link 
                href={`/dashboard/courses/${course.id}`}
                className="w-full py-3 bg-surface-raised group-hover:bg-primary border border-border group-hover:border-primary-light/30 rounded-xl text-xs font-bold text-foreground-muted group-hover:text-foreground flex items-center justify-center gap-2 transition-all"
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
