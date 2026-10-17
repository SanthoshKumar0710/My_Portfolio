"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, Cpu, Network } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getAssetPath } from "@/utils/assetPath";

export const CinematicHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Interactive 3D neural network background on canvas (throttled & pauses off-screen)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      isVisible = window.scrollY < window.innerHeight * 1.2;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Generate balanced neural nodes
    const nodeCount = Math.min(28, Math.floor(width / 45));
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const colors = ["#00D9FF", "#7657FF", "#A855F7", "#E7C77A"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const alpha = (1 - dist / 120) * 0.16;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.02;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          const currentRadius = n.radius + Math.sin(n.pulse) * 0.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#03050B] text-[#F5F7FF] select-none"
    >
      {/* Background Neural Canvas & Spatial Atmosphere Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Spatial Foundation */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03050B] via-[#070D1E] to-[#03050B]" />

        {/* Ambient Spatial Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D18]/90 via-[#03050B]/70 to-[#03050B]" />

        {/* 3D Neural Particle Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-[1] opacity-70"
        />

        {/* Smooth Atmospheric Vignette framing the canvas cleanly */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: "radial-gradient(ellipse 92% 88% at 50% 50%, transparent 60%, rgba(3, 5, 11, 0.75) 100%)",
          }}
        />

        {/* Atmospheric Volumetric Lighting Glows */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-[#00D9FF]/16 via-[#7657FF]/14 to-[#E7C77A]/12 blur-[130px] z-[2]" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[450px] rounded-full bg-[#E7C77A]/12 blur-[90px] z-[2]" />
      </div>

      {/* Top HUD Status Bar */}
      <div className="relative z-10 w-full pt-24 sm:pt-28 px-6 sm:px-12 md:px-20 lg:px-28 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/75 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D9FF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D9FF]" />
          </span>
          <span className="tracking-widest uppercase text-[#9CA8BD] text-[11px]">
            {PORTFOLIO_DATA.hero.status}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] text-[#9CA8BD] backdrop-blur-md"
        >
          <Network className="h-3 w-3 text-[#7657FF]" />
          <span>{PORTFOLIO_DATA.hero.location}</span>
        </motion.div>
      </div>

      {/* Main Center Editorial Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-12 text-center my-auto py-10 space-y-6">
        {/* Name Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-display text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
            {PORTFOLIO_DATA.hero.name}
          </h1>

          <div className="h-1 max-w-xs mx-auto bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent opacity-90 rounded-full shadow-[0_0_12px_#00D9FF]" />
        </motion.div>

        {/* Professional Title Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-lg sm:text-2xl md:text-3xl font-light tracking-wide text-neutral-200"
        >
          <span className="text-[#00D9FF] font-bold tracking-wider">
            {PORTFOLIO_DATA.hero.headline}
          </span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-300">Python Developer</span>
          <span className="text-neutral-500">•</span>
          <span className="text-[#7657FF] font-semibold">Intelligent Systems</span>
        </motion.div>

        {/* Subtitle Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-[#9CA8BD] font-normal leading-relaxed"
        >
          {PORTFOLIO_DATA.hero.subtagline}
        </motion.p>

        {/* Three Concise Capability Labels */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2"
        >
          {PORTFOLIO_DATA.hero.capabilityPills.map((label, i) => (
            <div
              key={label}
              className="group flex items-center gap-2 rounded-full border border-[#00D9FF]/20 bg-[#0B1220]/80 px-4 py-1.5 text-xs font-mono font-semibold tracking-wider text-[#00D9FF] backdrop-blur-md transition-all hover:border-[#00D9FF]/60 hover:bg-[#00D9FF]/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.25)]"
            >
              <Cpu className="h-3 w-3 text-[#00D9FF]" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#00D9FF] via-[#7657FF] to-[#A855F7] px-8 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(0,217,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(118,87,255,0.6)] active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            <span>EXPLORE MY WORK</span>
          </button>

          <a
            href={getAssetPath(PORTFOLIO_DATA.hero.resumeUrl)}
            download="Santhosh_Kumar_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-8 py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00D9FF] shadow-[0_0_25px_rgba(0,217,255,0.15)] backdrop-blur-md transition-all duration-300 hover:border-[#00D9FF] hover:bg-[#00D9FF]/15 hover:text-white hover:scale-105 active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>DOWNLOAD RESUME</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 pb-8 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("scrolly-section")}
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#9CA8BD]">
          Scroll to explore neural canvas
        </span>
        <div className="relative h-9 w-5 rounded-full border border-white/20 p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]"
          />
        </div>
      </motion.div>
    </section>
  );
};
