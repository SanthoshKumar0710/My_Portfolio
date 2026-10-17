"use client";

import React from "react";
import {
  CinematicEntrance,
  CinematicEntranceProps,
} from "@/components/Entrance/CinematicEntrance";

export interface PreloaderProps extends CinematicEntranceProps {}

export const Preloader: React.FC<PreloaderProps> = (props) => {
  return <CinematicEntrance {...props} />;
};

export default Preloader;
