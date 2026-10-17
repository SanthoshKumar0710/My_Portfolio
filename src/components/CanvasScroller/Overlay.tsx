"use client";

import React from "react";
import { motion, MotionValue, useTransform, useScroll } from "framer-motion";
import { Sparkles, Cpu, Terminal, Eye, Brain, Layers, GitBranch, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useScrolly } from "./ScrollyCanvas";

interface OverlayProps {
  scrollYProgress?: MotionValue<number>;
}

export const Overlay: React.FC<OverlayProps> = ({ scrollYProgress: propScroll }) => {
  const context = useScrolly();
  const { scrollYProgress: fallbackScroll } = useScroll();
  const scrollYProgress = propScroll || context?.scrollYProgress || fallbackScroll;

  // Section 1: Hero Narrative (0% to ~22%)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 0.9, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.22], [0, -90]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.22], [1, 0.94]);

  // Section 2: Perception & Computer Vision (25% to ~48%)
  const s2Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.22, 0.32, 0.44, 0.5], [60, 0, 0, -60]);

  // Section 3: Deep Learning & Anomaly Prediction (52% to ~74%)
  const s3Opacity = useTransform(scrollYProgress, [0.5, 0.56, 0.7, 0.76], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.5, 0.58, 0.7, 0.76], [60, 0, 0, -60]);

  // Section 4: Intelligent Systems Synthesis (78% to ~98%)
  const s4Opacity = useTransform(scrollYProgress, [0.76, 0.82, 0.94, 0.99], [0, 1, 1, 0]);
  const s4Y = useTransform(scrollYProgress, [0.76, 0.84, 0.94, 0.99], [70, 0, 0, -40]);
  const s4Scale = useTransform(scrollYProgress, [0.8, 0.92], [0.95, 1]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-full w-full pointer-events-none select-none">
      {/* ============================================================ */}
      {/* SECTION 1: 0% Scroll - Santhosh Kumar AI Introduction        */}
      {/* ============================================================ */}
      <motion.div
        style={{ opacity: s1Opacity, y: s1Y, scale: s1Scale }}
        className="absolute inset-0 flex flex-col items-center justify-between py-8 md:py-12 px-6 text-center"
      >
        <div className="pt-16 md:pt-14 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#0B1220]/80 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D9FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D9FF]" />
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-300">
              AI / ML ENGINEER • CHENNAI, INDIA
            </span>
          </div>
        </div>

        <div className="max-w-4xl space-y-3 my-auto pointer-events-none">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase font-display text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
              {PORTFOLIO_DATA.hero.name}
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-[#00D9FF] via-[#7657FF] to-[#A855F7] mt-1 opacity-90 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-xl md:text-2xl font-light text-neutral-200">
            <span className="text-[#00D9FF] font-bold">INTELLIGENT SYSTEMS</span>
            <span className="text-neutral-500">×</span>
            <span className="text-[#7657FF] font-bold">MACHINE LEARNING</span>
          </div>

          <p className="mx-auto max-w-lg text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
            {PORTFOLIO_DATA.hero.tagline}
          </p>
        </div>

        {/* Scroll down indicator positioned safely at bottom */}
        <div className="pb-4 flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
            Scroll to scrub neural layers
          </span>
          <div className="relative h-8 w-5 rounded-full border border-white/20 p-1 flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]"
            />
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* SECTION 2: ~30% Scroll - Computer Vision & NAYAN-X (Left)    */}
      {/* ============================================================ */}
      <motion.div
        style={{ opacity: s2Opacity, y: s2Y }}
        className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24 pt-24 sm:pt-20 md:pt-12"
      >
        {/* Localized dark atmospheric gradient behind text for supreme readability */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#03050B]/95 via-[#03050B]/75 to-transparent -z-10" />

        <div className="max-w-xl lg:max-w-xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md shadow-[0_0_15px_rgba(0,217,255,0.2)]">
            <Eye className="h-3.5 w-3.5" />
            <span>01 / Computer Vision & Perception</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            PERCEPTION BEYOND <br />
            <span className="text-[#00D9FF]">UNCERTAIN TERRAIN.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-lg drop-shadow-md">
            Designing cognitive collision-avoidance architectures like NAYAN-X tailored for unstructured road dynamics through sensor fusion, object tracking, and real-time motion intent prediction.
          </p>

          {/* Mini Pipeline Flow Diagram */}
          <div className="glass-card rounded-xl p-4 border border-[#00D9FF]/30 max-w-md space-y-3 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-[#00D9FF]">
                <Cpu className="h-3.5 w-3.5" />
                <span>NAYAN-X COGNITIVE FLOW</span>
              </span>
              <span className="text-[#E7C77A]">LATENCY: REAL-TIME</span>
            </div>
            {/* Step badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
              {[
                "SEE",
                "PREDICT",
                "REMEMBER",
                "ASSESS",
                "ADAPT",
                "AVOID",
                "LEARN",
              ].map((step, idx) => (
                <span
                  key={step}
                  className="rounded bg-[#0B1220] border border-[#00D9FF]/30 px-2 py-1 text-[#00D9FF] flex items-center gap-1 shadow-sm"
                >
                  <span className="text-neutral-500">{idx + 1}.</span>
                  {step}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <div className="glass-card flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-mono text-neutral-200 border border-[#00D9FF]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF]" />
              <span>Multi-Object Tracking</span>
            </div>
            <div className="glass-card flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-mono text-neutral-200 border border-[#7657FF]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7657FF]" />
              <span>Sensor Fusion Concepts</span>
            </div>
            <div className="glass-card flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-mono text-neutral-200 border border-[#E7C77A]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E7C77A]" />
              <span>Dynamic Risk Assessment</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* SECTION 3: ~60% Scroll - Predictive Systems & ML (Right)     */}
      {/* ============================================================ */}
      <motion.div
        style={{ opacity: s3Opacity, y: s3Y }}
        className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 md:px-16 lg:px-24 text-right pt-24 sm:pt-20 md:pt-12"
      >
        {/* Localized dark atmospheric gradient behind text for supreme readability */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-[#03050B]/95 via-[#03050B]/75 to-transparent -z-10" />

        <div className="max-w-xl lg:max-w-xl space-y-5 flex flex-col items-end relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7657FF]/40 bg-[#7657FF]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#7657FF] backdrop-blur-md shadow-[0_0_15px_rgba(118,87,255,0.2)]">
            <Brain className="h-3.5 w-3.5" />
            <span>02 / Deep Learning & Predictive Telemetry</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            EXTRACTING PATTERNS <br />
            <span className="text-[#7657FF]">BEFORE FAILURES OCCUR.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-lg text-right drop-shadow-md">
            From telemetry anomaly detection across server clusters to analyzing learning rate convergence in deep neural networks, transforming raw metric streams into actionable foresight.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md pt-2 text-left">
            <div className="glass-card p-3.5 rounded-xl border border-[#7657FF]/30 hover:border-[#7657FF] transition-colors shadow-lg">
              <div className="flex items-center gap-2 text-[#7657FF] mb-1">
                <GitBranch className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Infra Failure Prediction
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Anomaly detection, FastAPI backend, React dashboard & Docker containerization.
              </p>
            </div>
            <div className="glass-card p-3.5 rounded-xl border border-[#7657FF]/30 hover:border-[#7657FF] transition-colors shadow-lg">
              <div className="flex items-center gap-2 text-[#00D9FF] mb-1">
                <Brain className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Optimization Dynamics
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Empirical learning rate analysis, loss landscapes, and convergence evaluation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* SECTION 4: ~85% Scroll - Unobstructed 3D Chrome Showcase     */}
      {/* ============================================================ */}
      <motion.div
        style={{ opacity: s4Opacity, y: s4Y, scale: s4Scale }}
        className="absolute inset-0 flex flex-col items-center justify-between py-16 sm:py-20 px-6 text-center pointer-events-auto"
      >
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-black/80 px-4 py-1.5 backdrop-blur-lg shadow-[0_0_20px_rgba(0,217,255,0.25)]">
          <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">
            03 / Intelligent Systems Architecture
          </span>
        </div>

        {/* Center Area left completely clear for 3D Chrome SANTHOSH KUMAR AI/ML ENGINEER */}
        <div className="h-32 sm:h-44 pointer-events-none" />

        {/* Bottom Interactive CTA Buttons */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-4">
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-neutral-300 font-light drop-shadow-md">
            Combining algorithmic rigor with production software engineering to build practical applications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#00D9FF] via-[#7657FF] to-[#A855F7] px-7 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(0,217,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Cpu className="h-4 w-4" />
              <span>EXPLORE SELECTED SYSTEMS</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection("capabilities")}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#00D9FF]/40 bg-[#0B1220]/80 px-7 py-3.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00D9FF] shadow-[0_0_30px_rgba(0,217,255,0.15)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#00D9FF]/15 hover:border-[#00D9FF] active:scale-95 cursor-pointer"
            >
              <Terminal className="h-4 w-4" />
              <span>VIEW CAPABILITIES</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
