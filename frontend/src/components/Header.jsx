import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Header() {
  const iconRef = useRef(null);
  const [icon, setIcon] = useState("🧠");

  // Unique AI-style icons
  const icons = ["🧠", "💡", "🤖", "✨", "🪄"];

  // Cycle icons every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIcon = icons[Math.floor(Math.random() * icons.length)];
      setIcon(nextIcon);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Floating left ↔ right animation with slight rotate
  useEffect(() => {
    gsap.to(iconRef.current, {
      x: 12,
      y: -6,
      rotation: 10,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 50%",
    });
  }, []);

  // Hover effect: scale + glow
  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.3,
      duration: 0.3,
      textShadow: "0 0 12px #7f5af0",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      scale: 1.0,
      duration: 0.3,
      textShadow: "0 0 0px #000000",
    });
  };

  return (
    <header className="flex items-center gap-4 px-6 py-4
      bg-black/40 backdrop-blur-md text-white font-semibold text-lg relative">

      {/* AI Icon */}
      <span
        ref={iconRef}
        className="text-4xl inline-block select-none cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {icon}
      </span>

      {/* Header Text */}
      <span className="tracking-wide text-xl">AI Chatbot</span>
    </header>
  );
}
