"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Copy, ArrowUpRight, GitBranch, Linkedin, MapPin, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative z-20 bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10 overflow-hidden"
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#00D9FF]/10 blur-[160px]" />
      <div className="pointer-events-none absolute top-10 right-10 h-[350px] w-[350px] rounded-full bg-[#7657FF]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-5xl text-center space-y-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>10 / Get in Touch</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase font-display leading-[1.05]">
            LET’S BUILD <br />
            <span className="text-gradient-ai">SOMETHING INTELLIGENT.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#9CA8BD] font-light leading-relaxed">
            {PORTFOLIO_DATA.contact.subheading}
          </p>
        </div>

        {/* Location and Identity Badge */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#9CA8BD]">
          <span className="text-white font-semibold">{PORTFOLIO_DATA.contact.name}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#00D9FF]" />
            {PORTFOLIO_DATA.contact.location}
          </span>
          <span>•</span>
          <span>Tel: +91 {PORTFOLIO_DATA.contact.phone}</span>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Email button */}
          <a
            href={`mailto:${PORTFOLIO_DATA.contact.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#00D9FF] via-[#7657FF] to-[#A855F7] px-8 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(0,217,255,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            <span>EMAIL ME</span>
          </a>

          {/* GitHub button */}
          <a
            href={PORTFOLIO_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-[#080D18]/90 px-8 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 hover:shadow-[0_0_25px_rgba(0,217,255,0.2)] hover:scale-105 active:scale-95"
          >
            <GitBranch className="h-4 w-4 text-[#00D9FF]" />
            <span>VIEW GITHUB</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA8BD]" />
          </a>

          {/* LinkedIn button */}
          <a
            href={PORTFOLIO_DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-[#080D18]/90 px-8 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-[#7657FF] hover:bg-[#7657FF]/10 hover:shadow-[0_0_25px_rgba(118,87,255,0.2)] hover:scale-105 active:scale-95"
          >
            <Linkedin className="h-4 w-4 text-[#7657FF]" />
            <span>CONNECT ON LINKEDIN</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA8BD]" />
          </a>
        </div>

        {/* Copyable Email Pill */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#080D18] px-5 py-2 font-mono text-xs text-[#9CA8BD] hover:text-white hover:border-[#00D9FF]/40 transition-colors"
          >
            <Mail className="h-3.5 w-3.5 text-[#00D9FF]" />
            <span>{PORTFOLIO_DATA.contact.email}</span>
            <span className="ml-1 text-white/50">
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            </span>
          </button>
        </div>

        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono text-[#00D9FF]"
          >
            ✓ Email address copied to clipboard!
          </motion.div>
        )}
      </div>
    </section>
  );
};
