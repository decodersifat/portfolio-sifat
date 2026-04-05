"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { publications } from "@/lib/data";
import { Briefcase, FolderOpen, Award, FileText, CheckCircle2 } from "lucide-react";
import TiltCard from "./TiltCard";
import TextReveal from "./TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATS = [
  { end: "3.94", label: "Last Sem CGPA", icon: <Briefcase className="text-accent w-6 h-6" /> },
  { end: "3+", label: "Projects", icon: <FolderOpen className="text-accent w-6 h-6" /> },
  { end: "2", label: "Awards", icon: <Award className="text-accent w-6 h-6" /> },
  { end: "AI/ML", label: "Speciality", icon: <FileText className="text-accent w-6 h-6" /> },
];

const SKILLS = [
  "Python · TensorFlow · Keras",
  "scikit-learn · OpenCV · Pandas",
  "Django · Express.js · Node.js",
  "React · Tailwind CSS · PostgreSQL",
  "MongoDB · MySQL · Git · GitHub",
  "Java · C · C++ · JavaScript",
];

export function SectionHeader({ num, label, title }: { num: string; label: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.from(".heading-num", {
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      opacity: 0, x: -40, duration: 0.7, ease: "power2.out"
    });

    gsap.from(".heading-label", {
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      opacity: 0, y: 10, duration: 0.4, delay: 0.1
    });

    gsap.from(".heading-title", {
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      y: 50, opacity: 0, duration: 0.6, delay: 0.15, ease: "power2.out"
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex items-end gap-6 mb-16 overflow-hidden">
      <div className="heading-num">
        <span className="section-num text-[4rem] text-foreground/10">{num}</span>
      </div>
      <div className="pb-2">
        <p className="heading-label section-label mb-1 text-accent">
          {label}
        </p>
        <h2 className="heading-title section-title text-5xl text-foreground">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
    gsap.from(cards, {
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

    const icons = gsap.utils.toArray<HTMLElement>(".bento-icon");
    icons.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.1, rotation: 5, duration: 0.2 }));
      el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, rotation: 0, duration: 0.2 }));
    });
  }, { scope: container });

  return (
    <section id="about" className="bg-background py-24 px-6 relative z-30" ref={container}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="01" label="About Me" title="The Dashboard" />

        {/* BENTO GRID */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          
          {/* Main Bio Box (Large) */}
          <div className="bento-card md:col-span-3 md:row-span-2">
            <TiltCard className="h-full w-full p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-md flex flex-col justify-between group">
              <h3 className="text-muted text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                // Identity
              </h3>
              <div className="space-y-6 flex-1 pr-6">
                <TextReveal
                  text="I build intelligent systems and full-stack platforms — bridging AI/ML research with modern web engineering."
                  className="text-foreground text-2xl md:text-4xl leading-snug font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
                <TextReveal
                  delay={0.2}
                  text="Strong focus on Python, Django, React, and data-driven solutions. CSE undergrad at Northern University Bangladesh pushing the boundaries of what software can do."
                  className="text-muted text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
              </div>
            </TiltCard>
          </div>

          {/* Stats Boxes 1 & 2 */}
          {STATS.slice(0, 2).map((stat, i) => (
            <div key={i} className="bento-card md:col-span-1">
              <TiltCard className="h-full w-full p-6 rounded-2xl border border-border bg-card flex flex-col items-center justify-center relative overflow-hidden text-center group">
                <div className="bento-icon w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 border border-border group-hover:border-accent/50 transition-colors">
                  {stat.icon}
                </div>
                <h4 className="text-foreground text-5xl font-bold mb-2 tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.end}
                </h4>
                <p className="text-muted text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                  {stat.label}
                </p>
              </TiltCard>
            </div>
          ))}

          {/* Certifications (Scrollable Area) */}
          <div className="bento-card md:col-span-2 md:row-span-1">
            <TiltCard className="h-full w-full p-8 rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
              <h3 className="text-muted text-xs tracking-widest uppercase mb-6 flex justify-between items-center" style={{ fontFamily: "var(--font-mono)" }}>
                // Skills
                <Award size={14} className="text-accent" />
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {SKILLS.map((skill, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70 text-sm leading-tight">{skill}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Stats Boxes 3 & 4 */}
          {STATS.slice(2, 4).map((stat, i) => (
            <div key={i+2} className="bento-card md:col-span-1">
              <TiltCard className="h-full w-full p-6 rounded-2xl border border-border bg-card flex flex-col items-center justify-center relative overflow-hidden text-center group">
                <div className="bento-icon w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 border border-border group-hover:border-accent/50 transition-colors">
                  {stat.icon}
                </div>
                <h4 className="text-foreground text-5xl font-bold mb-2 tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.end}
                </h4>
                <p className="text-muted text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                  {stat.label}
                </p>
              </TiltCard>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

