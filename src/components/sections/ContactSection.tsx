import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Mail, Phone, Send, MapPin, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (visual only as requested)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: 'Thank you for reaching out. I\'ll get back to you soon!',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: profile.github,
      color: 'hover:text-foreground',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: profile.linkedin,
      color: 'hover:text-blue-400',
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${profile.email}`,
      color: 'hover:text-primary',
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-purple">Get In</span>{' '}
            <span className="text-foreground">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </FadeIn>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <FadeIn delay={0.2} direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Let's Build Something</h3>
                <p className="text-muted-foreground">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision. Feel free to reach out!
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-4 glass rounded-xl group hover:border-primary/50 transition-all"
                  whileHover={{ x: 8 }}
                >
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-center gap-4 p-4 glass rounded-xl"
                  whileHover={{ x: 8 }}
                >
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 glass rounded-xl"
                  whileHover={{ x: 8 }}
                >
                  <div className="p-3 rounded-lg bg-muted">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </motion.div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 glass rounded-xl text-muted-foreground ${link.color} transition-all`}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.3} direction="right">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border-neon-purple/30">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg font-medium bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center gap-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </motion.div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
