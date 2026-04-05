"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "rgba(229,62,0,0.25)",
  intensity = 12,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const [hovered, setHovered] = useState(false);

  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    xTo.current = gsap.quickTo(ref.current, "rotationY", { ease: "power3", duration: 0.5 });
    yTo.current = gsap.quickTo(ref.current, "rotationX", { ease: "power3", duration: 0.5 });
    
    gsap.set(ref.current, { transformPerspective: 800, transformStyle: "preserve-3d" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const clientX = e.clientX - left;
    const clientY = e.clientY - top;
    
    glowRef.current.style.background = `radial-gradient(400px circle at ${clientX}px ${clientY}px, ${glowColor}, transparent 80%)`;
    
    const rx = ((clientY / height) - 0.5) * -intensity;
    const ry = ((clientX / width) - 0.5) * intensity;
    
    xTo.current?.(ry);
    yTo.current?.(rx);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}


