import React from "react";
import Sidebar from "./components/Sidebar";
import Stats from "./components/Stats";

export default async function Page() {
  return (
    <div className="bg-background">
      <Sidebar />
      <main className="ml-0 lg:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your blog posts and review analytics
              </p>
            </div>
          </div>
          <Stats />
        </div>
      </main>
    </div>
  );
}
