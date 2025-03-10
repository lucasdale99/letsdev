"use client";

import React, { useState, createContext, useContext } from "react";
import { LayoutDashboard, FileEdit, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/auth";

// Create a context to share the sidebar state
export const SidebarContext = createContext({ isOpen: false });

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen }}>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        lg:w-64 w-[280px] h-[calc(100vh-4rem)] bg-background border-r border-blue-500/20 
        fixed left-0 top-16 z-50 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:block
      `}
      >
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">LetUsDev</h1>
            <p className="text-muted-foreground text-sm">Dashboard</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 p-3 rounded-lg  transition-all duration-300 ease-in-out"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/posts"
              className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ease-in-out"
            >
              <FileEdit className="w-5 h-5" />
              <span>Posts</span>
            </Link>
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              type="button"
              onClick={() => signOut({ redirect: true, redirectTo: "/" })}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all duration-300 ease-in-out w-full text-muted-foreground"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>{" "}
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-[4.5rem] z-40 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 lg:hidden"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </button>
    </SidebarContext.Provider>
  );
}

// Export a hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);
