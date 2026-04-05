"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useGSAP(() => {
    const handleTransition = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string; title: string }>;
      const { targetId, title } = customEvent.detail;
      
      setLabel(title);
      setActive(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setActive(false);
        }
      });

      // Reset state just in case
      gsap.set(containerRef.current, { y: "-100%", display: "flex" });
      gsap.set(textRef.current, { opacity: 0, y: 50 });

      // Bring curtain down
      tl.to(containerRef.current, {
        y: "0%",
        duration: 0.6,
        ease: "power4.inOut",
      })
      // Reveal text
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
      // Wait, scroll, then leave
      .add(() => {
        // Perform the actual scroll behind the curtain
        const id = targetId.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant" as any }); // Jump instantly to hide the shift
        } else if (targetId === "#home") {
          window.scrollTo(0, 0); // fallback for home
        }
      }, "+=0.3")
      // Hide text 
      .to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3,
        ease: "power2.in"
      })
      // Slide curtain down and away
      .to(containerRef.current, {
        y: "100%",
        duration: 0.6,
        ease: "power4.inOut"
      });
    };

    window.addEventListener("page-transition", handleTransition);
    return () => {
      window.removeEventListener("page-transition", handleTransition);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-accent flex items-center justify-center text-background hidden"
      style={{ transform: "translateY(-100%)" }}
    >
      <h1 
        ref={textRef}
        className="text-5xl md:text-8xl font-black uppercase tracking-tighter"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {label}
      </h1>
    </div>
  );
}
