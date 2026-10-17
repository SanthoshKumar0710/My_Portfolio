"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  GitBranch,
  Terminal,
  Cpu,
  Brain,
  Sparkles,
  Layers,
  ChevronRight,
  Eye,
} from "lucide-react";
import { PORTFOLIO_DATA, Project, ProjectType } from "@/data/portfolio";
import { ProjectModal } from "@/components/UI/ProjectModal";
import { usePortfolioMode } from "@/context/ModeContext";

export const Projects: React.FC = () => {
  const { mode } = usePortfolioMode();
  const [filter, setFilter] = useState<"all" | "ai" | "fullstack">("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Sync filter when global mode changes
  useEffect(() => {
    if (mode === "aiml") setFilter("ai");
    else if (mode === "fullstack") setFilter("fullstack");
    else setFilter("all");
  }, [mode]);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  return (
    <section
      id="projects"
      className="relative z-20 min-h-screen bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10"
    >
      {/* Background Volumetric Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#00D9FF]/5 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-[400px] w-[500px] rounded-full bg-[#7657FF]/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>05 / Featured Work</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display">
                SELECTED <span className="text-gradient-ai">INTELLIGENT SYSTEMS.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#9CA8BD] font-light leading-relaxed">
                Engineering Practical Solutions with AI, Machine Learning and Software Development.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-[#080D18]/80 p-1.5 backdrop-blur-md">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
                  filter === "all"
                    ? "bg-[#00D9FF] text-[#03050B] font-bold shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                    : "text-[#9CA8BD] hover:text-white"
                }`}
              >
                All Systems ({PORTFOLIO_DATA.projects.length})
              </button>

              <button
                onClick={() => setFilter("ai")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
                  filter === "ai"
                    ? "bg-[#7657FF] text-white font-bold shadow-[0_0_15px_rgba(118,87,255,0.5)]"
                    : "text-[#9CA8BD] hover:text-[#7657FF]"
                }`}
              >
                <Brain className="h-3 w-3" />
                <span>AI & Machine Learning</span>
              </button>

              <button
                onClick={() => setFilter("fullstack")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
                  filter === "fullstack"
                    ? "bg-[#E7C77A] text-[#03050B] font-bold shadow-[0_0_15px_rgba(231,199,122,0.4)]"
                    : "text-[#9CA8BD] hover:text-[#E7C77A]"
                }`}
              >
                <Terminal className="h-3 w-3" />
                <span>Full-Stack Platforms</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Card Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const projectNumber = String(idx + 1).padStart(2, "0");
              const isAI = project.type === "ai";

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  className="group relative rounded-3xl border border-white/10 bg-[#080D18]/80 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#00D9FF]/40 hover:bg-[#0B1220]/90 hover:shadow-[0_15px_50px_-10px_rgba(0,217,255,0.15)] flex flex-col justify-between"
                >
                  {/* Card Header & Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-white/20 group-hover:text-[#00D9FF]/60 transition-colors">
                        {projectNumber}
                      </span>

                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold border ${
                            isAI
                              ? "border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF]"
                              : "border-[#E7C77A]/30 bg-[#E7C77A]/10 text-[#E7C77A]"
                          }`}
                        >
                          {isAI ? "AI / ML Architecture" : "Full-Stack System"}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#00D9FF] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs font-mono text-[#9CA8BD] uppercase tracking-wider">
                      {project.category}
                    </p>

                    <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/10 bg-[#03050B]/80 px-2.5 py-1 text-[11px] font-mono text-[#9CA8BD] group-hover:border-[#00D9FF]/20 group-hover:text-neutral-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => setSelectedCaseStudy(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#00D9FF] transition-all hover:bg-[#00D9FF] hover:text-[#03050B] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                    >
                      <span>View Case Study</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#9CA8BD] hover:text-white transition-colors"
                      >
                        <GitBranch className="h-3.5 w-3.5 text-[#00D9FF]" />
                        <span>GitHub</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <ProjectModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </section>
  );
};
