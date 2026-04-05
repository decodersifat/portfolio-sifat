import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TickerStrip from "@/components/TickerStrip";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="bg-background cursor-none">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <TickerStrip />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ArticlesSection />
      <OpenSourceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
