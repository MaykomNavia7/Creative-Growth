"use client";

import Link from "next/link";
import { Music, Heart } from "lucide-react";
import { Container } from "@repo/ui";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-bg-subtle py-16 text-foreground-subtle text-xs">
      <Container className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-glow-primary">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-white">
                Creative Growth
              </span>
            </Link>
            <p className="text-foreground-muted leading-relaxed">
              Plataforma premium de educación musical y herramientas de práctica sensorial en tiempo real.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm">Plataforma</h4>
            <ul className="space-y-2 text-foreground-muted">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard Shell</Link></li>
              <li><Link href="/dashboard/courses" className="hover:text-white transition-colors">Cursos & Rutas</Link></li>
              <li><Link href="/dashboard/practice" className="hover:text-white transition-colors">Suite de Práctica</Link></li>
              <li><Link href="/dashboard/progress" className="hover:text-white transition-colors">Progreso Estudiantil</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm">Herramientas</h4>
            <ul className="space-y-2 text-foreground-muted">
              <li><a href="#practice-tools" className="hover:text-white transition-colors">Metrónomo Háptico</a></li>
              <li><a href="#practice-tools" className="hover:text-white transition-colors">Teclado MIDI en Vivo</a></li>
              <li><a href="#practice-tools" className="hover:text-white transition-colors">Visualizador de Partituras</a></li>
              <li><a href="#practice-tools" className="hover:text-white transition-colors">Entrenador Auditivo</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm">Recursos & Legal</h4>
            <ul className="space-y-2 text-foreground-muted">
              <li><a href="/docs" className="hover:text-white transition-colors">Documentación de Arquitectura</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos del Servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto & Soporte</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-foreground-subtle">
          <p>© {new Date().getFullYear()} Creative Growth. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Construido con <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> para músicos
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
