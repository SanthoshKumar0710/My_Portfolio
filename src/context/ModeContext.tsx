"use client";

import React, { createContext, useContext, useState } from "react";

export type PortfolioMode = "all" | "aiml" | "fullstack";

interface ModeContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  accentColor: string;
}

const ModeContext = createContext<ModeContextType>({
  mode: "all",
  setMode: () => {},
  accentColor: "#00D9FF",
});

export const usePortfolioMode = () => useContext(ModeContext);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PortfolioMode>("all");

  const accentColor =
    mode === "aiml"
      ? "#7657FF" // Electric Violet for Neural & ML
      : mode === "fullstack"
      ? "#E7C77A" // Technical Gold for Full Stack & Cloud
      : "#00D9FF"; // Electric Cyan for Unified Systems

  return (
    <ModeContext.Provider value={{ mode, setMode, accentColor }}>
      {children}
    </ModeContext.Provider>
  );
};
