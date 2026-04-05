"use client";

import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function useMagnet(strength = 0.4) {
  const ref = useRef<HTMLButtonElement>(null);
  const xSetter = useRef<gsap.QuickToFunc | null>(null);
  const ySetter = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (ref.current) {
      xSetter.current = gsap.quickTo(ref.current, "x", { duration: 0.4, ease: "power3.out" });
      ySetter.current = gsap.quickTo(ref.current, "y", { duration: 0.4, ease: "power3.out" });
    }
  }, { scope: ref });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !xSetter.current || !ySetter.current) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xSetter.current((e.clientX - cx) * strength);
    ySetter.current((e.clientY - cy) * strength);
  }, [strength]);

  const onLeave = useCallback(() => {
    xSetter.current?.(0);
    ySetter.current?.(0);
  }, []);

  return { ref, onMove, onLeave };
}

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const magnet1 = useMagnet(0.35);
  const magnet2 = useMagnet(0.35);

  const [hoveringName, setHoveringName] = useState(false);

  const { contextSafe } = useGSAP(() => {
    // Parallax background
    gsap.to(".hero-bg-orbs", {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 300,
      ease: "none"
    });

    // Opacity fade main content
    gsap.to(".hero-content-wrap", {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=500",
        scrub: true,
      },
      opacity: 0,
      ease: "none"
    });

    // Intro Entrance Animations
    gsap.from(".hero-tag", {
      opacity: 0, scale: 0.9, duration: 0.8, delay: 0.5, ease: "power2.out"
    });

    gsap.from(".hero-title", {
      y: 50, opacity: 0, duration: 1, delay: 0.6, ease: "power4.out"
    });

    gsap.from(".hero-hover-txt", {
      opacity: 0, duration: 1, delay: 1
    });

    gsap.from(".hero-desc", {
      y: 20, opacity: 0, duration: 0.8, delay: 0.8, ease: "power2.out"
    });

    gsap.from(".hero-buttons", {
      y: 20, opacity: 0, duration: 0.8, delay: 0.9, ease: "power2.out"
    });
  }, { scope: container });

  const setX = useRef<gsap.QuickToFunc | null>(null);
  const setY = useRef<gsap.QuickToFunc | null>(null);
  const setRot = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (imageRef.current) {
      setX.current = gsap.quickTo(imageRef.current, "x", { duration: 0.4, ease: "power3.out" });
      setY.current = gsap.quickTo(imageRef.current, "y", { duration: 0.4, ease: "power3.out" });
      setRot.current = gsap.quickTo(imageRef.current, "rotation", { duration: 0.4, ease: "power3.out" });
    }
  }, { scope: container });

  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (setX.current && setY.current && setRot.current) {
      if (!hasMoved) setHasMoved(true);

      // Center the 320x480 card on the mouse
      setX.current(e.clientX - 160);
      setY.current(e.clientY - 240);
      
      const rot = ((e.clientX / window.innerWidth) * 14) - 7;
      setRot.current(rot);
    }
  });

  useGSAP(() => {
    if (imageRef.current) {
      let targetOpacity = 0;
      let targetScale = 0.8;
      let targetBlur = "blur(20px)";

      if (hoveringName) {
        targetOpacity = 1;
        targetScale = 1.05;
        targetBlur = "blur(0px)";
      } else if (hasMoved) {
        targetOpacity = 0.15; // Very faint trace follow
        targetScale = 0.9;
        targetBlur = "blur(10px)";
      }

      gsap.to(imageRef.current, {
        opacity: targetOpacity,
        scale: targetScale,
        filter: targetBlur,
        duration: 0.6,
        ease: "power3.out"
      });
    }
  }, { dependencies: [hoveringName, hasMoved], scope: container });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { href: "https://www.linkedin.com/in/decodersifat", label: "LinkedIn", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    )},
    { href: "https://github.com/decodersifat", label: "GitHub", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
    )}
  ];

  return (
    <section 
      id="home" 
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center bg-background overflow-hidden px-6 pt-20"
    >
      {/* Background Orbs */}
      <div className="hero-bg-orbs absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-[#e53e00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#e53e00]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_80%)]" />
      </div>

      {/* Smooth Mouse-Following Portrait */}
      <div
        ref={imageRef}
        className="pointer-events-none fixed top-0 left-0 z-30 w-80 h-[480px] overflow-hidden flex items-center justify-center rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-card border border-white/10"
        style={{ opacity: 0, transform: "scale(0.8) rotate(0deg)" }}
      >
        <Image
          src="/hero-profile.png"
          alt="MD Sifat Hossain"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      </div>

      <div className="hero-content-wrap relative z-20 max-w-7xl mx-auto w-full flex flex-col items-start">
        
        {/* Monospaced Intro tag */}
        <div className="hero-tag mb-8 inline-flex items-center gap-3 border border-border rounded-full px-5 py-2 backdrop-blur-sm bg-foreground/5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)" }}>
            Full-Stack &amp; AI/ML Engineer · Dhaka, Bangladesh
          </span>
        </div>

        {/* Massive Name Typography */}
        <div 
          className="relative z-40 cursor-crosshair w-full"
          onMouseEnter={() => setHoveringName(true)}
          onMouseLeave={() => setHoveringName(false)}
        >
          <h1
            className="hero-title text-foreground uppercase leading-[0.8] tracking-tighter"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(4rem, 15vw, 15rem)" }}
          >
            Sifat
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Hossain</span>
          </h1>
          <p
            className="hero-hover-txt absolute right-0 top-1/2 -rotate-90 origin-top-right text-muted text-xs tracking-[0.4em] uppercase hidden lg:block"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Hover the text
          </p>
        </div>

        {/* Bottom Bar: Bio & CTAs */}
        <div className="w-full mt-16 lg:mt-24 flex flex-col lg:flex-row items-end justify-between gap-10">
          <p className="hero-desc max-w-md text-foreground/80 text-base lg:text-lg leading-relaxed dark:mix-blend-difference">
            Enthusiastic about building a career in tech &amp; CS research — with real hands-on experience in full-stack development, AI/ML projects, and competitive problem-solving.
          </p>

          <div className="hero-buttons flex items-center gap-4 dark:mix-blend-difference">
            <button
              ref={magnet1.ref}
              onMouseMove={magnet1.onMove}
              onMouseLeave={magnet1.onLeave}
              onClick={() => scrollTo("projects")}
              className="px-8 py-4 bg-foreground text-background font-semibold text-sm uppercase tracking-widest rounded-full hover:bg-foreground/80 transition-colors flex items-center gap-2"
              data-cursor-hover
            >
              Selected Works <ArrowRight size={16} />
            </button>
            <button
              ref={magnet2.ref}
              onMouseMove={magnet2.onMove}
              onMouseLeave={magnet2.onLeave}
              onClick={() => scrollTo("contact")}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
              aria-label="Contact"
              data-cursor-hover
            >
              <Mail size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

