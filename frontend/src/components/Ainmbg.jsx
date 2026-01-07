import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Ainmbg = ({ isTyping }) => {
  const orbsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      orbsRef.current.forEach((orb, i) => {
        // Normal floating animation
        const floatAnim = gsap.to(orb, {
          x: () => gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
          y: () => gsap.utils.random(-window.innerHeight / 2, window.innerHeight / 2),
          scale: () => gsap.utils.random(0.15, 0.3),
          opacity: () => gsap.utils.random(0.3, 0.9),
          duration: () => gsap.utils.random(8, 14),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });

        // Pulse effect when AI is typing
        if (isTyping) {
          gsap.to(orb, {
            scale: "+=0.1",
            opacity: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        } else {
          floatAnim.play(); // Resume normal animation
        }
      });
    });

    return () => ctx.revert();
  }, [isTyping]);

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <defs>
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

      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          ref={(el) => (orbsRef.current[i] = el)}
          cx={gsap.utils.random(0, 1000)}
          cy={gsap.utils.random(0, 1000)}
          r={gsap.utils.random(100, 200)}
          fill="url(#aiGlow)"
          filter="url(#softBlur)"
        />
      ))}
    </svg>
  );
};

export default Ainmbg;
