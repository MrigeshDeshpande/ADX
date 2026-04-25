"use client";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useSidebar } from "@/components/providers/SidebarProvider";
import { Menu } from "lucide-react";

export function Header() {
  const { openMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Hamburger — mobile only */}
      <button
        onClick={openMobile}
        className="lg:hidden p-2 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      {/* Right-side controls */}
      <div className="flex items-center gap-3 ml-auto">
        <ThemeToggle />
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-bold text-foreground">Admin</span>
          <span className="text-xs text-muted-foreground">Full Access</span>
        </div>
      </div>
    </header>
  );
}
