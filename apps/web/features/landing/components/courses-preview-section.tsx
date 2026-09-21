"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart2, Play } from "lucide-react";
import { Container, Section, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@repo/ui";

export function CoursesPreviewSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Todos los Cursos" },
    { id: "piano", label: "Piano & Teclados" },
    { id: "theory", label: "Armonía & Teoría" },
    { id: "ear", label: "Entrenamiento Auditivo" },
  ];

  const courses = [
    {
      id: "piano-101",
      category: "piano",
      title: "Fundamentos de Piano & Postura",
      description: "Digitación fluida, acordes triadas fundamentales y control de dinámica en el teclado.",
      level: "Principiante",
      duration: "12 Lecciones",
      lessonsCount: 12,
      accent: "primary",
      tagColor: "border-primary/30 bg-primary-muted text-primary-light",
    },
    {
      id: "theory-101",
      category: "theory",
      title: "Armonía Funcional & Acordes 7ª",
      description: "Construcción de escalas armónicas, tensiones melódicas y progresiones jazz/pop.",
      level: "Intermedio",
      duration: "16 Lecciones",
      lessonsCount: 16,
      accent: "secondary",
      tagColor: "border-secondary/30 bg-secondary-muted text-secondary-light",
    },
    {
      id: "ear-101",
      category: "ear",
      title: "Dictado Rítmico & Intervalos",
      description: "Desarrolla oído absoluto para identificar saltos melódicos y patrones sincopados.",
      level: "Principiante",
      duration: "10 Lecciones",
      lessonsCount: 10,
      accent: "accent",
      tagColor: "border-accent/30 bg-accent-muted text-accent-light",
    },
    {
      id: "theory-201",
      category: "theory",
      title: "Reharmonización & Modulación",
      description: "Dominantes secundarios, sustitución tritonal y conducción de voces armónicas.",
      level: "Avanzado",
      duration: "20 Lecciones",
      lessonsCount: 20,
      accent: "primary",
      tagColor: "border-primary/30 bg-primary-muted text-primary-light",
    },
  ];

  const filteredCourses = activeCategory === "all"
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <Section id="courses" className="py-24 border-t border-border bg-bg relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-foreground-subtle text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-secondary-light" />
            <span>CATÁLOGO EDUCATIVO</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Rutas de Aprendizaje Modular
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg">
            Avanza a tu propio ritmo con lecciones interactivas integradas con tus herramientas de práctica.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-glow-primary font-semibold"
                  : "bg-surface text-foreground-muted hover:text-white hover:bg-surface-raised border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="h-full border border-border bg-surface hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                <CardHeader className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${course.tagColor}`}>
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-foreground-subtle">
                      <Clock className="w-3 h-3 text-foreground-subtle" />
                      {course.duration}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-heading font-bold text-white group-hover:text-primary-light transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-0">
                  <CardDescription className="text-xs text-foreground-muted leading-relaxed line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="p-5 pt-3 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-foreground-subtle font-mono">
                    <BarChart2 className="w-3.5 h-3.5 text-secondary-light" />
                    <span>{course.lessonsCount} Módulos</span>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1 text-xs hover:text-white">
                    <span>Vista previa</span>
                    <Play className="w-3 h-3 fill-current" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
