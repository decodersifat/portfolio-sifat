"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/data";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useLenis } from "lenis/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { contextSafe } = useGSAP();

  const closeMobileMenu = contextSafe(() => {
    if (!mobileOpen) return;
    gsap.to(mobileMenuRef.current, {
      opacity: 0, y: -10, duration: 0.2, ease: "power2.in",
      onComplete: () => setMobileOpen(false)
    });
  });

  const toggleMobileMenu = contextSafe(() => {
    if (mobileOpen) {
      closeMobileMenu();
    } else {
      setMobileOpen(true);
      // Wait for React to render the div before animating
      setTimeout(() => {
        gsap.fromTo(mobileMenuRef.current, 
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
        );
      }, 0);
    }
  });

  const handleNavClick = (href: string, label: string) => {
    if (lenis) {
      if (href === "#home") {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        lenis.scrollTo(href, { duration: 1.5, offset: -50 });
      }
    } else {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    
    const id = href.replace("#", "");
    setActiveSection(id);
    closeMobileMenu();
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled 
            ? "top-4 md:top-6 px-3 md:px-4" 
            : "top-0 px-0"
        }`}
      >
        <div 
          className={`w-full transition-all duration-500 flex items-center justify-between ${
            scrolled 
              ? "max-w-5xl h-14 md:h-16 px-5 md:px-8 rounded-full bg-background/60 backdrop-blur-xl border border-border shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]" 
              : "max-w-7xl h-16 md:h-20 px-5 md:px-6 bg-transparent border-b border-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home", "HOME")}
            className="flex items-center gap-2.5 md:gap-3 cursor-pointer"
          >
            <span className="w-4 h-4 md:w-5 md:h-5 bg-accent rounded-sm flex-shrink-0" />
            <span
              className="text-foreground font-bold text-sm tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
            Sifat
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                     onClick={() => handleNavClick(link.href, link.label)}
                     className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-muted hover:text-foreground p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
        >
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href, link.label)}
                    className={`text-lg tracking-[0.15em] uppercase transition-colors ${
                      activeSection === id ? "text-accent font-bold" : "text-muted hover:text-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
