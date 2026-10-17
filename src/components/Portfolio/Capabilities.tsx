"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Code2,
  Brain,
  Database,
  Terminal,
  Server,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const Capabilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "programming":
        return <Code2 className="h-4 w-4" />;
      case "aiml":
        return <Brain className="h-4 w-4" />;
      case "libraries":
        return <Cpu className="h-4 w-4" />;
      case "web-backend":
        return <Server className="h-4 w-4" />;
      case "databases":
        return <Database className="h-4 w-4" />;
      case "tools":
        return <Terminal className="h-4 w-4" />;
      case "core-cs":
        return <Layers className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <section
      id="capabilities"
      className="relative z-20 bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-[#7657FF]/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5" />
            <span>06 / Technical Stack</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display">
            ENGINEERING <span className="text-gradient-ai">CAPABILITIES.</span>
          </h2>

          <p className="max-w-2xl text-base text-[#9CA8BD] font-light leading-relaxed">
            Organized across algorithms, neural architectures, backend services, and foundational computer science principles.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap gap-2.5 border-b border-white/10 pb-6 mb-10">
          {PORTFOLIO_DATA.capabilities.map((cat, idx) => {
            const isActive = activeTab === idx;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#00D9FF] text-[#03050B] font-bold shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                    : "border border-white/10 bg-[#080D18]/80 text-[#9CA8BD] hover:border-[#00D9FF]/40 hover:text-white"
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA8BD]">
            <span className="text-[#00D9FF] uppercase tracking-wider font-semibold">
              {PORTFOLIO_DATA.capabilities[activeTab].subtitle}
            </span>
            <span>
              {PORTFOLIO_DATA.capabilities[activeTab].skills.length} TECHNOLOGIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.capabilities[activeTab].skills.map((skill) => (
              <div
                key={skill.name}
                className="group rounded-2xl border border-white/10 bg-[#080D18]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#00D9FF]/50 hover:bg-[#0B1220] hover:shadow-[0_10px_30px_-5px_rgba(0,217,255,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="h-2 w-2 rounded-full bg-[#00D9FF] group-hover:scale-125 transition-transform" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#9CA8BD] rounded bg-white/5 px-2 py-0.5">
                      {skill.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {skill.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#9CA8BD]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00D9FF]" />
                  <span>Verified Competency</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
