"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, Cpu, Scan, ShieldCheck, Crosshair, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getAssetPath } from "@/utils/assetPath";

export const VisionPerceptionSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section
      id="vision-demo"
      className="relative z-20 bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <Scan className="h-3.5 w-3.5" />
            <span>Computer Vision & Autonomous Perception Demo</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-display">
            PERCEPTION & <span className="text-gradient-ai">VISION INFERENCE.</span>
          </h3>

          <p className="text-sm sm:text-base text-[#9CA8BD] font-light leading-relaxed">
            {PORTFOLIO_DATA.visionDemo.description}
          </p>
        </div>

        {/* Comparison Frame Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[#00D9FF]/30 bg-black shadow-[0_0_60px_rgba(0,217,255,0.15)] cursor-ew-resize select-none"
        >
          {/* Layer 1: Neural Perception & Tracking Layer (Full Width background) */}
          <div className="absolute inset-0">
            <img
              src={getAssetPath("/images/nayan-ximage.jpeg")}
              alt="NAYAN-X 3D Fused Sensor Perception"
              className="h-full w-full object-cover"
            />

            {/* Neural Computer Vision HUD Overlays */}
            <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
              {/* Top HUD Stats (Right-aligned to stay visible on the perception side) */}
              <div className="flex items-center justify-end gap-2 text-[11px] font-mono">
                <div className="rounded-lg bg-[#0B1220]/90 border border-[#00D9FF]/40 px-3 py-1.5 backdrop-blur-md text-[#00D9FF] flex items-center gap-2 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse" />
                  <span>NAYAN-X PERCEPTION ACTIVE [FPS: 60.0]</span>
                </div>

                <div className="hidden md:flex rounded-full border border-[#7657FF]/40 bg-[#080D18]/85 px-3 py-1 text-xs font-mono font-bold text-[#7657FF] backdrop-blur-md shadow-lg">
                  ✓ {PORTFOLIO_DATA.visionDemo.afterLabel}
                </div>
              </div>

              {/* Bottom HUD Metrics */}
              <div className="flex items-center justify-end gap-4 text-[10px] font-mono text-[#9CA8BD]">
                <div className="bg-[#03050B]/80 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-md flex items-center gap-3">
                  <span className="text-[#00D9FF]">SENSOR FUSION: CAMERA + LiDAR + RADAR</span>
                  <span className="text-white/40">|</span>
                  <span className="text-emerald-400">LATENCY: 12ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: Raw Sensor Feed (Clipped to slider position via clip-path) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={getAssetPath("/images/rawinput.jpeg")}
              alt="Raw Camera Input"
              className="h-full w-full object-cover"
            />

            {/* Raw Sensor Feed HUD Overlays */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
              <div className="flex items-start">
                <div className="rounded-full border border-white/20 bg-[#03050B]/85 px-3.5 py-1 text-xs font-mono font-semibold text-neutral-300 backdrop-blur-md shadow-lg">
                  ⚡ {PORTFOLIO_DATA.visionDemo.beforeLabel}
                </div>
              </div>

              <div className="flex items-end">
                <div className="text-[10px] font-mono text-neutral-400 bg-black/80 border border-white/10 px-2.5 py-1 rounded backdrop-blur-md">
                  UNPROCESSED 1080p CAMERA STREAM
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Draggable Divider Line */}
          <div
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_#00D9FF] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Handle Grip */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 h-9 w-9 rounded-full border-2 border-white bg-[#03050B] shadow-[0_0_20px_#00D9FF] flex items-center justify-center">
              <Crosshair className="h-4 w-4 text-[#00D9FF]" />
            </div>
          </div>
        </div>

        {/* Instructions Below */}
        <div className="mt-6 flex flex-wrap items-center justify-between text-xs font-mono text-[#9CA8BD]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF]" />
            <span>DRAG SLIDER HORIZONTALLY TO COMPARE PERCEPTION LAYERS</span>
          </span>
          <span className="text-[#00D9FF]">SEE → PREDICT → ASSESS → AVOID</span>
        </div>
      </div>
    </section>
  );
};
