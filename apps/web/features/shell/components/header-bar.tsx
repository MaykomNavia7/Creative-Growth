"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, User, Search } from "lucide-react";
import { Tooltip } from "@repo/ui";
import { navigationItems } from "./sidebar-nav";

interface HeaderBarProps {
  onOpenMobileMenu: () => void;
}

export function HeaderBar({ onOpenMobileMenu }: HeaderBarProps) {
  const pathname = usePathname();

  // Find active route title
  const currentNav = navigationItems.find(
    (item) => item.href === pathname || (item.href !== "/dashboard" && pathname.startsWith(item.href))
  );

  const title = currentNav ? currentNav.name : "Dashboard";

  return (
    <header className="border-b border-border bg-bg-subtle/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg bg-surface text-foreground-muted hover:text-white border border-border transition-colors"
          aria-label="Abrir Menú de Navegación"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="font-heading font-bold text-lg md:text-xl text-white">
            {title}
          </h1>
          <span className="hidden sm:inline-block text-xs font-mono text-foreground-subtle px-2 py-0.5 rounded bg-surface border border-border">
            PLATFORM SHELL
          </span>
        </div>
      </div>

      {/* Right: Search, Notifications & User Avatar Quick Options */}
      <div className="flex items-center gap-3">
        {/* Quick Search trigger button */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs text-foreground-subtle cursor-pointer hover:border-border/80 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>Buscar herramienta o curso...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-raised border border-border text-[10px] font-mono">⌘K</kbd>
        </div>

        {/* Notifications */}
        <Tooltip content="Notificaciones de práctica">
          <button className="p-2 rounded-xl bg-surface text-foreground-muted hover:text-white border border-border transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </button>
        </Tooltip>

        {/* User Profile */}
        <Tooltip content="Perfil del Estudiante">
          <button className="p-2 rounded-xl bg-surface text-foreground-muted hover:text-white border border-border transition-colors">
            <User className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>
    </header>
  );
}
