"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const [isRendered, setIsRendered] = useState(true);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsRendered(false)
    });

    // Animate text in
    tl.from(".preloader-text", {
      y: "100%",
      duration: 0.8,
      ease: "power3.out"
    });

    // Hold it for a moment
    tl.to({}, { duration: 0.4 });

    // Animate text out
    tl.to(".preloader-text", {
      y: "-100%",
      duration: 0.6,
      ease: "power3.in"
    });

    // Animate background up
    tl.to(container.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut"
    }, "-=0.4");
  }, { scope: container });

  if (!isRendered) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="overflow-hidden">
        <h1
          className="preloader-text text-accent text-7xl md:text-9xl uppercase mx-auto"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.02em", transform: "translateY(0%)" }}
        >
          SIFAT
        </h1>
      </div>
    </div>
  );
}


