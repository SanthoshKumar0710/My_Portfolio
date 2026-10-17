"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitCommit, Sparkles, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const EngineeringProcess: React.FC = () => {
  return (
    <section
      id="process"
      className="relative z-20 bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[450px] w-[600px] rounded-full bg-[#00D9FF]/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <GitCommit className="h-3.5 w-3.5" />
            <span>07 / Methodology</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display">
            HOW I BUILD <span className="text-gradient-ai">INTELLIGENT SYSTEMS.</span>
          </h2>

          <p className="max-w-2xl text-base text-[#9CA8BD] font-light leading-relaxed">
            My engineering lifecycle from mathematical problem formulation to robust algorithmic modeling, empirical evaluation, and production service integration.
          </p>
        </div>

        {/* Desktop Horizontal Timeline & Mobile Vertical Timeline */}
        <div className="relative">
          {/* Subtle connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#00D9FF]/30 via-[#7657FF]/30 to-[#A855F7]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {PORTFOLIO_DATA.process.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl border border-white/10 bg-[#080D18]/90 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#00D9FF]/50 hover:bg-[#0B1220] hover:shadow-[0_10px_30px_-5px_rgba(0,217,255,0.2)] flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
                      STAGE {stage.step}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#00D9FF] group-hover:animate-ping" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00D9FF] transition-colors uppercase tracking-tight">
                    {stage.title}
                  </h3>

                  <p className="mt-3 text-xs text-neutral-300 font-light leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5">
                  <p className="text-[11px] font-mono text-[#9CA8BD] leading-tight">
                    {stage.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
