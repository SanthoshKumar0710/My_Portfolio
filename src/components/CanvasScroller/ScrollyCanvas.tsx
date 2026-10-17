"use client";

import React, { useEffect, useRef, useState, useCallback, createContext, useContext } from "react";
import { useScroll, useMotionValueEvent, useSpring, MotionValue } from "framer-motion";
import { Layers, Sparkles, Maximize2 } from "lucide-react";
import { getAssetPath } from "@/utils/assetPath";

interface ScrollyContextType {
  scrollYProgress: MotionValue<number>;
}

const ScrollyContext = createContext<ScrollyContextType | null>(null);

export const useScrolly = () => {
  const ctx = useContext(ScrollyContext);
  return ctx;
};

interface ScrollyCanvasProps {
  totalFrames?: number;
  onProgressUpdate?: (progress: number) => void;
  onLoadingProgress?: (loaded: number, total: number) => void;
  children?: React.ReactNode | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
}

export const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({
  totalFrames = 180,
  onProgressUpdate,
  onLoadingProgress,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // 3D Parallax tilt states based on mouse position
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Playback mode: "live" (continuous 60 FPS 16:9 3D loop) vs "scrub" (canvas frame-by-frame inertia)
  const [animationMode, setAnimationMode] = useState<"live" | "scrub">("live");

  // Framer Motion scroll tracking over the 480vh container
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive, lag-free spring (low mass, high responsiveness)
  const smoothProgress = useSpring(rawScrollProgress, {
    stiffness: 350,
    damping: 38,
    mass: 0.08,
    restDelta: 0.0001,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const normY = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    // Subtle, elegant 3D tilt: max 3.5 degrees
    setTilt({
      x: -normY * 3.5,
      y: normX * 4.5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Draw frame on canvas with full 16:9 space coverage & face + body framing
  const drawImageCover = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement, frameIdx: number = 0) => {
      const w = canvas.width;
      const h = canvas.height;
      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;

      if (imgW === 0 || imgH === 0) return;

      const canvasAspect = w / h;

      // Fill canvas with deep cosmic base
      ctx.fillStyle = "#03050B";
      ctx.fillRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // The sequence is 1920x1080 with active content at [656..1264] (width 608, height 1080)
      if (imgW === 1920 && imgH === 1080) {
        const sx = 656;
        const sy = 0;
        const sw = 608;
        const sh = 1080;
        const sAspect = sw / sh; // ~0.563

        // Section 1-3 (frames 0..142): Portrait character with FACE AND BODY
        if (frameIdx < 142) {
          // 1. Deep cosmic gradient base
          const bgGrad = ctx.createRadialGradient(w / 2, h * 0.45, 50, w / 2, h * 0.45, Math.max(w, h) * 0.7);
          bgGrad.addColorStop(0, "#091224");
          bgGrad.addColorStop(0.5, "#060B18");
          bgGrad.addColorStop(1, "#03050B");
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, w, h);

          // 2. Warm ambient sunlight and cyan aura behind the 3D character
          const aura = ctx.createRadialGradient(w / 2, h * 0.45, 30, w / 2, h * 0.45, Math.min(w, h) * 0.45);
          aura.addColorStop(0, "rgba(0, 217, 255, 0.16)");
          aura.addColorStop(0.4, "rgba(118, 87, 255, 0.12)");
          aura.addColorStop(0.7, "rgba(231, 199, 122, 0.08)");
          aura.addColorStop(1, "rgba(3, 5, 11, 0)");
          ctx.fillStyle = aura;
          ctx.fillRect(0, 0, w, h);

          // 3. Proportional ambient bokeh backdrop (preserves aspect ratio, no unnatural stretch)
          ctx.save();
          ctx.globalAlpha = 0.22;
          const bgScale = Math.max(w / sw, h / sh) * 1.15;
          const bgW = sw * bgScale;
          const bgH = sh * bgScale;
          ctx.drawImage(img, sx, sy, sw, sh, (w - bgW) / 2, (h - bgH) / 2, bgW, bgH);
          ctx.restore();

          // 4. Foreground Character: Scaled so face, hair, neck, shoulders, and body/shirt are fully visible
          let renderH: number;
          let renderW: number;
          let offsetX: number;
          let offsetY: number;

          if (canvasAspect > sAspect) {
            // Landscape / 16:9 Widescreen:
            renderH = h * 1.02;
            renderW = renderH * sAspect;
            offsetX = (w - renderW) / 2;
            offsetY = (h - renderH) / 2;
          } else {
            // Mobile Portrait:
            renderW = w;
            renderH = w / sAspect;
            offsetX = 0;
            offsetY = Math.max(h - renderH, Math.min(0, -renderH * 0.05));
          }

          ctx.drawImage(img, sx, sy, sw, sh, offsetX, offsetY, renderW, renderH);
        } else {
          // Section 4 (frames 143..180): 3D Chrome Title -> centered & clearly visible
          const targetH = Math.min(h * 0.84, 860);
          let renderH = targetH;
          let renderW = renderH * sAspect;

          if (renderW > w * 0.95) {
            renderW = w * 0.95;
            renderH = renderW / sAspect;
          }

          const offsetX = (w - renderW) / 2;
          const offsetY = Math.max(60, (h - renderH) / 2);

          ctx.drawImage(img, sx, sy, sw, sh, offsetX, offsetY, renderW, renderH);

          // Feathering for title space
          const fadeW = Math.min(32, renderW * 0.08);

          const leftGrad = ctx.createLinearGradient(offsetX, 0, offsetX + fadeW, 0);
          leftGrad.addColorStop(0, "#03050B");
          leftGrad.addColorStop(1, "rgba(3, 5, 11, 0)");
          ctx.fillStyle = leftGrad;
          ctx.fillRect(offsetX - 1, offsetY, fadeW + 1, renderH);

          const rightGrad = ctx.createLinearGradient(offsetX + renderW - fadeW, 0, offsetX + renderW, 0);
          rightGrad.addColorStop(0, "rgba(3, 5, 11, 0)");
          rightGrad.addColorStop(1, "#03050B");
          ctx.fillStyle = rightGrad;
          ctx.fillRect(offsetX + renderW - fadeW, offsetY, fadeW + 1, renderH);
        }
      } else {
        const imgAspect = imgW / imgH;
        let renderW = w;
        let renderH = h;
        if (canvasAspect > imgAspect) {
          renderW = w;
          renderH = w / imgAspect;
        } else {
          renderH = h;
          renderW = h * imgAspect;
        }
        const offsetX = (w - renderW) / 2;
        const offsetY = Math.max(64, (h - renderH) / 2);
        ctx.drawImage(img, 0, 0, imgW, imgH, offsetX, offsetY, renderW, renderH);
      }
    },
    []
  );

  // Render a specific frame with fallback handling
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const clampedIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));
      const img = imagesRef.current[clampedIndex];

      if (!img || !img.complete || img.naturalWidth === 0) {
        let fallbackImg: HTMLImageElement | null = null;
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = imagesRef.current[clampedIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            fallbackImg = prev;
            break;
          }
          const next = imagesRef.current[clampedIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            fallbackImg = next;
            break;
          }
        }
        if (fallbackImg) {
          drawImageCover(ctx, canvas, fallbackImg, clampedIndex);
        }
        return;
      }

      drawImageCover(ctx, canvas, img, clampedIndex);
    },
    [totalFrames, drawImageCover]
  );

  // Resize canvas with 1:1 display resolution
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
    }

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Preload frames progressively with resilient fallback
  useEffect(() => {
    imagesRef.current = new Array(totalFrames).fill(null);
    let loadedCounter = 0;

    const getWebpPath = (index: number) => {
      const padded = String(index + 1).padStart(3, "0");
      return getAssetPath(`/sequence/frame_${padded}.webp`);
    };

    const getJpgPath = (index: number) => {
      const padded = String(index + 1).padStart(3, "0");
      return getAssetPath(`/sequence/frame_${padded}.jpg`);
    };

    const loadSingleFrame = (index: number) => {
      const img = new Image();
      img.src = getWebpPath(index);
      img.onload = () => {
        imagesRef.current[index] = img;
        loadedCounter++;
        onLoadingProgress?.(loadedCounter, totalFrames);

        if (index === 0) {
          setIsFirstFrameLoaded(true);
          handleResize();
          renderFrame(0);
        }
        if (currentFrameRef.current === index) {
          renderFrame(index);
        }
      };
      img.onerror = () => {
        const fallback = new Image();
        fallback.src = getJpgPath(index);
        fallback.onload = () => {
          imagesRef.current[index] = fallback;
          loadedCounter++;
          onLoadingProgress?.(loadedCounter, totalFrames);

          if (index === 0) {
            setIsFirstFrameLoaded(true);
            handleResize();
            renderFrame(0);
          }
          if (currentFrameRef.current === index) {
            renderFrame(index);
          }
        };
      };
    };

    // 1. Immediately request priority frame 0
    loadSingleFrame(0);

    // 2. Concurrently load all other frames progressively
    for (let i = 1; i < totalFrames; i++) {
      loadSingleFrame(i);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames, handleResize, renderFrame, onLoadingProgress]);

  // Handle scroll progress updates without heavy video seek lag
  useMotionValueEvent(smoothProgress, "change", (latestProgress) => {
    onProgressUpdate?.(latestProgress);

    // Map 0 -> 1 to frame index 0 -> totalFrames - 1
    const frameIndex = Math.max(0, Math.min(Math.round(latestProgress * (totalFrames - 1)), totalFrames - 1));

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(() => {
        renderFrame(frameIndex);
      });
    }
  });

  // Manage video play/pause based on animationMode
  useEffect(() => {
    if (!videoRef.current) return;
    if (animationMode === "live") {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [animationMode]);

  return (
    <div
      ref={containerRef}
      id="scrolly-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[480vh] w-full bg-[#03050B]"
    >
      {/* Sticky viewport frame with 3D perspective */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Interactive 3D tilted stage */}
        <div
          className="relative h-full w-full will-change-transform"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Layer 0: Deep Spatial Foundation */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#03050B] via-[#070D1E] to-[#03050B] z-0" />

          {/* Layer 1: Volumetric Dual-Tone Aura behind the 3D character */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[680px] w-[680px] rounded-full bg-gradient-to-tr from-[#00D9FF]/20 via-[#7657FF]/16 to-[#E7C77A]/16 blur-[120px] z-[1]" />
          <div className="pointer-events-none absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[480px] rounded-full bg-[#E7C77A]/16 blur-[90px] z-[1]" />
          <div className="pointer-events-none absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[350px] w-[550px] rounded-full bg-[#00D9FF]/14 blur-[100px] z-[1]" />

          {/* Layer 2: High-Tech Cyber Perspective Grid */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 217, 255, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(118, 87, 255, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 80%)",
            }}
          />

          {/* Layer 3: Live 3D Foreground Video (Framed with 100% precision, zero black bars, head to body) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3] flex items-center justify-center">
            <div
              className="relative flex items-center justify-center overflow-hidden"
              style={{
                height: "min(90vh, 880px)",
                width: "calc(min(90vh, 880px) * (608 / 1080))",
                maxWidth: "96vw",
                maskImage: "radial-gradient(ellipse 95% 94% at 50% 50%, black 78%, rgba(0,0,0,0.85) 88%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 95% 94% at 50% 50%, black 78%, rgba(0,0,0,0.85) 88%, transparent 100%)",
              }}
            >
              <video
                ref={videoRef}
                src={getAssetPath("/video.mp4")}
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setIsVideoReady(true)}
                className={`max-w-none transition-opacity duration-700 ${
                  animationMode === "live" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{
                  height: "100%",
                  width: "315.789%",
                  maxWidth: "none",
                  objectFit: "fill",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  filter: "brightness(1.02) contrast(1.05) saturate(1.1)",
                }}
              />
            </div>
          </div>

          {/* Layer 5: 60-120 FPS HTML5 Canvas Scrubbing Engine (frame-by-frame) */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 block h-full w-full object-cover z-[3] transition-opacity duration-700 ${
              animationMode === "scrub" || !isVideoReady ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundColor: "transparent",
            }}
          />

          {/* Layer 6: Soft Peripheral Vignette framing the 16:9 canvas */}
          <div
            className="pointer-events-none absolute inset-0 z-[4]"
            style={{
              background: "radial-gradient(ellipse 92% 88% at 50% 50%, transparent 60%, rgba(3, 5, 11, 0.75) 100%)",
            }}
          />

          {/* Atmospheric Neural Glow Accents */}
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-[#00D9FF]/10 blur-[150px] z-[5]" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-[450px] w-[600px] rounded-full bg-[#7657FF]/12 blur-[160px] z-[5]" />

          {/* 16:9 3D Cinematic Viewport HUD Overlays */}
          <div className="absolute top-6 left-6 z-20 pointer-events-none hidden md:flex items-center gap-2 font-mono text-[10px] text-neutral-400">
            <div className="h-2 w-2 border-l border-t border-[#00D9FF]" />
            <span className="text-[#00D9FF]">3D CAMERA</span>
            <span className="text-neutral-600">{"//"}</span>
            <span>16:9 WIDESCREEN FOV</span>
          </div>

          <div className="absolute top-6 right-6 z-20 pointer-events-none hidden md:flex items-center gap-2 font-mono text-[10px] text-neutral-400">
            <span>SPATIAL MATRIX</span>
            <span className="text-neutral-600">{"//"}</span>
            <span className="text-[#7657FF]">1920×1080</span>
            <div className="h-2 w-2 border-r border-t border-[#7657FF]" />
          </div>

          <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden md:flex items-center gap-2 font-mono text-[10px] text-neutral-400">
            <div className="h-2 w-2 border-l border-b border-[#00D9FF]" />
            <span className="text-[#00D9FF]">60 FPS ENGINE</span>
            <span className="text-neutral-600">{"//"}</span>
            <span>HARDWARE SYNCED</span>
          </div>

          {/* Interactive Mode Toggle Badge in Bottom Right */}
          <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
            <button
              onClick={() => setAnimationMode((prev) => (prev === "live" ? "scrub" : "live"))}
              className="flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/85 px-4 py-1.5 text-xs font-mono text-[#00D9FF] backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.2)] hover:border-[#00D9FF] hover:bg-[#00D9FF]/15 transition-all cursor-pointer"
              title="Toggle between 16:9 live auto-playing animation and scroll-scrubbing"
            >
              {animationMode === "live" ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D9FF] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D9FF]" />
                  </span>
                  <span>16:9 3D LIVE LOOP</span>
                </>
              ) : (
                <>
                  <Layers className="h-3 w-3 text-[#7657FF]" />
                  <span>3D SCROLL-SCRUB</span>
                </>
              )}
            </button>
          </div>

          {/* Narrative Parallax Overlay sitting at z-10 with smoothed scroll progress */}
          <ScrollyContext.Provider value={{ scrollYProgress: smoothProgress }}>
            <div className="absolute inset-0 z-10">
              {typeof children === "function" ? children(smoothProgress) : children}
            </div>
          </ScrollyContext.Provider>
        </div>
      </div>
    </div>
  );
};
