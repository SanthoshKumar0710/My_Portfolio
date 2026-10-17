"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CinematicRevealLive } from "./CinematicRevealLive";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export interface CinematicEntranceProps {
  loaded?: number;
  total?: number;
  onComplete?: () => void;
  autoEnterAtEnd?: boolean;
}

export const CinematicEntrance: React.FC<CinematicEntranceProps> = ({
  onComplete,
  autoEnterAtEnd = true,
}) => {
  const [isDone, setIsDone] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const hasDismissedRef = useRef(false);

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(performance.now());
  const duration = 8.0;

  const dismiss = useCallback(() => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsDone(true);
    onComplete?.();
  }, [onComplete]);

  // Keyboard shortcut listener (Enter / Space / Escape to enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        if (!hasDismissedRef.current) {
          e.preventDefault();
          dismiss();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismiss]);

  // Ultra-smooth 60+ FPS animation loop using delta-time
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000.0;
      lastTimeRef.current = now;

      if (!hasDismissedRef.current) {
        setCurrentTime((prev) => {
          const next = prev + dt;
          if (next >= duration) {
            if (autoEnterAtEnd) {
              setTimeout(dismiss, 120);
            }
            return 0.0;
          }
          return next;
        });
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoEnterAtEnd, dismiss]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(14px)",
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={dismiss}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black text-[#F5F7FF] select-none overflow-hidden cursor-pointer"
          style={{ backgroundColor: "#000000" }}
          title="Click anywhere to enter portfolio"
        >
          {/* Ambient Volumetric Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[700px] rounded-full bg-gradient-to-tr from-[#00D9FF]/12 via-[#7657FF]/10 to-transparent blur-[150px]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-white/5 blur-[110px]" />
            <div className="film-grain" style={{ opacity: 0.035 }} />
          </div>

          {/* Minimalist Top Bar: Identity & Subtle Skip Action */}
          <header className="relative z-20 w-full flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-8 pointer-events-none font-mono text-xs">
            <div className="flex items-center gap-2.5 opacity-80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D9FF] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D9FF]" />
              </span>
              <span className="font-display font-bold tracking-wider text-white text-xs uppercase">
                {PORTFOLIO_DATA.hero.name}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="pointer-events-auto group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-neutral-300 hover:text-white hover:border-[#00D9FF]/50 hover:bg-[#00D9FF]/10 transition-all backdrop-blur-md cursor-pointer"
            >
              <span>Skip Intro</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-[#00D9FF]" />
            </button>
          </header>

          {/* Center Stage: Pure 16:9 Widescreen 3D Animation */}
          <main className="relative z-10 flex-1 w-full flex items-center justify-center px-4 sm:px-8 overflow-hidden pointer-events-none">
            <div className="relative w-full max-w-[1360px] aspect-[16/9] max-h-[82vh] flex items-center justify-center">
              <CinematicRevealLive
                currentTime={currentTime}
                duration={duration}
                aspectRatio="16/9"
              />
            </div>
          </main>

          {/* Minimalist Bottom Hint */}
          <footer className="relative z-20 w-full pb-6 text-center pointer-events-none">
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 opacity-60">
              CLICK ANYWHERE OR PRESS SPACE TO ENTER
            </span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
