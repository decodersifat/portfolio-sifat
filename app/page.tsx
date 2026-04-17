import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TickerStrip from "@/components/TickerStrip";
import AboutSection from "@/components/AboutSection";
import ProfessionalExperienceSection from "@/components/ProfessionalExperienceSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import { client } from "@/sanity/lib/client";

// Revalidate every 60 seconds or use webhooks for on-demand revalidation
export const revalidate = 60;

export default async function Home() {
  // Fetch data concurrently from Sanity
  const [projects, experiences, articles, openSourceProjects] = await Promise.all([
    client.fetch(`*[_type == "project"] | order(_createdAt asc)`),
    client.fetch(`*[_type == "experience"] | order(_createdAt asc)`),
    client.fetch(`*[_type == "article"] | order(_createdAt asc)`),
    client.fetch(`*[_type == "openSource"] | order(_createdAt asc)`),
  ]);

  const professionalExperiences = experiences.filter((e: any) => e.category === 'professional');
  const achievements = experiences.filter((e: any) => e.category === 'achievement');

  return (
    <main className="bg-background">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <TickerStrip />
      <AboutSection />
      <ProfessionalExperienceSection professionalExperiences={professionalExperiences} />
      <ExperienceSection experiences={achievements} />
      <ProjectsSection projects={projects} />
      <ArticlesSection articles={articles} />
      <OpenSourceSection openSourceProjects={openSourceProjects} />
      <ContactSection />
      <Footer />
    </main>
  );
}
