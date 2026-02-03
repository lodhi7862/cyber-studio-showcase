import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="font-bold text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">&lt;</span>
            <span className="text-foreground">{profile.shortName}</span>
            <span className="text-secondary">/&gt;</span>
          </motion.a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>{' '}
            by {profile.shortName} © {new Date().getFullYear()}
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
