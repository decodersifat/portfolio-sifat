"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { articles } from "@/lib/data";
import { ArrowRight, GitBranch, BarChart2, Activity, GitMerge, Link, Users } from "lucide-react";
import { SectionHeader } from "./AboutSection";
import TiltCard from "./TiltCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const articleIcons = [
  <GitMerge size={18} className="text-accent" key="0" />,
  <GitBranch size={18} className="text-accent" key="1" />,
  <BarChart2 size={18} className="text-accent" key="2" />,
  <Activity size={18} className="text-accent" key="3" />,
  <Link size={18} className="text-accent" key="4" />,
  <Users size={18} className="text-accent" key="5" />,
];

export default function ArticlesSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".articles-p", {
      scrollTrigger: { trigger: container.current, start: "top 85%", once: true },
      opacity: 0, delay: 0.2, duration: 0.5
    });

    const cards = gsap.utils.toArray<HTMLElement>(".article-card");
    gsap.from(cards, {
      scrollTrigger: { trigger: ".articles-grid", start: "top 85%", once: true },
      opacity: 0, y: 30, scale: 0.95, duration: 0.5, stagger: 0.08, ease: "power2.out"
    });

    const iconWraps = gsap.utils.toArray<HTMLElement>(".article-icon-wrap");
    iconWraps.forEach(icon => {
      icon.addEventListener("mouseenter", () => gsap.to(icon, { scale: 1.15, backgroundColor: "rgba(229,62,0,0.3)", duration: 0.2 }));
      icon.addEventListener("mouseleave", () => gsap.to(icon, { scale: 1, backgroundColor: "rgba(229,62,0,0.15)", duration: 0.2 }));
    });

    const arrows = gsap.utils.toArray<HTMLElement>(".article-arrow");
    arrows.forEach((arrow, i) => {
      gsap.to(arrow, { x: 4, duration: 1.2, repeat: -1, yoyo: true, ease: "easeInOut", delay: i * 0.2 });
    });
  }, { scope: container });

  return (
    <section id="articles" className="bg-background py-24 px-6" ref={container}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="04" label="Knowledge Sharing" title="Articles" />

        <p
          className="articles-p text-muted text-sm mb-12 ml-0"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Visit my{" "}
          <a
            href="https://www.linkedin.com/in/decodersifat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
          >
            LinkedIn
          </a>{" "}
          for the full archive.
        </p>

        {/* 3-col grid */}
        <div className="articles-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <div key={i} className="article-card">
              <TiltCard className="p-6 rounded-xl border border-border bg-card flex flex-col h-full" intensity={9}>
                <div className="article-icon-wrap w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center mb-5 flex-shrink-0 transition-colors">
                  {articleIcons[i] ?? articleIcons[0]}
                </div>
                <h3 className="text-foreground font-bold text-sm leading-snug mb-3" style={{ fontFamily: "var(--font-sans)" }}>
                  {article.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed flex-1 mb-5" style={{ fontFamily: "var(--font-sans)" }}>
                  {article.summary}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover text-[11px] tracking-[0.1em] uppercase transition-colors mt-auto group"
                  style={{ fontFamily: "var(--font-mono)" }}
                  data-cursor-hover
                >
                  Read More
                  <span className="article-arrow">
                    <ArrowRight size={11} />
                  </span>
                </a>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


