"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Music, X, LogOut } from "lucide-react";
import { Avatar } from "@repo/ui";
import { navigationItems } from "./sidebar-nav";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg/80 backdrop-blur-md z-50 md:hidden"
          />

          {/* Slide-over Drawer Panel */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-bg-subtle border-r border-border p-6 flex flex-col z-50 md:hidden shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading font-bold text-base text-white">Creative Growth</span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-surface text-foreground-muted hover:text-white border border-border"
                aria-label="Cerrar Menú"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary-muted text-primary-light border border-primary/20"
                        : "text-foreground-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary-light" : "text-foreground-muted"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Profile Footer */}
            <div className="border-t border-border pt-6 mt-auto space-y-4">
              <div className="flex items-center gap-3 px-2">
                <Avatar name="Juan Doe" className="w-9 h-9 border border-primary/30 bg-primary-muted text-primary-light font-bold" />
                <div>
                  <p className="text-xs font-semibold text-white">Juan Doe</p>
                  <p className="text-[11px] text-foreground-subtle">Estudiante</p>
                </div>
              </div>
              <button 
                type="button"
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-xs font-medium text-accent hover:bg-accent-muted/40 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
