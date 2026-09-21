"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Music, 
  Home, 
  BookOpen, 
  Activity, 
  TrendingUp, 
  Compass, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Avatar } from "@repo/ui";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navigationItems: NavItem[] = [
  { name: "Inicio", href: "/dashboard", icon: Home },
  { name: "Cursos", href: "/dashboard/courses", icon: BookOpen },
  { name: "Práctica", href: "/dashboard/practice", icon: Activity },
  { name: "Progreso", href: "/dashboard/progress", icon: TrendingUp },
  { name: "Explorar", href: "/dashboard/explore", icon: Compass },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-bg-subtle/80 backdrop-blur-xl sticky top-0 h-screen p-6 shrink-0 z-30">
      {/* Branding Logo */}
      <Link href="/" className="flex items-center gap-3 mb-10 group">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform">
          <Music className="w-4 h-4 text-white" />
        </div>
        <span className="font-heading font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground-muted bg-clip-text text-transparent">
          Creative Growth
        </span>
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? "bg-primary-muted text-primary-light border border-primary/20 shadow-inner"
                  : "text-foreground-muted hover:text-foreground hover:bg-surface border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                isActive ? "text-primary-light" : "text-foreground-muted group-hover:text-foreground"
              }`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Tile at bottom */}
      <div className="border-t border-border pt-5 mt-auto space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Avatar name="Juan Doe" className="w-9 h-9 border border-primary/30 bg-primary-muted text-primary-light font-bold" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">Juan Doe</p>
            <p className="text-[11px] text-foreground-subtle truncate">Estudiante Activo</p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium text-accent hover:text-accent-light hover:bg-accent-muted/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
