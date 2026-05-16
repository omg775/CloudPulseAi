"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { Search, Bell, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Search feature: We're indexing your cloud resources. This will be available shortly!");
  };

  const handleNotifications = () => {
    alert("Notifications: You have 3 new AI-driven cost optimization alerts.");
  };

  const handleProfile = () => {
    alert("Profile Settings: Accessing account details for Alex Rivera...");
  };
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col">
        {/* Dashboard Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-30">
          <form onSubmit={handleSearch} className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search resources, costs, or AI help..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </div>
          </form>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={handleNotifications}
                className="p-2.5 hover:bg-white/5 rounded-xl transition-colors relative active:scale-90"
              >
                <Bell size={20} className="text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
              </button>
            </div>
            
            <div className="h-8 w-px bg-white/5 mx-2" />

            <button 
              onClick={handleProfile}
              className="flex items-center gap-3 pl-2 group hover:bg-white/5 p-1 rounded-xl transition-all active:scale-95"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold group-hover:text-primary transition-colors">Alex Rivera</div>
                <div className="text-[10px] text-primary uppercase font-bold tracking-widest">Scale Tier</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center font-bold text-black border-2 border-white/10 group-hover:scale-105 transition-transform">
                AR
              </div>
            </button>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
