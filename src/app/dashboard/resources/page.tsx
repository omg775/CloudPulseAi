"use client";

import { motion } from "framer-motion";

export default function MockPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-[3rem] border border-white/5 text-center max-w-lg"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight uppercase">Coming Soon</h1>
        <p className="text-muted-foreground leading-relaxed">
          We are currently engineering this module to provide you with the most advanced AI-driven cloud insights. Check back soon!
        </p>
      </motion.div>
    </div>
  );
}
