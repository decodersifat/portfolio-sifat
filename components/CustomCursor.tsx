"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cursorRef.current || !trailRef.current) return;

    gsap.set([cursorRef.current, trailRef.current], { xPercent: -50, yPercent: -50 });

    const cursorXTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const cursorYTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });
    
    const trailXTo = gsap.quickTo(trailRef.current, "x", { duration: 0.4, ease: "power3" });
    const trailYTo = gsap.quickTo(trailRef.current, "y", { duration: 0.4, ease: "power3" });

    const move = (e: MouseEvent) => {
      cursorXTo(e.clientX);
      cursorYTo(e.clientY);
      trailXTo(e.clientX);
      trailYTo(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const enter = () => setIsVisible(true);
    const leave = () => setIsVisible(false);
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("a, button, [data-cursor-hover]");
      setIsHovering(!!hoverable);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-all duration-300"
        style={{
          width: isHovering ? 44 : isClicking ? 20 : 32,
          height: isHovering ? 44 : isClicking ? 20 : 32,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-full h-full rounded-full border border-accent transition-opacity duration-300"
          style={{ opacity: isHovering ? 0.9 : 0.5 }}
        />
      </div>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-300"
        style={{
          width: isClicking ? 6 : 5,
          height: isClicking ? 6 : 5,
          backgroundColor: isHovering ? "#ff4400" : "#e53e00",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}


