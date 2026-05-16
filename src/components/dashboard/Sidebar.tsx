"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart3, 
  Cpu, 
  Bell, 
  Settings, 
  LogOut, 
  Sparkles,
  Zap,
  HelpCircle,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Cost Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { name: "Resources", icon: Cpu, href: "/dashboard/resources" },
  { name: "Alerts", icon: Bell, href: "/dashboard/alerts" },
  { name: "AI Advisor", icon: Sparkles, href: "/dashboard/ai" },
  { name: "Billing", icon: CreditCard, href: "/dashboard/billing" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-white/5 bg-[#050505] flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <Sparkles className="text-black" size={18} />
        </div>
        <span className="font-bold text-lg tracking-tight">CloudPulse <span className="text-primary text-[10px] ml-1 px-1 bg-primary/10 rounded">AI</span></span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-primary/10 text-primary font-semibold" 
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-white"
            )} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/5">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Zap size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Pro Plan</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
            Unlock advanced AI insights and multi-account support.
          </p>
          <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>

        <div className="space-y-1">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-white/5 hover:text-white rounded-xl transition-all">
            <Settings size={20} />
            <span className="text-sm">Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
