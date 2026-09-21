"use client";

import React, { useState } from "react";
import { SidebarNav } from "../../features/shell/components/sidebar-nav";
import { HeaderBar } from "../../features/shell/components/header-bar";
import { MobileDrawer } from "../../features/shell/components/mobile-drawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg text-foreground font-sans selection:bg-primary-muted selection:text-primary-light">
      {/* Desktop Sidebar Navigation */}
      <SidebarNav />

      {/* Mobile Overlay Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Header Bar */}
        <HeaderBar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Viewport Content Area */}
        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
