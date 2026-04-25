"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider, useSidebar } from "@/components/providers/SidebarProvider";

function LayoutContent({ children }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      {/* Main content — on mobile uses no padding (sidebar is a drawer overlay); on lg it shifts right */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AuthenticatedLayout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
