// AdminLayout.tsx
"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const sidebarWidth = isMobileOpen
    ? "w-0"
    : isExpanded || isHovered
    ? "w-[290px]"
    : "w-[90px]";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar: não permite encolher */}
      <div className={`transition-all duration-300 ease-in-out absolute lg:static ${sidebarWidth} flex-shrink-0`}>
        <AppSidebar />
      </div>

      <Backdrop />

      {/* Main: importante ter min-w-0 para permitir que os filhos encolham */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <AppHeader />
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
