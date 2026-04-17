"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "./AboutSection";
import TiltCard from "./TiltCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function TimelineDot() {
  return (
    <div className="absolute left-0 top-6 w-7 h-7">
      <div className="dot-pulse absolute inset-0 rounded-full border border-accent/40 opacity-60" style={{ transformOrigin: "center" }} />
      <div className="dot-inner w-7 h-7 rounded-full bg-background border-2 border-accent flex items-center justify-center scale-0">
        <span className="dot-core w-2 h-2 rounded-full bg-accent scale-0" />
      </div>
    </div>
  );
}

function AnimatedLine() {
  return (
    <div className="absolute left-3 top-3 bottom-3 w-px overflow-hidden">
      <div className="animated-line w-full bg-gradient-to-b from-accent via-accent/40 to-transparent h-0" />
    </div>
  );
}

export default function ExperienceSection({ experiences }: { experiences: any[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".animated-line", {
      scrollTrigger: {
        trigger: ".animated-line",
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      },
      height: "100%",
      ease: "none"
    });

    const rows = gsap.utils.toArray<HTMLElement>(".exp-row");
    rows.forEach((row, i) => {
      gsap.from(row, {
        scrollTrigger: { trigger: row, start: "top 85%", once: true },
        opacity: 0, x: -30, duration: 0.55, ease: "power2.out"
      });

      const dotInner = row.querySelector(".dot-inner");
      const dotCore = row.querySelector(".dot-core");
      const dotPulse = row.querySelector(".dot-pulse");

      gsap.to(dotInner, {
         scrollTrigger: { trigger: row, start: "top 85%", once: true },
         scale: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.7)"
      });
      gsap.to(dotCore, {
         scrollTrigger: { trigger: row, start: "top 85%", once: true },
         scale: 1, duration: 0.3, delay: 0.3, ease: "back.out(1.7)"
      });
      
      gsap.to(dotPulse, {
         scrollTrigger: { trigger: row, start: "top 85%" },
         scale: 2, opacity: 0, duration: 1.2, repeat: -1, repeatDelay: 2, ease: "power2.out"
      });

      const badge = row.querySelector(".exp-badge");
      gsap.from(badge, {
        scrollTrigger: { trigger: row, start: "top 85%", once: true },
        opacity: 0, scale: 0.8, duration: 0.4, delay: 0.2
      });

      const bullets = gsap.utils.toArray(row.querySelectorAll(".exp-bullet"));
      gsap.from(bullets, {
        scrollTrigger: { trigger: row, start: "top 85%", once: true },
        opacity: 0, x: -10, duration: 0.4, stagger: 0.05, delay: 0.3
      });
    });

    const bulletIcons = gsap.utils.toArray<HTMLElement>(".exp-bullet-icon");
    bulletIcons.forEach(icon => {
      icon.addEventListener("mouseenter", () => gsap.to(icon, { backgroundColor: "var(--accent)", scale: 1.5, duration: 0.2 }));
      icon.addEventListener("mouseleave", () => gsap.to(icon, { backgroundColor: "color-mix(in srgb, var(--accent) 60%, transparent)", scale: 1, duration: 0.2 }));
    });
  }, { scope: container });

  return (
    <section id="experience" className="bg-background py-16 md:py-24 px-5 md:px-6" ref={container}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="03" label="My Journey" title="Selected Awards & Achievements" />

        <div className="relative">
          <AnimatedLine />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-row relative pl-10 md:pl-12">
                <TimelineDot />

                <TiltCard
                  className="p-5 md:p-6 rounded-xl border border-border bg-card"
                  intensity={6}
                  glowColor="rgba(229,62,0,0.15)"
                >
                  <div className="mb-3 md:mb-4">
                    <span
                      className="exp-badge inline-block px-3 py-1 rounded border border-accent/50 bg-accent/10 text-accent text-[11px] tracking-[0.12em] uppercase"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-foreground font-bold text-[15px] md:text-base mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                    {exp.title}
                  </h3>
                  <p className="text-accent text-[11px] md:text-xs tracking-[0.1em] uppercase mb-4 md:mb-5" style={{ fontFamily: "var(--font-mono)" }}>
                    {exp.company}
                  </p>

                  <ul className="space-y-2">
                    {exp.bullets?.map((b: string, j: number) => (
                      <li
                        key={j}
                        className="exp-bullet flex items-start gap-2.5 text-foreground/80 text-[13px] md:text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <span className="exp-bullet-icon w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 flex-shrink-0 transition-colors" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


