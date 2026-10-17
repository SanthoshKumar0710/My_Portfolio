"use client";

import React, { useState } from "react";
import { CinematicHero } from "@/components/Hero/CinematicHero";
import { ScrollyCanvas } from "@/components/CanvasScroller/ScrollyCanvas";
import { Overlay } from "@/components/CanvasScroller/Overlay";
import { Preloader } from "@/components/CanvasScroller/Preloader";
import { AboutMe } from "@/components/Portfolio/AboutMe";
import { VisionPerceptionSlider } from "@/components/Video/VisionPerceptionSlider";
import { Projects } from "@/components/Portfolio/Projects";
import { Capabilities } from "@/components/Portfolio/Capabilities";
import { EngineeringProcess } from "@/components/Portfolio/EngineeringProcess";
import { DeveloperTerminal } from "@/components/Code/DeveloperTerminal";
import { Education } from "@/components/Portfolio/Education";
import { Certifications } from "@/components/Portfolio/Certifications";
import { Contact } from "@/components/Portfolio/Contact";
import { Footer } from "@/components/Portfolio/Footer";

export default function HomePage() {
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [showEntrance, setShowEntrance] = useState(true);
  const totalFrames = 180;

  React.useEffect(() => {
    const handleReplay = () => setShowEntrance(true);
    window.addEventListener("replay-cinematic-entrance", handleReplay);
    return () => window.removeEventListener("replay-cinematic-entrance", handleReplay);
  }, []);

  return (
    <>
      {/* 3D Cinematic Sequence Starting Entrance & Reveal */}
      {showEntrance && (
        <Preloader
          loaded={loadedFrames}
          total={totalFrames}
          onComplete={() => setShowEntrance(false)}
        />
      )}

      {/* STAGE 1: Cinematic AI Introduction with Supplied Video & 3D Neural Nodes */}
      <CinematicHero />

      {/* STAGE 2 & 3: Scrollytelling Sticky Canvas & Neural Perception Overlay */}
      <ScrollyCanvas
        totalFrames={totalFrames}
        onLoadingProgress={(loaded) => setLoadedFrames(loaded)}
      >
        <Overlay />
      </ScrollyCanvas>

      {/* About Santhosh Kumar & Authentic Portrait */}
      <AboutMe />

      {/* Interactive Computer Vision & Autonomous Perception Demo */}
      <VisionPerceptionSlider />

      {/* STAGE 4: Selected Intelligent Systems (5 Real Projects & Case Studies) */}
      <Projects />

      {/* STAGE 5: Technical Capabilities Matrix (7 Categorized Domains) */}
      <Capabilities />

      {/* Engineering Process: How I Build Intelligent Systems (6 Lifecycle Stages) */}
      <EngineeringProcess />

      {/* Interactive AI/ML Developer Terminal (santhosh@ai-lab) */}
      <DeveloperTerminal />

      {/* Academic Education & Coursework */}
      <Education />

      {/* Certifications & Continuous Learning */}
      <Certifications />

      {/* Contact Section: Let's Build Something Intelligent */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}
