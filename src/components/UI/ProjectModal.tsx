"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, Tag, Calendar, Cpu, GitBranch, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/portfolio";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#03050B]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#00D9FF]/20 bg-[#080D18] p-6 sm:p-10 shadow-[0_0_80px_rgba(0,217,255,0.15)] text-[#F5F7FF]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 rounded-full border border-white/10 bg-white/5 p-2 text-neutral-400 transition-colors hover:border-[#00D9FF] hover:bg-[#00D9FF]/20 hover:text-white"
            aria-label="Close Case Study"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF]">
              <Cpu className="h-3.5 w-3.5" />
              <span>{project.category}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              {project.title}
            </h3>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9CA8BD] pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#00D9FF]" />
                {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF]" />
                Engineering Case Study
              </span>
            </div>
          </div>

          {/* Deep Dive Content */}
          <div className="space-y-6 text-neutral-300">
            {/* Overview */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00D9FF] mb-2">
                Executive Overview & Objective
              </h4>
              <p className="text-sm sm:text-base font-light leading-relaxed text-neutral-200">
                {project.longDescription}
              </p>
            </div>

            {/* Implementation Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00D9FF] mb-3">
                Key Technical Highlights & Architectural Pillars
              </h4>
              <div className="space-y-2.5">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0B1220]/60 p-3.5 text-xs sm:text-sm text-neutral-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#00D9FF] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00D9FF] mb-3">
                Technologies & Engineering Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#00D9FF]/20 bg-[#0B1220] px-3 py-1.5 text-xs font-mono text-[#00D9FF]"
                  >
                    <Tag className="h-3 w-3 text-[#7657FF]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7657FF] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,217,255,0.3)]"
              >
                <GitBranch className="h-4 w-4" />
                <span>View Repository on GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="text-xs font-mono text-[#9CA8BD]">
                Academic & Research Prototype
              </span>
            )}

            <button
              onClick={onClose}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-[#00D9FF] hover:bg-white/10"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
