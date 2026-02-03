import { motion } from 'framer-motion';
import { experiments } from '@/data/profile';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Beaker, Code2, Sparkles, Zap } from 'lucide-react';

const categoryIcons: { [key: string]: React.ElementType } = {
  WebGL: Code2,
  'AI Demo': Sparkles,
  Animation: Zap,
};

const statusColors: { [key: string]: string } = {
  completed: 'text-green-400 bg-green-400/10 border-green-400/30',
  'in-progress': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  planned: 'text-muted-foreground bg-muted/30 border-muted',
};

export function PlaygroundSection() {
  return (
    <section id="playground" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Experimental</span>{' '}
            <span className="text-neon-cyan">Playground</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Side projects and technical experiments pushing the boundaries of what's possible
          </p>
        </FadeIn>

        {/* Experiments grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {experiments.map((experiment) => {
            const Icon = categoryIcons[experiment.category] || Beaker;

            return (
              <StaggerItem key={experiment.id}>
                <motion.div
                  whileHover={{ y: -8, rotateY: 5, rotateX: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative glass rounded-2xl p-6 h-full cursor-pointer"
                  style={{ perspective: '1000px' }}
                >
                  {/* Floating effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px hsl(180 100% 50% / 0)',
                        '0 0 30px hsl(180 100% 50% / 0.1)',
                        '0 0 20px hsl(180 100% 50% / 0)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Icon */}
                  <div className="mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {experiment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {experiment.description}
                  </p>

                  {/* Category & Status */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {experiment.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize ${statusColors[experiment.status]}`}
                    >
                      {experiment.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/50 transition-colors pointer-events-none" />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Coming soon card */}
        <FadeIn delay={0.4} className="mt-8 text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block glass rounded-2xl px-8 py-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
              <span className="text-muted-foreground">More experiments coming soon...</span>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
