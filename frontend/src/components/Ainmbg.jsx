import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Ainmbg = () => {
  const orbsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      orbsRef.current.forEach((orb, i) => {
        gsap.to(orb, {
          x: () => gsap.utils.random(-360, 360),
          y: () => gsap.utils.random(-250, 250),
          scale: () => gsap.utils.random(0.3, 0.15),
          opacity: () => gsap.utils.random(0.3, 0.9),
          duration: () => gsap.utils.random(8, 14),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* Premium AI Glow */}
        <radialGradient id="aiGlow">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#5eead4" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#6366f1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>

        <filter id="softBlur">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>

      {[...Array(6)].map((_, i) => (
        <circle
          key={i}
          ref={(el) => (orbsRef.current[i] = el)}
          cx={gsap.utils.random(200, 800)}
          cy={gsap.utils.random(200, 600)}
          r={gsap.utils.random(100, 200)}
          fill="url(#aiGlow)"
          filter="url(#softBlur)"
        />
      ))}
    </svg>
  );
};

export default Ainmbg;
