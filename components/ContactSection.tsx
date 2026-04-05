"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail } from "lucide-react";
import { SectionHeader } from "./AboutSection";
import TiltCard from "./TiltCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const contactCards = [
  {
    label: "EMAIL",
    value: "hello.sifat@inqbic.com",
    href: "mailto:hello.sifat@inqbic.com",
    icon: <Mail size={22} className="text-accent" />,
    featured: true,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/decodersifat",
    href: "https://www.linkedin.com/in/decodersifat",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px] text-accent">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    featured: false,
  },
  {
    label: "GITHUB",
    value: "github.com/decodersifat",
    href: "https://github.com/decodersifat",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px] text-accent">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    featured: false,
  },
  {
    label: "PHONE",
    value: "+88-01538386793",
    href: "tel:+8801538386793",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px] text-accent">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    featured: false,
  },
];

export default function ContactSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".contact-p", {
      scrollTrigger: { trigger: container.current, start: "top 85%", once: true },
      opacity: 0, delay: 0.15, duration: 0.5
    });

    const cards = gsap.utils.toArray<HTMLElement>(".contact-card");
    gsap.from(cards, {
      scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
      opacity: 0, y: 30, scale: 0.95, duration: 0.5, stagger: 0.1, ease: "power2.out"
    });

    const ytCard = document.querySelector(".yt-card");
    if (ytCard) {
      gsap.from(ytCard, {
        scrollTrigger: { trigger: ytCard, start: "top 95%", once: true },
        opacity: 0, y: 20, duration: 0.4, delay: 0.28
      });
    }

    const iconWraps = gsap.utils.toArray<HTMLElement>(".contact-icon-wrap");
    iconWraps.forEach(icon => {
      icon.addEventListener("mouseenter", () => {
        const isYT = icon.classList.contains("yt-icon");
        gsap.to(icon, { scale: 1.15, rotation: isYT ? -5 : 5, duration: 0.3, ease: "back.out(2)" });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
      });
    });

    const emailTexts = gsap.utils.toArray<HTMLElement>(".hover-text-spacing");
    emailTexts.forEach(txt => {
      txt.closest("a")?.addEventListener("mouseenter", () => gsap.to(txt, { letterSpacing: "0.15em", duration: 0.2 }));
      txt.closest("a")?.addEventListener("mouseleave", () => gsap.to(txt, { letterSpacing: "normal", duration: 0.2 }));
    });
  }, { scope: container });

  return (
    <section id="contact" className="bg-background py-24 px-6" ref={container}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="06" label="Get In Touch" title="Contact" />

        <p className="contact-p text-muted text-sm mb-12" style={{ fontFamily: "var(--font-sans)" }}>
          Collaborations, roles, or a technical chat — I&apos;m listening.
        </p>

        {/* 3-col top row */}
        <div className="contact-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {contactCards.slice(0, 3).map((card, i) => (
            <div key={card.label} className="contact-card">
              <TiltCard
                className={`p-8 rounded-xl border bg-card flex flex-col items-center gap-4 h-full ${
                  i === 0 ? "border-accent/50" : "border-border"
                }`}
                intensity={8}
              >
                <a
                  href={card.href}
                  target={card.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={card.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex flex-col items-center gap-4 w-full"
                  data-cursor-hover
                >
                  <div className="contact-icon-wrap w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-bold mb-1" style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", letterSpacing: "0.08em" }}>
                      {card.label}
                    </p>
                    <p
                      className="hover-text-spacing text-accent text-xs transition-colors"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {card.value}
                    </p>
                  </div>
                </a>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* YouTube card */}
        <div className="yt-card w-full sm:w-64">
          <TiltCard className="p-8 rounded-xl border border-border bg-card flex flex-col items-center gap-4" intensity={8}>
            <a
              href={contactCards[3].href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 w-full"
              data-cursor-hover
            >
              <div className="contact-icon-wrap yt-icon w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                {contactCards[3].icon}
              </div>
              <div className="text-center">
                <p className="text-foreground font-bold mb-1" style={{ fontFamily: "var(--font-heading)", fontSize: "1rem" }}>
                  {contactCards[3].label}
                </p>
                <p className="hover-text-spacing text-accent text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                  {contactCards[3].value}
                </p>
              </div>
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}


