"use client";

import { useState } from "react";
import {
  FileText,
  Terminal,
  Search,
  Layers,
  Sparkles,
  FolderGit2,
  CheckCircle,
  Copy,
  ExternalLink,
  BookMarked,
  Music,
  ArrowRight
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  Tooltip,
  Code,
  Stack,
  Grid
} from "@repo/ui";

interface DocItem {
  title: string;
  filename: string;
  path: string;
  description: string;
  category: "core" | "guides" | "systems" | "sprints";
  tags: string[];
}

const DOCS_DATA: DocItem[] = [
  {
    title: "Project Architecture",
    filename: "PROJECT_ARCHITECTURE.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/PROJECT_ARCHITECTURE.md",
    description: "Source of truth for directories, architectural patterns, design system variables, and code rules.",
    category: "core",
    tags: ["Core", "Architecture", "Guidelines"]
  },
  {
    title: "Project Vision",
    filename: "PROJECT_VISION.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/PROJECT_VISION.md",
    description: "Vision, target audience, key components, and design philosophy of the music education platform.",
    category: "core",
    tags: ["Core", "Vision", "Product"]
  },
  {
    title: "Development Roadmap",
    filename: "ROADMAP.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/ROADMAP.md",
    description: "Multiphase breakdown of the engineering roadmap from foundation to production.",
    category: "core",
    tags: ["Core", "Planning", "Roadmap"]
  },
  {
    title: "UI & Styling Guidelines",
    filename: "UI_GUIDELINES.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/UI_GUIDELINES.md",
    description: "Design system tokens, typography rules, interactive micro-animations, and light/dark theme specifications.",
    category: "guides",
    tags: ["UI", "Tailwind", "CSS"]
  },
  {
    title: "API Specification",
    filename: "API.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/API.md",
    description: "Data flows, API rules, hooks, and services conventions for backend/frontend communication.",
    category: "guides",
    tags: ["API", "Data", "Hooks"]
  },
  {
    title: "Database Design",
    filename: "DATABASE.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/DATABASE.md",
    description: "Schema structure, database design rules, relations, and entity relationships.",
    category: "guides",
    tags: ["Database", "Prisma", "SQL"]
  },
  {
    title: "Audio Engine Architecture",
    filename: "AUDIO_ENGINE.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/AUDIO_ENGINE.md",
    description: "Structure of the interactive sound synthesizer, MIDI controller binding, and browser audio layers.",
    category: "systems",
    tags: ["Audio", "MIDI", "Tone.js"]
  },
  {
    title: "Feature Architecture Maps",
    filename: "FEATURES.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/FEATURES.md",
    description: "Mapping of specific feature scopes (landing, dashboard, practice, theory) and folder allocations.",
    category: "systems",
    tags: ["Features", "Structure"]
  },
  {
    title: "Phase 1 Foundation Plan",
    filename: "PHASE_1_IMPLEMENTATION.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/PHASE_1_IMPLEMENTATION.md",
    description: "Execution checklist and engineering setup plan for styling, providers, config, and eslint rules.",
    category: "sprints",
    tags: ["Sprint 1", "Implementation"]
  },
  {
    title: "Sprint 01 Planning",
    filename: "SPRINT_01.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/sprints/SPRINT_01.md",
    description: "Objectives, deliverables, and acceptance criteria for building the workspace foundation.",
    category: "sprints",
    tags: ["Sprint 1", "Planning"]
  },
  {
    title: "Sprint 02 Planning",
    filename: "SPRINT_02.md",
    path: "d:/Proyectos_Programacion/Creative-Growth/docs/sprints/SPRINT_02.md",
    description: "Upcoming tasks for practice room dashboard design, visual feedback, and core app landing.",
    category: "sprints",
    tags: ["Sprint 2", "Planning"]
  }
];

