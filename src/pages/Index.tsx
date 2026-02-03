import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ParticleField } from '@/components/animations/ParticleField';
import { GridBackground } from '@/components/animations/GridBackground';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { PlaygroundSection } from '@/components/sections/PlaygroundSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background effects */}
      <GridBackground />
      <ParticleField />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ExperienceSection />
        <PlaygroundSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
