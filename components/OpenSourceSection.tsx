"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { openSourceProjects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./AboutSection";
import TiltCard from "./TiltCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const langDotColors: Record<string, string> = {
  "Python": "#3776ab",
  "JavaScript": "#f9a825",
  "TypeScript": "#3178c6",
  "C#": "#9c27b0",
};

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-foreground/80">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function OpenSourceSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".os-p", {
      scrollTrigger: { trigger: container.current, start: "top 85%", once: true },
      opacity: 0, delay: 0.2, duration: 0.5
    });

    const cards = gsap.utils.toArray<HTMLElement>(".os-card");
    gsap.from(cards, {
      scrollTrigger: { trigger: ".os-grid", start: "top 85%", once: true },
      opacity: 0, y: 28, scale: 0.94, duration: 0.45, stagger: 0.07, ease: "power2.out"
    });

    const langDots = gsap.utils.toArray<HTMLElement>(".lang-dot");
    langDots.forEach((dot, i) => {
      gsap.to(dot, { scale: 1.4, duration: 1.25, repeat: -1, yoyo: true, delay: i * 0.3, ease: "power1.inOut" });
    });

    gsap.from(".view-all-btn", {
      scrollTrigger: { trigger: ".view-all-btn", start: "top 95%", once: true },
      opacity: 0, delay: 0.3, duration: 0.6
    });
  }, { scope: container });

  return (
    <section id="opensource" className="bg-background py-16 md:py-24 px-5 md:px-6" ref={container}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="05" label="Community" title="Open Source" />

        <p
          className="os-p text-muted text-[13px] md:text-sm mb-8 md:mb-12 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Multi-tenant services, ML models, and full-stack tooling — built to learn, built to ship.
        </p>

        {/* 4-col grid */}
        <div className="os-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {openSourceProjects.map((repo, i) => (
            <div key={repo.name} className="os-card">
              <TiltCard className="p-4 md:p-5 rounded-xl border border-border bg-card flex flex-col h-full" intensity={10}>
                <a
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col h-full"
                  data-cursor-hover
                >
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <GithubIcon />
                    <span
                      className="text-foreground font-semibold text-[13px] md:text-xs hover:text-accent transition-colors"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {repo.name}
                    </span>
                  </div>
                  <p className="text-muted text-[13px] md:text-xs leading-relaxed flex-1 mb-3 md:mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="lang-dot w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: langDotColors[repo.lang] ?? "#888", display: "inline-block" }}
                    />
                    <span className="text-[11px] text-muted uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-mono)" }}>
                      {repo.lang}
                    </span>
                  </div>
                </a>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="view-all-btn">
          <a
            href="https://github.com/decodersifat?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground text-[11px] md:text-xs tracking-[0.1em] uppercase transition-colors border border-border hover:border-accent/30 px-4 py-2.5 rounded-lg"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            View All Repositories
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}


