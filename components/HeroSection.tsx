"use client";

import { useRef, useCallback } from "react";
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
  const magnet1 = useMagnet(0.35);
  const magnet2 = useMagnet(0.35);

  useGSAP(() => {
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
      opacity: 0, scale: 0.9, duration: 0.8, delay: 0.2, ease: "power2.out"
    });

    gsap.from(".hero-title", {
      y: 50, opacity: 0, duration: 1, delay: 0.3, ease: "power4.out"
    });

    gsap.from(".hero-desc", {
      y: 20, opacity: 0, duration: 0.8, delay: 0.5, ease: "power2.out"
    });

    gsap.from(".hero-buttons", {
      y: 20, opacity: 0, duration: 0.8, delay: 0.6, ease: "power2.out"
    });

    // Profile photo entrance
    gsap.from(".hero-profile", {
      scale: 0.8, opacity: 0, duration: 1, delay: 0.4, ease: "back.out(1.2)"
    });

    // Hand drawn circle animation
    gsap.fromTo("#hand-drawn-circle", 
      { strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", repeat: -1, yoyo: true }
    );
    
    // Continuous rotation for the SVG
    gsap.to(".drawn-circle-svg", {
      rotation: 360,
      duration: 25,
      ease: "none",
      repeat: -1
    });

  }, { scope: container });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section 
      id="home" 
      ref={container}
      className="relative min-h-[85dvh] lg:min-h-[100dvh] flex flex-col justify-center bg-background overflow-hidden px-5 md:px-6 lg:px-10 pb-10 md:pb-0 md:pt-16 lg:pt-20"
    >
      {/* Background Orbs */}
      <div className="hero-bg-orbs absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-[#e53e00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#e53e00]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_80%)]" />
      </div>

      <div className="hero-content-wrap relative z-20 max-w-7xl mx-auto w-full flex flex-col items-start -mt-8 md:mt-0">
        
        {/* Monospaced Intro tag */}
        <div className="hero-tag mb-6 md:mb-8 inline-flex items-center gap-2 md:gap-3 border border-border rounded-full px-4 md:px-5 py-2.5 backdrop-blur-sm bg-foreground/5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
          <span className="text-accent text-[11px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
            Full-Stack Developer
            <span className="block md:hidden">Dhaka, Bangladesh</span>
          </span>
        </div>

        {/* Title and Profile Photo Layout */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          
          {/* Massive Name Typography */}
          <div className="relative z-40 w-full lg:w-auto">
            <h1
              className="hero-title text-foreground uppercase leading-[0.85] tracking-tighter font-extrabold"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3.5rem, 12vw, 14rem)", letterSpacing: "-0.04em" }}
            >
              Sifat
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">Hossain</span>
            </h1>
          </div>

          {/* Static Circular Profile Photo */}
          <div className="hero-profile relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 mx-auto lg:mx-0">
             {/* Profile image in circle */}
             <div className="absolute inset-3 rounded-full overflow-hidden bg-card border border-border shadow-2xl">
                <Image 
                  src="/hero-profile.png" 
                  fill 
                  className="object-cover scale-110" 
                  alt="MD Sifat Hossain" 
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
             </div>
             
             {/* Hand drawn circle SVG */}
             <svg 
               className="drawn-circle-svg absolute inset-0 w-full h-full text-accent pointer-events-none" 
               viewBox="0 0 100 100" 
               fill="none"
             >
               <path 
                 id="hand-drawn-circle"
                 d="M 50, 2 
                    C 75, 4, 96, 25, 96, 50 
                    C 95, 78, 73, 98, 50, 98 
                    C 24, 96, 4, 76, 4, 50 
                    C 5, 23, 26, 2, 50, 2 Z"
                 stroke="currentColor" 
                 strokeWidth="1.5" 
                 strokeLinecap="round" 
                 strokeDasharray="300"
                 strokeDashoffset="300"
                 style={{ filter: "drop-shadow(0 0 8px rgba(229,62,0,0.5))" }}
               />
             </svg>
          </div>
        </div>

        {/* Bottom Bar: Bio & CTAs */}
        <div className="w-full mt-10 md:mt-16 lg:mt-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 md:gap-10">
          <p className="hero-desc max-w-md text-foreground/80 text-[15px] md:text-base lg:text-lg leading-relaxed">
            Enthusiastic about building a career in tech &amp; CS research — with real hands-on experience in full-stack development, AI/ML projects, and competitive problem-solving.
          </p>

          <div className="hero-buttons flex items-center gap-3 md:gap-4">
            <button
              ref={magnet1.ref}
              onMouseMove={magnet1.onMove}
              onMouseLeave={magnet1.onLeave}
              onClick={() => scrollTo("projects")}
              className="px-5 md:px-8 py-3 md:py-4 bg-foreground text-background font-semibold text-xs md:text-sm uppercase tracking-widest rounded-full hover:bg-foreground/80 transition-all flex items-center gap-2"
              data-cursor-hover
            >
              Selected Works <ArrowRight size={16} />
            </button>
            <button
              ref={magnet2.ref}
              onMouseMove={magnet2.onMove}
              onMouseLeave={magnet2.onLeave}
              onClick={() => scrollTo("contact")}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all"
              aria-label="Contact"
              data-cursor-hover
            >
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
