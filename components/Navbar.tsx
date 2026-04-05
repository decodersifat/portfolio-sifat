"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/data";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
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
    window.dispatchEvent(
      new CustomEvent("page-transition", {
        detail: { targetId: href, title: label },
      })
    );
    const id = href.replace("#", "");
    setActiveSection(id);
    closeMobileMenu();
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled 
            ? "top-6 px-4" 
            : "top-0 px-0"
        }`}
      >
        <div 
          className={`w-full transition-all duration-500 flex items-center justify-between ${
            scrolled 
              ? "max-w-5xl h-16 px-8 rounded-full bg-background/50 backdrop-blur-xl border border-border shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]" 
              : "max-w-7xl h-20 px-6 bg-transparent border-b border-transparent"
          }`}
        >
          {/* Logo: red square + AKASH */}
          <button
            onClick={() => handleNavClick("#home", "HOME")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="w-5 h-5 bg-accent rounded-sm flex-shrink-0" />
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
            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all"
              >
                {resolvedTheme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-muted hover:text-foreground p-1"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-14 left-0 right-0 z-40 bg-background border-b border-border md:hidden"
        >
          <ul className="flex flex-col py-4 px-6 gap-3">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href, link.label)}
                    className={`nav-link ${activeSection === id ? "active" : ""}`}
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
