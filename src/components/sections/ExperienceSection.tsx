import { motion } from 'framer-motion';
import { experience } from '@/data/profile';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-purple">Career</span>{' '}
            <span className="text-foreground">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional path in software development and AI engineering
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

          <StaggerContainer className="space-y-12">
            {experience.map((exp, index) => (
              <StaggerItem key={exp.id}>
                <div
                  className={`flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-2">
                    <motion.div
                      className={`w-4 h-4 rounded-full border-2 ${
                        exp.current
                          ? 'bg-primary border-primary pulse-glow'
                          : 'bg-card border-secondary'
                      }`}
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>

                  {/* Content */}
                  <motion.div
                    className={`flex-1 ml-20 md:ml-0 ${
                      index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                    }`}
                    whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="glass p-6 rounded-2xl group hover:border-primary/50 transition-all">
                      {/* Header */}
                      <div
                        className={`flex items-start gap-4 mb-4 ${
                          index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl ${
                            exp.current ? 'bg-primary/20' : 'bg-secondary/20'
                          }`}
                        >
                          <Briefcase
                            className={`w-6 h-6 ${
                              exp.current ? 'text-primary' : 'text-secondary'
                            }`}
                          />
                        </div>
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-xl font-bold">{exp.role}</h3>
                            {exp.current && (
                              <Badge className="bg-primary/20 text-primary border-0">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">{exp.description}</p>

                      {/* Responsibilities */}
                      <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                        {exp.responsibilities.map((resp, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span>{resp}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Tech stack */}
                      <div
                        className={`flex flex-wrap gap-2 ${
                          index % 2 === 0 ? 'md:justify-end' : ''
                        }`}
                      >
                        {exp.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-muted/50 text-muted-foreground text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
