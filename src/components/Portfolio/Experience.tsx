"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight, Calendar, Compass } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative z-20 bg-[#03050B] px-6 py-24 sm:px-12 md:px-20 lg:px-28 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <Compass className="h-3.5 w-3.5" />
            <span>Academic Milestones</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display">
            JOURNEY & <span className="text-gradient-ai">EXPERIENCE.</span>
          </h2>
          <p className="max-w-xl text-base text-[#9CA8BD] font-light leading-relaxed">
            Academic training, research prototypes, and applied engineering systems.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-[#080D18]/80 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#00D9FF]/40 hover:bg-[#0B1220] flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="md:w-1/4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 px-3 py-1 text-xs font-mono text-[#00D9FF]">
                  <Calendar className="h-3 w-3" />
                  {exp.period}
                </span>
                <div className="mt-2 text-xs font-mono text-[#9CA8BD]">{exp.studio}</div>
              </div>

              <div className="md:w-3/4 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-between">
                  <span>{exp.role}</span>
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
