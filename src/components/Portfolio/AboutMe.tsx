"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Code2, Brain, MapPin, Compass } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const AboutMe: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-20 bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10 overflow-hidden"
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute top-1/3 left-0 h-[500px] w-[500px] rounded-full bg-[#00D9FF]/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[450px] w-[450px] rounded-full bg-[#7657FF]/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <Compass className="h-3.5 w-3.5" />
            <span>04 / Identity & Philosophy</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display">
            {PORTFOLIO_DATA.about.heading}
          </h2>

          <p className="text-lg sm:text-xl font-light text-[#00D9FF]">
            {PORTFOLIO_DATA.about.subtitle}
          </p>
        </div>

        {/* Content Grid: Portrait on left, Professional Summary & highlights on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Authentic Portrait with restrained 3D card presentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Outer decorative glowing aura */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00D9FF] via-[#7657FF] to-[#A855F7] opacity-35 blur-xl group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />

              {/* Portrait Frame Card */}
              <div className="relative rounded-3xl border border-white/15 bg-[#080D18] p-3 shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#03050B]">
                  {/* Real authentic portrait image of Santhosh Kumar */}
                  <img
                    src={PORTFOLIO_DATA.hero.portraitUrl}
                    alt="Santhosh Kumar — AI/ML Engineer"
                    className="h-full w-full object-cover object-top filter contrast-[1.05] brightness-95 transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient bottom blend to preserve readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080D18] via-transparent to-transparent opacity-80" />

                  {/* Bottom overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#0B1220]/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2 text-white">
                      <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse" />
                      <span className="font-bold">Santhosh Kumar</span>
                    </div>
                    <span className="text-[#9CA8BD] text-[11px]">Chennai, TN</span>
                  </div>
                </div>

                {/* Technical Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00D9FF]" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#00D9FF]" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#00D9FF]" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00D9FF]" />
              </div>
            </div>
          </motion.div>

          {/* Professional Narrative & Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Primary Bio Paragraph */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
              <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
                {PORTFOLIO_DATA.about.summary}
              </p>
            </div>

            {/* Structured Academic & Focus Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-xl border border-white/10 hover:border-[#00D9FF]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#00D9FF] mb-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                    Academic Institution
                  </span>
                </div>
                <p className="text-sm text-neutral-300 font-medium">
                  Rajalakshmi Institute of Technology, Chennai
                </p>
                <p className="text-xs text-[#9CA8BD] font-mono mt-1">
                  B.E. CSE (Spec: AI & ML) • 2024 — 2028
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-white/10 hover:border-[#7657FF]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#7657FF] mb-1.5">
                  <Brain className="h-4 w-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                    Engineering Focus
                  </span>
                </div>
                <p className="text-sm text-neutral-300 font-medium">
                  Intelligent Systems & Neural Modeling
                </p>
                <p className="text-xs text-[#9CA8BD] font-mono mt-1">
                  Computer Vision, NLP, Predictive Analytics
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-white/10 hover:border-[#A855F7]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#A855F7] mb-1.5">
                  <Code2 className="h-4 w-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                    Primary Tech Stack
                  </span>
                </div>
                <p className="text-sm text-neutral-300 font-medium">
                  Python, TensorFlow, Scikit-learn
                </p>
                <p className="text-xs text-[#9CA8BD] font-mono mt-1">
                  FastAPI, React, Docker, PostgreSQL
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-white/10 hover:border-[#E7C77A]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#E7C77A] mb-1.5">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                    Location & Availability
                  </span>
                </div>
                <p className="text-sm text-neutral-300 font-medium">
                  Chennai, Tamil Nadu, India
                </p>
                <p className="text-xs text-[#9CA8BD] font-mono mt-1">
                  Open for AI/ML Roles & Internships
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
