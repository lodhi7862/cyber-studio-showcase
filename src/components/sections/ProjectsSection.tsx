import { motion } from 'framer-motion';
import { projects } from '@/data/profile';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-cyan">Featured</span>{' '}
            <span className="text-foreground">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my portfolio of AI-powered applications and full-stack solutions
          </p>
        </FadeIn>

        {/* Featured projects grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} featured />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Other projects */}
        <FadeIn delay={0.3} className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            <span className="text-secondary">More</span> Projects
          </h3>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.08}>
          {otherProjects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative glass rounded-2xl overflow-hidden ${
        featured ? 'p-8' : 'p-6'
      }`}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, hsl(180 100% 50% / 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <Badge
          variant="outline"
          className={`${
            project.category === 'AI/ML'
              ? 'border-primary text-primary'
              : project.category === 'Full Stack'
                ? 'border-secondary text-secondary'
                : 'border-neon-green text-neon-green'
          }`}
        >
          {project.category}
        </Badge>
        {featured && (
          <Badge className="bg-primary/20 text-primary border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3
        className={`font-bold mb-3 group-hover:text-primary transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground mb-4 line-clamp-3">
        {featured ? project.longDescription : project.description}
      </p>

      {/* Metrics */}
      {project.metrics && featured && (
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-muted/30">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-primary font-bold text-lg">{value}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {tech}
          </Badge>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        {project.github && (
          <Button
            size="sm"
            variant="outline"
            asChild
            className="glass-hover border-border/50"
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        )}
        {project.live && (
          <Button
            size="sm"
            asChild
            className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/50"
          >
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
      </div>

      {/* Neon border effect */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/50 transition-colors pointer-events-none" />
    </motion.div>
  );
}