const TERMINAL_COMMANDS = [
  { label: "Run all apps in dev", cmd: "pnpm dev" },
  { label: "Build all workspace projects", cmd: "pnpm build" },
  { label: "Check type safety", cmd: "pnpm check-types" },
  { label: "Run linter and formatter checks", cmd: "pnpm lint" }
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "core" | "guides" | "systems" | "sprints">("all");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredDocs = DOCS_DATA.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = activeTab === "all" || doc.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-bg text-foreground font-sans selection:bg-primary-muted selection:text-primary-light">
      {/* Visual background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="border-b border-border bg-bg/85 backdrop-blur-glass sticky top-0 z-50 transition-all duration-normal">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary-light flex items-center justify-center shadow-glow-primary">
              <Music className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground-muted bg-clip-text text-transparent">
              Creative Growth
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary-muted text-primary-light border border-primary/20">
              Docs Hub
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground flex items-center gap-1 transition-colors group"
            >
              Aplicación Principal
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary-muted text-primary-light text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Sprint 1: Base & Arquitectura del Proyecto
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight leading-tight mb-6 bg-gradient-to-b from-foreground via-foreground to-foreground-muted bg-clip-text text-transparent">
            Centro de Documentación
          </h1>
          <p className="text-foreground-muted text-base md:text-lg leading-relaxed">
            Explora los principios técnicos, guías de estilo, especificaciones de la base de datos y detalles del motor de audio que sustentan la plataforma de aprendizaje musical Creative Growth.
          </p>
        </section>

        {/* Workspace Rules Quick Peek */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-border bg-bg-subtle/40 backdrop-blur-glass flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary-muted border border-primary/20 flex items-center justify-center text-primary-light mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Arquitectura de Features</h3>
              <p className="text-foreground-muted text-xs leading-relaxed">
                Organizamos el código en torno a módulos funcionales aislados en vez de páginas. Toda la lógica de negocio pertenece a las subcarpetas del feature correspondiente.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-[10px] text-foreground-subtle font-mono">
              features/ [landing | practice | theory | auth]
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-subtle/40 backdrop-blur-glass flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-secondary-muted border border-secondary/20 flex items-center justify-center text-secondary-light mb-4">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Estructura Monorepo</h3>
              <p className="text-foreground-muted text-xs leading-relaxed">
                Utilizamos Turborepo y pnpm para optimizar la compilación y reutilizar paquetes de forma estricta. Las utilidades compartidas van en paquetes dedicados en /packages.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-[10px] text-foreground-subtle font-mono">
              packages/ [ui | tailwind-config | eslint-config]
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-bg-subtle/40 backdrop-blur-glass flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-accent-muted border border-accent/20 flex items-center justify-center text-accent-light mb-4">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Reglas de Oro</h3>
              <p className="text-foreground-muted text-xs leading-relaxed">
                No se permite código javascript duplicado ni colores hardcodeados. Utiliza estrictamente los tokens del sistema cargados en las variables CSS v4 globales.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-[10px] text-foreground-subtle font-mono">
              Consultar PROJECT_ARCHITECTURE.md
            </div>
          </div>
        </section>

        {/* Search & Tabs Filtering */}
        <section className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/50 pb-6">
          {/* Tabs */}
          <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
            {(["all", "core", "guides", "systems", "sprints"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-primary text-foreground shadow-glow-primary"
                    : "bg-surface hover:bg-surface-raised text-foreground-muted hover:text-foreground"
                }`}
              >
                {tab === "all" ? "Todos" : tab === "core" ? "Core" : tab === "guides" ? "Guías" : tab === "systems" ? "Sistemas" : "Sprints"}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-foreground-subtle" />
            </span>
            <input
              type="text"
              placeholder="Buscar documento o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-bg-subtle text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </section>

        {/* Grid of Docs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border bg-bg-subtle/20 p-6 flex flex-col justify-between hover:border-primary/30 transition-all hover:bg-bg-subtle/40 shadow-sm hover:shadow-glow-primary/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                      doc.category === "core"
                        ? "bg-primary-muted text-primary-light border border-primary/20"
                        : doc.category === "guides"
                        ? "bg-secondary-muted text-secondary-light border border-secondary/20"
                        : doc.category === "systems"
                        ? "bg-accent-muted text-accent-light border border-accent/20"
                        : "bg-surface-raised text-foreground-muted border border-border"
                    }`}>
                      {doc.category}
                    </span>
                    <FileText className="w-4 h-4 text-foreground-subtle group-hover:text-primary-light transition-colors" />
                  </div>

                  <h4 className="font-heading font-bold text-base mb-2 group-hover:text-foreground transition-colors">
                    {doc.title}
                  </h4>
                  
                  <p className="text-foreground-muted text-xs leading-relaxed mb-4 min-h-[40px]">
                    {doc.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {doc.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-foreground-subtle">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`file:///${doc.path}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-border hover:border-primary/40 bg-surface/50 hover:bg-primary-muted/20 text-xs font-semibold text-foreground-muted hover:text-primary-light rounded-xl transition-all"
                  >
                    Abrir Archivo Local
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-foreground-muted text-sm border border-dashed border-border rounded-2xl">
              No se encontraron documentos que coincidan con la búsqueda.
            </div>
          )}
        </section>

        {/* Development Terminal Console */}
        <section className="border border-border bg-bg-subtle/50 rounded-2xl p-6 backdrop-blur-glass">
          <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary-light" />
              <h3 className="font-heading font-bold text-lg">Comandos de Desarrollo</h3>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500/80" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {TERMINAL_COMMANDS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border bg-bg flex items-center justify-between group hover:border-primary/20 transition-all"
              >
                <div>
                  <span className="text-[10px] text-foreground-subtle block mb-1">
                    {item.label}
                  </span>
                  <Code className="text-secondary-light font-bold">
                    {item.cmd}
                  </Code>
                </div>
                <button
                  onClick={() => copyToClipboard(item.cmd, idx)}
                  className="p-2 rounded-lg bg-surface hover:bg-surface-raised text-foreground-subtle hover:text-foreground cursor-pointer transition-colors"
                  title="Copiar comando"
                >
                  {copiedIndex === idx ? (
                    <CheckCircle className="w-3.5 h-3.5 text-secondary-light" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Shared UI Component Showcase (@repo/ui) */}
        <section className="mt-16 border border-border bg-bg-subtle/40 rounded-2xl p-6 backdrop-blur-glass space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div>
              <h3 className="font-heading font-extrabold text-xl">Biblioteca de Componentes UI (@repo/ui)</h3>
              <p className="text-foreground-muted text-xs mt-1">Demostración en vivo de los componentes primitivos de Sprint 1.6.</p>
            </div>
            <Badge variant="primary">Sprint 1.6</Badge>
          </div>

          <Grid cols={3} gap="md">
            {/* Card 1: Buttons */}
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Botones & Variantes</CardTitle>
                <CardDescription>Botones interactivos con tokens de diseño.</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack direction="col" spacing="sm">
                  <Stack direction="row" spacing="xs">
                    <Button variant="primary" size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                  </Stack>
                  <Stack direction="row" spacing="xs">
                    <Button variant="ghost" size="sm">Ghost</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Card 2: Badges & Avatars */}
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Badges & Avatares</CardTitle>
                <CardDescription>Badges semánticas e indicadores de estado.</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack direction="col" spacing="sm">
                  <Stack direction="row" spacing="xs" align="center">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                  </Stack>
                  <Stack direction="row" spacing="sm" align="center">
                    <Avatar name="Alejandro Silva" size="sm" status="online" />
                    <Avatar name="María Ortega" size="sm" status="busy" />
                    <Avatar name="Estudiante Demo" size="sm" status="away" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Card 3: Tooltips & Layout */}
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Tooltips & Code</CardTitle>
                <CardDescription>Tooltips accesibles y snippets inline.</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack direction="col" spacing="sm">
                  <Stack direction="row" spacing="xs" align="center">
                    <Tooltip content="Tooltip flotante arriba" position="top">
                      <Button variant="outline" size="sm">Hover Tooltip</Button>
                    </Tooltip>
                  </Stack>
                  <p className="text-xs text-foreground-muted">
                    Uso de componente: <Code>import {"{ Button }"} from &quot;@repo/ui&quot;;</Code>
                  </p>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-foreground-subtle text-xs mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Creative Growth. Plataforma Técnica.</p>
          <div className="flex gap-6">
            <a href="http://localhost:3000" className="hover:text-foreground-muted transition-colors">Web App</a>
            <a href="https://turborepo.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground-muted transition-colors">Turborepo Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
