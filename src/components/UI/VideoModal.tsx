"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Film, Sparkles, Volume2, ShieldCheck, Tag } from "lucide-react";
import { Project } from "@/data/portfolio";

interface VideoModalProps {
  project: Project;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Cinema Player Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-neutral-950 shadow-[0_0_80px_rgba(255,34,0,0.25)] flex flex-col"
        >
          {/* Top Cinema Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/90 px-6 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                {project.title}
              </span>
              <span className="hidden sm:inline rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                {project.aspectRatio || "16:9"}
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Video Player Area */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-neutral-500 font-mono text-xs">
                <Film className="h-10 w-10 text-brand-orange animate-pulse" />
                <span>Cinematic Showreel Rendering</span>
              </div>
            )}
          </div>

          {/* Bottom Details Footer */}
          <div className="p-6 bg-neutral-950 space-y-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-brand-orange">
                  {project.category}
                </span>
                <p className="text-sm text-neutral-300 font-light mt-1">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] font-mono text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
