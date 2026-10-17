"use client";

import React from "react";
import { motion } from "framer-motion";

interface CinematicRevealLiveProps {
  currentTime?: number;
  duration?: number;
  aspectRatio?: "16/9" | "9/16" | "fill";
}

export const CinematicRevealLive: React.FC<CinematicRevealLiveProps> = ({
  currentTime = 0,
  duration = 8.0,
  aspectRatio = "16/9",
}) => {
  const portfolioLetters = ["P", "O", "R", "T", "F", "O", "L", "I", "O"];
  const t = currentTime;

  // 1. Spotlight intensity (0.0 to 1.0)
  let spotlightOpacity = 0.0;
  if (t < 0.2) spotlightOpacity = 0.0;
  else if (t < 0.85) spotlightOpacity = (t - 0.2) / 0.65;
  else if (t < 6.8) spotlightOpacity = 1.0;
  else spotlightOpacity = Math.max(0, 1.0 - (t - 6.8) / 1.15);

  // 2. Base letters (SAN & HOSH) opacity
  let baseLettersOpacity = 0.0;
  if (t < 0.6) baseLettersOpacity = 0.0;
  else if (t < 1.1) baseLettersOpacity = (t - 0.6) / 0.5;
  else if (t < 6.8) baseLettersOpacity = 1.0;
  else baseLettersOpacity = Math.max(0, 1.0 - (t - 6.8) / 1.15);

  // 3. Falling Letter 'T' Physics
  let tLetterY = -550;
  let tOpacity = 0.0;
  let isTImpact = false;
  let impactProgress = 0.0;
  let recoilX = 0;

  if (t < 1.1) {
    tLetterY = -550;
    tOpacity = 0.0;
  } else if (t < 1.65) {
    // Gravitational acceleration (1.1s to 1.65s)
    const p = (t - 1.1) / 0.55;
    tOpacity = Math.min(1.0, p * 2.8);
    tLetterY = -550 * Math.pow(1.0 - p, 2.2);
  } else if (t < 2.05) {
    // Elastic settle on impact
    tOpacity = 1.0;
    const impactT = t - 1.65;
    impactProgress = impactT / 0.4;
    isTImpact = true;
    // Damped harmonic bounce
    tLetterY = Math.sin(impactT * Math.PI * 9) * 8 * Math.exp(-impactT * 11);
    recoilX = Math.sin(impactT * Math.PI * 7) * 4 * Math.exp(-impactT * 9);
  } else {
    // Settled
    tLetterY = 0;
    tOpacity = baseLettersOpacity;
    recoilX = 0;
  }

  // 4. Widescreen Light Sweep 1 (over SANTHOSH, t = 2.15s to 3.75s)
  let sweepProgress1 = -1.0;
  if (t >= 2.15 && t <= 3.75) {
    sweepProgress1 = (t - 2.15) / 1.6;
  }

  // 5. Morph Transition: SANTHOSH -> PORTFOLIO (t = 3.8s to 5.3s)
  let morphProgress = 0.0;
  let waveXPercent = -20;
  if (t < 3.8) {
    morphProgress = 0.0;
  } else if (t <= 5.3) {
    morphProgress = (t - 3.8) / 1.5;
    waveXPercent = -20 + morphProgress * 140; // -20% to 120%
  } else {
    morphProgress = 1.0;
  }

  // 6. Widescreen Light Sweep 2 (over PORTFOLIO, t = 5.4s to 6.9s)
  let sweepProgress2 = -1.0;
  if (t >= 5.4 && t <= 6.9) {
    sweepProgress2 = (t - 5.4) / 1.5;
  }

  // Camera micro-push (1.00 -> 1.025)
  const cameraScale = 1.0 + 0.025 * (t / duration);

  return (
    <div
      className="cinematic-viewport relative w-full h-full flex items-center justify-center overflow-hidden bg-black select-none"
      style={{
        aspectRatio: aspectRatio === "16/9" ? "16 / 9" : aspectRatio === "9/16" ? "9 / 16" : "auto",
        backgroundColor: "#000000",
      }}
    >
      {/* 1. Volumetric Widescreen Atmospheric Spotlight */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "min(1400px, 95vw)",
          height: "min(680px, 85vh)",
          background:
            "radial-gradient(ellipse at center, rgba(38, 44, 52, 0.95) 0%, rgba(24, 28, 34, 0.65) 42%, rgba(12, 14, 18, 0.3) 68%, transparent 85%)",
          filter: "blur(32px)",
          opacity: spotlightOpacity,
          transform: `scale(${1.0 + spotlightOpacity * 0.12})`,
          transition: "opacity 0.1s linear",
        }}
      />

      {/* 2. Film Grain Texture */}
      <div className="film-grain" style={{ opacity: spotlightOpacity * 0.04 }} />

      {/* 3. Main 3D Title Stage */}
      <motion.div
        className="relative z-10 flex items-center justify-center px-4 w-full"
        style={{
          transform: `scale(${cameraScale})`,
          opacity: t > 6.8 ? baseLettersOpacity : 1.0,
        }}
      >
        {/* IMPACT SPECULAR SHOCKWAVE (16:9 Widescreen Ellipse) */}
        {isTImpact && (
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: `${220 + impactProgress * 550}px`,
              height: `${90 + impactProgress * 220}px`,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(0,217,255,0.3) 35%, transparent 70%)",
              opacity: Math.max(0, 1.0 - impactProgress * 1.3),
              transform: "translate(-50%, -50%)",
              left: "48%",
              top: "50%",
              filter: "blur(10px)",
              zIndex: 5,
            }}
          />
        )}

        {/* TRANSITION LIGHT SLICE BEAM (Spans full widescreen height) */}
        {morphProgress > 0 && morphProgress < 1 && (
          <div
            className="absolute -top-32 -bottom-32 pointer-events-none"
            style={{
              left: `${waveXPercent}%`,
              width: "100px",
              transform: "translateX(-50%) skewX(-20deg)",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 38%, rgba(255,255,255,0.98) 50%, rgba(255,255,255,0.4) 62%, transparent 100%)",
              filter: "blur(8px)",
              zIndex: 25,
              opacity: Math.sin(morphProgress * Math.PI) * 1.6,
            }}
          />
        )}

        {/* --- STAGE A: SANTHOSH WITH FALLING 'T' (morphProgress < 1.0) --- */}
        {morphProgress < 1.0 && (
          <div
            className="relative flex items-center justify-center tracking-[-0.015em] w-full"
            style={{
              opacity: 1.0 - Math.min(1.0, morphProgress * 1.8),
              filter: morphProgress > 0 ? `blur(${morphProgress * 4}px)` : "none",
            }}
          >
            {/* SAN (Left Cluster) */}
            <div
              className="flex items-center"
              style={{
                transform: `translateX(${-recoilX}px)`,
                opacity: baseLettersOpacity,
                transition: "transform 0.05s linear",
              }}
            >
              {["S", "A", "N"].map((char, i) => (
                <span
                  key={`san-${i}`}
                  className="chrome-letter text-[clamp(2.75rem,7.5vw,5.5rem)]"
                  data-char={char}
                  style={{ marginRight: "-0.01em" }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* T (Falling & Impacting Letter) */}
            <div
              className="relative inline-block"
              style={{
                transform: `translate3d(0, ${tLetterY}px, 0)`,
                opacity: tOpacity,
                zIndex: 20,
              }}
            >
              <span
                className="chrome-letter text-[clamp(2.75rem,7.5vw,5.5rem)]"
                data-char="T"
                style={{
                  filter:
                    tLetterY < -20
                      ? "drop-shadow(0 25px 35px rgba(255,255,255,0.45)) drop-shadow(0 0 20px rgba(0,217,255,0.3))"
                      : undefined,
                }}
              >
                T
              </span>
            </div>

            {/* HOSH (Right Cluster) */}
            <div
              className="flex items-center"
              style={{
                transform: `translateX(${recoilX}px)`,
                opacity: baseLettersOpacity,
                transition: "transform 0.05s linear",
              }}
            >
              {["H", "O", "S", "H"].map((char, i) => (
                <span
                  key={`hosh-${i}`}
                  className="chrome-letter text-[clamp(2.75rem,7.5vw,5.5rem)]"
                  data-char={char}
                  style={{ marginLeft: i === 0 ? "-0.01em" : "-0.01em" }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Widescreen Light Sweep 1 (over SANTHOSH) */}
            {sweepProgress1 >= 0 && (
              <div
                className="light-sweep-overlay"
                style={{
                  transform: `translateX(${-140 + sweepProgress1 * 280}%) skewX(-22deg)`,
                  opacity: Math.sin(sweepProgress1 * Math.PI) * 1.35,
                }}
              />
            )}
          </div>
        )}

        {/* --- STAGE B: PORTFOLIO MASTER DISPLAY (morphProgress > 0) --- */}
        {morphProgress > 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center tracking-[-0.015em] w-full"
            style={{
              opacity: Math.min(1.0, morphProgress * 1.8),
              filter: morphProgress < 1.0 ? `blur(${(1.0 - morphProgress) * 4}px)` : "none",
            }}
          >
            <div className="flex items-center justify-center">
              {portfolioLetters.map((char, i) => (
                <span
                  key={`port-${i}`}
                  className="chrome-letter text-[clamp(2.75rem,7.5vw,5.5rem)]"
                  data-char={char}
                  style={{
                    letterSpacing: "-0.015em",
                    transform:
                      morphProgress < 1.0 ? `scale(${0.96 + 0.04 * morphProgress})` : "none",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Widescreen Light Sweep 2 (over PORTFOLIO) */}
            {sweepProgress2 >= 0 && (
              <div
                className="light-sweep-overlay"
                style={{
                  transform: `translateX(${-140 + sweepProgress2 * 280}%) skewX(-22deg)`,
                  opacity: Math.sin(sweepProgress2 * Math.PI) * 1.35,
                }}
              />
            )}
          </div>
        )}
      </motion.div>

      {/* Subtle Bottom Ambient Reflection (Widescreen Pool) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-10 opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200, 225, 255, 0.45) 0%, transparent 72%)",
          filter: "blur(16px)",
        }}
      />
    </div>
  );
};
