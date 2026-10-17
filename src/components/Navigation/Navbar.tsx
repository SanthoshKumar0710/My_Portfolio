"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Brain, Terminal, Menu, X, Download, Sparkles } from "lucide-react";
import { SoundButton } from "@/components/UI/SoundManager";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getAssetPath } from "@/utils/assetPath";
import { usePortfolioMode, PortfolioMode } from "@/context/ModeContext";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode, setMode } = usePortfolioMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#capabilities" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center p-3 sm:p-5 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 rounded-full border px-4 sm:px-6 py-2 transition-all duration-500 max-w-7xl w-full ${
          scrolled
            ? "border-[#00D9FF]/20 bg-[#080D18]/90 shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl"
            : "border-white/10 bg-[#03050B]/60 backdrop-blur-md"
        }`}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-[#00D9FF] transition-colors flex-shrink-0"
        >
          <Cpu className="h-4 w-4 text-[#00D9FF] animate-pulse" />
          <span className="font-display tracking-tight text-sm sm:text-base">
            {PORTFOLIO_DATA.hero.shortName}
          </span>
        </a>

        {/* The 3-Way Mode Switcher (Global HUD) */}
        <div className="hidden lg:flex items-center rounded-full border border-white/10 bg-[#0B1220]/80 p-1 backdrop-blur-md">
          <button
            onClick={() => setMode("all")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono transition-all ${
              mode === "all"
                ? "bg-[#00D9FF] text-[#03050B] font-bold shadow-[0_0_12px_rgba(0,217,255,0.6)]"
                : "text-[#9CA8BD] hover:text-white"
            }`}
          >
            <span>ALL</span>
          </button>

          <button
            onClick={() => setMode("aiml")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono transition-all ${
              mode === "aiml"
                ? "bg-[#7657FF] text-white font-bold shadow-[0_0_12px_rgba(118,87,255,0.6)]"
                : "text-[#9CA8BD] hover:text-white"
            }`}
          >
            <Brain className="h-3 w-3" />
            <span>AI / ML</span>
          </button>

          <button
            onClick={() => setMode("fullstack")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono transition-all ${
              mode === "fullstack"
                ? "bg-[#E7C77A] text-[#03050B] font-bold shadow-[0_0_12px_rgba(231,199,122,0.6)]"
                : "text-[#9CA8BD] hover:text-white"
            }`}
          >
            <Terminal className="h-3 w-3" />
            <span>FULL STACK</span>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-5 text-xs font-mono text-neutral-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="transition-colors hover:text-[#00D9FF] focus:outline-none focus:ring-1 focus:ring-[#00D9FF] rounded px-1"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Controls: Audio, Resume Download & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => {
              window.dispatchEvent(new Event("replay-cinematic-entrance"));
            }}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs font-mono text-neutral-300 backdrop-blur-md transition-all hover:border-[#00D9FF]/40 hover:bg-[#00D9FF]/10 hover:text-[#00D9FF]"
            title="Replay 3D Cinematic Reveal Intro"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#00D9FF]" />
            <span className="hidden md:inline text-[11px] font-semibold">INTRO</span>
          </button>

          <SoundButton />

          <a
            href={getAssetPath(PORTFOLIO_DATA.hero.resumeUrl)}
            download="Santhosh_Kumar_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7657FF] px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            <Download className="h-3 w-3" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-neutral-300 hover:text-white rounded-lg border border-white/10 bg-white/5"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 rounded-3xl border border-[#00D9FF]/20 bg-[#080D18]/95 p-6 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 text-center xl:hidden z-50"
          >
            {/* Mobile Mode Switcher */}
            <div className="flex items-center justify-center rounded-full border border-white/10 bg-[#03050B] p-1 mb-2">
              {(["all", "aiml", "fullstack"] as PortfolioMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-1.5 text-xs font-mono uppercase rounded-full transition-all ${
                    mode === m
                      ? m === "aiml"
                        ? "bg-[#7657FF] text-white font-bold"
                        : m === "fullstack"
                        ? "bg-[#E7C77A] text-[#03050B] font-bold"
                        : "bg-[#00D9FF] text-[#03050B] font-bold"
                      : "text-[#9CA8BD]"
                  }`}
                >
                  {m === "all" ? "All" : m === "aiml" ? "AI/ML" : "Stack"}
                </button>
              ))}
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-3 py-2 border-y border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="py-1.5 text-sm font-mono text-neutral-200 hover:text-[#00D9FF] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <a
              href={getAssetPath(PORTFOLIO_DATA.hero.resumeUrl)}
              download="Santhosh_Kumar_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7657FF] py-3 text-xs font-mono font-bold uppercase tracking-wider text-white"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
