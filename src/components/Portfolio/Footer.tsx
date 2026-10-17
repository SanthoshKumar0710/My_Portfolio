"use client";

import React from "react";
import { ArrowUp, Cpu } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#03050B] px-6 py-12 sm:px-12 md:px-20 lg:px-28">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#9CA8BD]">
        <div className="flex items-center gap-3">
          <Cpu className="h-4 w-4 text-[#00D9FF]" />
          <span className="text-white font-semibold">{PORTFOLIO_DATA.hero.name}</span>
          <span>© {new Date().getFullYear()} • AI/ML Engineer Portfolio</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[#9CA8BD]">INTELLIGENT SYSTEMS & MACHINE LEARNING</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#00D9FF] transition-colors"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
