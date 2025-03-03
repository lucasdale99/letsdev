import React from "react";
import { LayoutDashboard, FileEdit, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/auth";

export default function Sidebar() {
  return (
    <div className="w-64 h-[calc(100vh-4rem)] bg-background border-r border-blue-500/20 hidden lg:block fixed left-0 top-16">
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
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all duration-300 ease-in-out w-full text-muted-foreground"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
