"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playChime: (freq?: number) => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playChime: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playChime = (freq = 440) => {
    if (isMuted) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch {
      // AudioContext gracefully ignored if blocked by browser policy
    }
  };

  const toggleMute = () => {
    initAudio();
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (!nextState) {
      setTimeout(() => playChime(520), 100);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playChime }}>
      {children}
    </SoundContext.Provider>
  );
};

export const SoundButton: React.FC = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Enable Ambient Sound" : "Mute Sound"}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-neutral-300 backdrop-blur-md transition-all hover:border-brand-orange hover:bg-brand-orange/10 hover:text-white"
    >
      {isMuted ? (
        <>
          <VolumeX className="h-3.5 w-3.5 text-neutral-400" />
          <span className="hidden sm:inline">AUDIO: OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="h-3.5 w-3.5 text-brand-orange animate-pulse" />
          <span className="hidden sm:inline text-brand-orange">AUDIO: ON</span>
        </>
      )}
    </button>
  );
};
