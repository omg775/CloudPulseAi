"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cloud, Zap, Shield, TrendingDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-6 animate-bounce">
          <Zap size={14} />
          <span>New: AI-Powered RI Optimization</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Reduce AWS Costs <br /> 
          <span className="text-primary text-glow">by 40% with AI.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          The modern AWS cost optimization dashboard for startups. 
          Stop guessing, start saving. Real-time monitoring, AI-driven insights, 
          and automated waste reduction.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard" className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link href="#features" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all">
            View Live Demo
          </Link>
        </div>
      </motion.div>

      {/* Floating Elements / Decorative */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-1/4 left-10 p-6 glass rounded-2xl"
      >
        <TrendingDown className="text-primary mb-2" size={32} />
        <div className="text-sm font-medium text-white/50">Monthly Savings</div>
        <div className="text-2xl font-bold text-primary">+$1,240.00</div>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute bottom-1/4 right-10 p-6 glass rounded-2xl"
      >
        <Cloud className="text-accent mb-2" size={32} />
        <div className="text-sm font-medium text-white/50">Cloud Health</div>
        <div className="text-2xl font-bold text-accent">98.4%</div>
      </motion.div>
    </div>
  );
}
