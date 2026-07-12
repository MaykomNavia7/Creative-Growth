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
    <div className="flex min-h-screen bg-[#02000d] text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#030014]/65 backdrop-blur-xl sticky top-0 h-screen p-6">
        {/* Branding Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-teal-400 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
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
                    ? "bg-violet-600/10 text-violet-400 border border-violet-500/20 shadow-inner"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? "text-violet-400" : "text-slate-400 group-hover:text-slate-200"
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile */}
        <div className="border-t border-white/5 pt-6 mt-auto">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold font-heading">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none mb-1">Juan Doe</p>
              <p className="text-xs text-slate-500">Estudiante</p>
            </div>
          </div>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="border-b border-white/5 bg-[#030014]/40 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          {/* Mobile menu trigger button placeholder */}
          <div className="flex items-center gap-2 md:hidden">
            <Music className="w-6 h-6 text-violet-500" />
            <span className="font-heading font-bold text-md text-white">Creative Growth</span>
          </div>

          <h2 className="hidden md:block font-heading font-semibold text-lg text-slate-300">
            {navigationItems.find(item => item.href === pathname)?.name || "Dashboard"}
          </h2>

          <div className="flex items-center gap-4">
            {/* Search, Notifications, Profile Buttons */}
            <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-colors">
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
