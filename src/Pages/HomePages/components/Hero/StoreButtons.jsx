import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import "./StoreButtons.css";
import appleIcon from "../../../../../src/assets/icons/apple.png";
import playIcon from "../../../../../src/assets/icons/android.png";

export default function StoreButtons() {
  const controlText = useAnimation();
  const controlIcon = useAnimation();

  const hoverIn = async (control) => {
    await control.start({
      x: [0, -12, -8, -10],
      transition: {
        duration: 0.75,
        ease: [0.25, 1, 0.5, 1],
      },
    });
      
    //   await control.set({ x: -10 });
  };

  const hoverOut = async (control) => {
    await control.start({
      x: [-12, 4, -1, 0],
      duration: 1.35,
      ease: [0.33, 0, 0.2, 1], // slow start → soft end
      times: [0, 0.45, 0.75, 1],
    });
  };

  return (
    <div className="store-buttons">
      {/* APP STORE */}
      <div
        className="store-row"
        onMouseEnter={() => hoverIn(controlText)}
        onMouseLeave={() => hoverOut(controlText)}
      >
        <button className="icon-pill">
          <img src={appleIcon} />
        </button>

        <motion.a className="text-pill" animate={controlText}>
          <img src={appleIcon} className="pill-icon" />
          App Store
        </motion.a>
      </div>

      {/* PLAY STORE */}
      <div
        className="store-row"
        onMouseEnter={() => hoverIn(controlIcon)}
        onMouseLeave={() => hoverOut(controlIcon)}
      >
        <a className="text-pill">
          <img src={playIcon} className="pill-icon" />
          Play Store
        </a>

        <motion.button className="icon-pill" animate={controlIcon}>
          <img src={playIcon} />
        </motion.button>
      </div>
    </div>
  );
}
