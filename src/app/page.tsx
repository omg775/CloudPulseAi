"use client";

import Hero from "@/components/landing/Hero";
import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, Cpu, Sparkles, Bell } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="text-black" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tighter">CloudPulse <span className="text-primary">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:text-white transition-colors">Login</button>
          <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-white/90 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

function Features() {
  const features = [
    {
      title: "Real-time Monitoring",
      description: "Track your AWS spend down to the second with millisecond precision.",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      title: "AI Optimization",
      description: "Our LLM-powered engine finds savings you never knew existed.",
      icon: Sparkles,
      color: "text-primary"
    },
    {
      title: "Automated Alerts",
      description: "Get notified before budget overruns happen, not after.",
      icon: Bell,
      color: "text-purple-400"
    },
    {
      title: "Resource Analysis",
      description: "Deep dive into EC2, S3, and RDS usage with granular metrics.",
      icon: BarChart3,
      color: "text-blue-400"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Engineered for Startups</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Built by founders, for founders. Everything you need to keep your burn low and your speed high.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl glass border border-white/5 flex flex-col gap-4"
          >
            <div className={f.color}>
              <f.icon size={32} />
            </div>
            <h3 className="text-xl font-bold">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">Free for early-stage startups. Scalable for the giants.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="p-8 rounded-3xl glass border border-white/5 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-bold mb-6">$0<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-grow text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Up to $2k AWS Spend</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Basic Cost Reports</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> 1 AI Recommendation/wk</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">Start for Free</button>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 px-2 py-1 bg-primary text-black text-[10px] font-bold rounded">POPULAR</div>
            <h3 className="text-xl font-bold mb-2">Growth</h3>
            <div className="text-4xl font-bold mb-6">$49<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-grow text-sm">
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Up to $20k AWS Spend</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Real-time Monitoring</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Unlimited AI Insights</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Multi-account Support</li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:opacity-90 transition-opacity">Go Pro</button>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-3xl glass border border-white/5 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-6">Custom</div>
            <ul className="space-y-4 mb-8 flex-grow text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Unlimited AWS Spend</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Custom AI Training</li>
              <li className="flex items-center gap-2"><Shield size={16} className="text-primary" /> Dedicated Support</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Sparkles className="text-black" size={16} />
          </div>
          <span className="font-bold">CloudPulse AI</span>
        </div>
        <div className="text-sm text-muted-foreground">
          © 2026 CloudPulse AI. All rights reserved. Built with ❤️ for the cloud.
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
