"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/data";
import { ArrowUpRight, Layers, Stethoscope, BookOpen, Brain } from "lucide-react";
import { SectionHeader } from "./AboutSection";
import TiltCard from "./TiltCard";

import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const projectIcons: Record<string, React.ReactNode> = {
  "Hello Doctor – AI-Powered Diagnostic Tool": <Stethoscope className="text-accent w-10 h-10" />,
  "BookiePedia – Digital Book Sharing Platform": <BookOpen className="text-accent w-10 h-10" />,
  "KNN Model – Breast Cancer Prediction": <Brain className="text-accent w-10 h-10" />,
};

const accentColors = [
  "from-accent/20 via-accent/5 to-transparent",
  "from-blue-500/15 via-blue-500/5 to-transparent",
  "from-purple-500/15 via-purple-500/5 to-transparent",
];

export default function ProjectsSection() {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrap = pinWrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Amount to scroll: full width of track minus one screen width
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".proj-card", {
        scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    });

    return () => mm.revert();
  }, { scope: pinWrapRef });

  return (
    <section id="projects" className="relative z-30 bg-background">
      {/* Non-pinned header */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-4 md:pb-6">
        <SectionHeader num="03" label="Selected Works" title="Projects" />
        <p className="text-muted text-xs md:text-sm -mt-4 md:-mt-6" style={{ fontFamily: "var(--font-mono)" }}>
          // scroll to explore →
        </p>
      </div>

      {/* Pin wrapper — This is what GSAP pins to the viewport */}
      <div ref={pinWrapRef} className="relative w-full md:h-screen" style={{ minHeight: "auto" }}>
        {/* Horizontal track — overflows off-screen to the right on desktop, stacks on mobile */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:absolute md:top-0 md:left-0 md:h-full items-center gap-5 md:gap-6 px-5 md:px-16 will-change-transform pb-8 md:pb-0"
          style={{ width: "max-content" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="proj-card flex-shrink-0 w-[90vw] md:w-[560px] lg:w-[620px] h-[420px] md:h-[480px]"
            >
              <TiltCard
                className="w-full h-full p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] border border-border bg-card/95 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group"
                intensity={4}
              >
                {/* Project Image Preview */}
                {project.image && (
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                  </div>
                )}

                {/* Coloured gradient accent */}
                <div
                  className={`absolute top-0 right-0 w-[60%] h-[280px] bg-gradient-to-bl ${accentColors[i % accentColors.length]} pointer-events-none rounded-bl-[4rem] z-10 opacity-50`}
                />

                {/* Large number watermark */}
                <span
                  className="absolute bottom-4 right-6 text-[7rem] font-bold leading-none text-foreground/5 select-none pointer-events-none z-10"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Top row: icon + link */}
                <div className="flex items-start justify-between gap-4 relative z-20">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-background/80 backdrop-blur-md border border-border flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors shadow-lg">
                    {projectIcons[project.title] ?? <Layers className="text-accent w-6 h-6 md:w-8 md:h-8" />}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-border bg-background/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all flex-shrink-0 shadow-lg"
                      aria-label="View Project"
                    >
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </a>
                  )}
                </div>

                {/* Middle: title, tech line, description */}
                <div className="relative z-10 flex-1 flex flex-col justify-center gap-2 md:gap-3 my-3 md:my-4">
                  <h3
                    className="text-foreground text-lg md:text-xl lg:text-2xl font-bold tracking-tight leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-accent text-[10px] md:text-[11px] uppercase tracking-[0.15em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {project.stack.slice(0, 3).join(" · ")}
                  </p>
                  <p
                    className="text-muted text-[13px] md:text-sm leading-relaxed line-clamp-3"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Stack badges */}
                <div className="relative z-10 flex flex-wrap gap-1.5 md:gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 md:px-3 py-0.5 md:py-1 rounded-full bg-background border border-border text-foreground/70 text-[9px] md:text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}

          {/* End CTA */}
          <div className="proj-card flex-shrink-0 w-full md:w-[240px] py-8 md:py-0 md:h-full flex items-center justify-center">
            <a
              href="https://github.com/decodersifat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 text-center group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <ArrowUpRight size={24} className="text-muted group-hover:text-accent transition-colors" />
              </div>
              <p
                className="text-muted text-[11px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                View all on GitHub
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
