import React from "react";
import "./CircularText.css";

const CircularText = ({
  text,
  radius,
  animate = false, // controls spinning of the text ring
  center = null,
  animateCenter = false, // keep center static by default; opt-in to spin with text
}) => {
  const characters = text.split("");
  const totalAngle = 360;
  const angleIncrement = totalAngle / characters.length;

  const diameter = radius ? radius * 2 : undefined;

  return (
    <div
      className="circle-container"
      style={{
        // Use prop as the max value of a responsive clamp so it can shrink on smaller screens
        // "--circle-size": diameter ? `clamp(120px, 14vw, ${diameter}px)` : undefined,
      }}
    >
      <div className={`circle-text ${animate ? "spin" : ""}`}>
        {characters.map((char, index) => {
          const rotationAngle = index * angleIncrement;

          return (
            <span
              key={index}
              className="char"
              style={{
                transform: `rotate(${rotationAngle}deg) translate(calc(var(--circle-size) / 2)) rotate(90deg)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
      {center && (
        <div className={`circle-center ${animateCenter ? "spin" : ""}`}>
          {center}
        </div>
      )}
    </div>
  );
};

export default CircularText;
