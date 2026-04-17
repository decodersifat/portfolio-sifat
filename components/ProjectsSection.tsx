"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Layers,
  Stethoscope,
  Gamepad2,
  Briefcase,
  Factory,
  X,
  ExternalLink,
  Globe,
} from "lucide-react";
import { SectionHeader } from "./AboutSection";
import TiltCard from "./TiltCard";
import Image from "next/image";

function GithubIcon(props: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 24} height={props.size || 24}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Project = any;

const projectIcons: Record<string, React.ReactNode> = {
  "CentWorkers – Job Board Platform": <Briefcase className="text-accent w-8 h-8" />,
  "PlayOn – Gaming Discovery Hub": <Gamepad2 className="text-accent w-8 h-8" />,
  "GarmentFlow – Factory Management System": <Factory className="text-accent w-8 h-8" />,
  "Hello Doctor – AI-Powered Diagnostic Tool": <Stethoscope className="text-accent w-8 h-8" />,
};

const accentColors = [
  "from-accent/20 via-accent/5 to-transparent",
  "from-blue-500/15 via-blue-500/5 to-transparent",
  "from-purple-500/15 via-purple-500/5 to-transparent",
  "from-emerald-500/15 via-emerald-500/5 to-transparent",
];

/* ── Detail Modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        {project.image && (
          <div className="relative w-full h-52 flex-shrink-0 overflow-hidden rounded-t-3xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-5 p-6 md:p-8">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl border border-border bg-background/80 flex items-center justify-center flex-shrink-0">
                {projectIcons[project.title] ?? <Layers className="text-accent w-6 h-6" />}
              </div>
              <h2
                className="text-foreground text-xl md:text-2xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full border border-border bg-background/50 flex items-center justify-center text-muted hover:text-foreground hover:bg-accent/10 hover:border-accent/50 transition-all"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Description */}
          <p className="text-muted text-sm leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div>
            <p className="text-accent text-[10px] uppercase tracking-[0.15em] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-background border border-border text-foreground/70 text-[10px] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deployment badge */}
          {"deployment" in project && project.deployment && (
            <p className="text-muted/70 text-[11px] tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
              🚀 {project.deployment}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            {"liveLink" in project && project.liveLink && (
              <a
                href={project.liveLink as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors shadow-lg"
              >
                <Globe size={14} />
                Live Demo
              </a>
            )}
            {"frontendRepo" in project && project.frontendRepo && (
              <a
                href={project.frontendRepo as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background/50 text-foreground text-sm hover:border-accent/50 hover:bg-accent/5 transition-colors"
              >
                <GithubIcon size={14} />
                {("backendRepo" in project && project.backendRepo) ? "Frontend Repo" : "GitHub"}
              </a>
            )}
            {"backendRepo" in project && project.backendRepo && (
              <a
                href={project.backendRepo as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background/50 text-foreground text-sm hover:border-accent/50 hover:bg-accent/5 transition-colors"
              >
                <GithubIcon size={14} />
                Backend Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function ProjectsSection({ projects }: { projects: any[] }) {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useGSAP(() => {
    const wrap = pinWrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
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
    <>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <section id="projects" className="relative z-30 bg-background">
        {/* Non-pinned header */}
        <div className="max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-4 md:pb-6">
          <SectionHeader num="04" label="Selected Works" title="Projects" />
          <p className="text-muted text-xs md:text-sm -mt-4 md:-mt-6" style={{ fontFamily: "var(--font-mono)" }}>
            // click a card to explore →
          </p>
        </div>

        {/* Pin wrapper */}
        <div ref={pinWrapRef} className="relative w-full md:h-screen" style={{ minHeight: "auto" }}>
          {/* Horizontal track */}
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row md:absolute md:top-0 md:left-0 md:h-full items-center gap-5 md:gap-6 px-5 md:px-16 will-change-transform pb-8 md:pb-0"
            style={{ width: "max-content" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="proj-card flex-shrink-0 w-[90vw] md:w-[560px] lg:w-[620px] h-[440px] md:h-[500px]"
              >
                <TiltCard
                  className="w-full h-full p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] border border-border bg-card/95 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group cursor-pointer"
                  intensity={4}
                >
                  {/* Clickable overlay for modal */}
                  <button
                    className="absolute inset-0 z-30 w-full h-full"
                    aria-label={`View details for ${project.title}`}
                    onClick={() => setSelected(project)}
                  />

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

                  {/* Gradient accent */}
                  <div
                    className={`absolute top-0 right-0 w-[60%] h-[280px] bg-gradient-to-bl ${accentColors[i % accentColors.length]} pointer-events-none rounded-bl-[4rem] z-10 opacity-50`}
                  />

                  {/* Number watermark */}
                  <span
                    className="absolute bottom-4 right-6 text-[7rem] font-bold leading-none text-foreground/5 select-none pointer-events-none z-10"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top row: icon + live link button */}
                  <div className="flex items-start justify-between gap-4 relative z-20">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-background/80 backdrop-blur-md border border-border flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors shadow-lg">
                      {projectIcons[project.title] ?? <Layers className="text-accent w-6 h-6 md:w-7 md:h-7" />}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Live link button */}
                      {"liveLink" in project && project.liveLink && (
                        <a
                          href={project.liveLink as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/50 bg-accent/10 text-accent text-[10px] uppercase tracking-wider hover:bg-accent hover:text-white transition-all shadow"
                          style={{ fontFamily: "var(--font-mono)" }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={11} />
                          Live
                        </a>
                      )}
                      {/* Expand button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(project); }}
                        className="relative z-40 w-9 h-9 rounded-full border border-border bg-background/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all shadow-lg"
                        aria-label="View project details"
                      >
                        <ArrowUpRight size={15} strokeWidth={1.5} />
                      </button>
                    </div>
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
                    {project.stack?.slice(0, 5).map((tech: string) => (
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
                href="https://github.com/decodersifat?tab=repositories"
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
    </>
  );
}
