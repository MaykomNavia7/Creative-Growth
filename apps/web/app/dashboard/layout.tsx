"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Music, 
  Home, 
  BookOpen, 
  Activity, 
  Compass, 
  Settings, 
  User, 
  Bell,
  LogOut
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigationItems = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    { name: "Cursos", href: "/dashboard/courses", icon: BookOpen },
    { name: "Práctica", href: "/dashboard/practice", icon: Activity },
    { name: "Explorar", href: "/dashboard/explore", icon: Compass },
    { name: "Configuración", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-bg text-foreground font-sans">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-bg-subtle/65 backdrop-blur-xl sticky top-0 h-screen p-6">
        {/* Branding Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-glow-primary">
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground-muted bg-clip-text text-transparent">
            Creative Growth
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? "bg-primary-muted text-primary-light border border-primary/20 shadow-inner"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? "text-primary-light" : "text-foreground-muted group-hover:text-foreground"
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile */}
        <div className="border-t border-border pt-6 mt-auto">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-muted border border-primary/25 flex items-center justify-center text-primary-light font-bold font-heading">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none mb-1">Juan Doe</p>
              <p className="text-xs text-foreground-subtle">Estudiante</p>
            </div>
          </div>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-accent hover:text-accent-light hover:bg-accent-muted transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="border-b border-border bg-bg-subtle/40 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          {/* Mobile menu trigger button placeholder */}
          <div className="flex items-center gap-2 md:hidden">
            <Music className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-md text-white">Creative Growth</span>
          </div>

          <h2 className="hidden md:block font-heading font-semibold text-lg text-foreground-muted">
            {navigationItems.find(item => item.href === pathname)?.name || "Dashboard"}
          </h2>

          <div className="flex items-center gap-4">
            {/* Search, Notifications, Profile Buttons */}
            <button className="p-2 rounded-lg bg-surface text-foreground-muted hover:text-white border border-border transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <button className="p-2 rounded-lg bg-surface text-foreground-muted hover:text-white border border-border transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* View Content Port */}
        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
