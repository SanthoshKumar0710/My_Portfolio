"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const Philosophy: React.FC = () => {
  return (
    <section className="relative z-20 bg-[#03050B] border-y border-white/10 px-6 py-24 sm:px-12 md:px-20 lg:px-28 overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[500px] -translate-y-1/2 rounded-full bg-[#7657FF]/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Large Editorial Ethos */}
        <div className="mb-20 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF]">
            <span>ENGINEERING PHILOSOPHY</span>
          </div>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase font-display">
            “CURIOSITY TO CODE. DATA TO INTELLIGENCE.”
          </h3>
          <p className="text-base sm:text-xl text-[#9CA8BD] font-light leading-relaxed">
            Bridging theoretical artificial intelligence models with production engineering. Analyzing high-dimensional data, designing resilient architectures, and building practical systems that solve real-world problems.
          </p>
        </div>

        {/* Highlight Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="space-y-1.5"
            >
              <div className="text-3xl sm:text-5xl font-black font-display text-gradient-ai">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white">{stat.label}</div>
              <div className="text-xs font-mono text-[#9CA8BD]">{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
