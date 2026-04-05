"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function TextReveal({ text, className = "", delay = 0, style }: TextRevealProps) {
  const words = text.split(" ");
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.from(".reveal-word", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        once: true,
      },
      y: 15,
      opacity: 0,
      duration: 0.8,
      stagger: 0.015,
      delay: delay * 0.1,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, idx) => (
        <span key={idx} className="reveal-word mr-1.5 mb-1 inline-block">
          {word}
        </span>
      ))}
    </p>
  );
}


