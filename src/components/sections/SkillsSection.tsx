import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3-force';
import { skills } from '@/data/profile';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';

// Types for our force simulation
interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  level: number;
  category: string;
  categoryColor: string;
  radius: number;
}

interface SkillLink extends d3.SimulationLinkDatum<SkillNode> {
  source: string | SkillNode;
  target: string | SkillNode;
  value: number;
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [graphData, setGraphData] = useState<{ nodes: SkillNode[]; links: SkillLink[] }>({ nodes: [], links: [] });
  const mousePos = useRef({ x: 0, y: 0 });

  // Initialize data
  useEffect(() => {
    const nodes: SkillNode[] = [];
    const links: SkillLink[] = [];

    skills.categories.forEach((category) => {
      // Add skills
      category.skills.forEach((skill) => {
        const node: SkillNode = {
          id: `${category.id}-${skill.name}`,
          name: skill.name,
          level: skill.level,
          category: category.name,
          categoryColor: category.color,
          radius: 20 + skill.level / 5, // Radius based on skill level
          // Start nodes randomly above the view or top half to drop down
          x: Math.random() * 800,
          y: Math.random() * -500, // Spawn nicely above 
        };
        nodes.push(node);
      });
    });

    // Create links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].category === nodes[j].category) {
          links.push({
            source: nodes[i].id,
            target: nodes[j].id,
            value: 1
          });
        } else {
          if (Math.random() < 0.1) {
            links.push({
              source: nodes[i].id,
              target: nodes[j].id,
              value: 0.5
            });
          }
        }
      }
    }

    setGraphData({ nodes, links });
  }, []);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 600, // Fixed height or responsive
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force Simulation
  useEffect(() => {
    if (!graphData.nodes.length || !dimensions.width) return;

    const simulation = d3.forceSimulation<SkillNode>(graphData.nodes)
      .force('link', d3.forceLink<SkillNode, SkillLink>(graphData.links).id(d => d.id).distance(80).strength(0.2))
      .force('charge', d3.forceManyBody().strength(-200)) // Repulsion between nodes
      // Gravity: Pull down strongly
      .force('y', d3.forceY(dimensions.height).strength(0.05))
      // Center X: Keep them mostly centered horizontally but loose
      .force('x', d3.forceX(dimensions.width / 2).strength(0.01))
      .force('collide', d3.forceCollide<SkillNode>().radius(d => d.radius * 1.5).iterations(2))
      // Cursor Interaction Force
      .force('cursor', () => {
        const strength = 1.0;
        const cursorRadius = 150;

        graphData.nodes.forEach(node => {
          const dx = node.x! - mousePos.current.x;
          const dy = node.y! - mousePos.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < cursorRadius) {
            const force = (cursorRadius - distance) / cursorRadius;
            const angle = Math.atan2(dy, dx);
            node.vx = (node.vx || 0) + Math.cos(angle) * force * strength * 5;
            node.vy = (node.vy || 0) + Math.sin(angle) * force * strength * 5;
          }
        });
      })
      .alphaTarget(0.1)
      .velocityDecay(0.3);

    simulation.on('tick', () => {
      // Constrain nodes to container bounds (Floor and Walls)
      graphData.nodes.forEach(node => {
        const r = node.radius + 10;

        // Walls
        if (node.x! < r) { node.x = r; node.vx! *= -0.5; } // Bounce off left
        if (node.x! > dimensions.width - r) { node.x = dimensions.width - r; node.vx! *= -0.5; } // Bounce off right

        // Floor
        if (node.y! > dimensions.height - r) { node.y = dimensions.height - r; node.vy! *= -0.5; } // Bounce off floor with damping

        // Ceiling max limit (don't lose them up there)
        if (node.y! < -500) { node.y = -500; }
      });

      setGraphData(prev => ({
        nodes: [...prev.nodes],
        links: [...prev.links]
      }));
    });

    return () => {
      simulation.stop();
    };
  }, [graphData.nodes.length, dimensions, selectedCategory]);


  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Skill</span>{' '}
            <span className="text-neon-purple">Network</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My technical skills, dropped in a jar. Stir them with your cursor!
          </p>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {skills.categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.name ? 'default' : 'outline'}
              className={`cursor-pointer hover:opacity-80 transition-opacity ${cat.color === 'cyan' ? 'border-primary text-primary' : 'border-secondary text-secondary'
                } ${selectedCategory === cat.name ? (cat.color === 'cyan' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground') : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            >
              {cat.name}
            </Badge>
          ))}
        </FadeIn>

        <div
          ref={containerRef}
          className="relative w-full h-[600px] glass rounded-3xl overflow-hidden border-neon-purple/30 shadow-2xl bg-black/40"
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
              mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
              };
            }
          }}
          onMouseLeave={() => {
            mousePos.current = { x: -1000, y: -1000 }; // Move "cursor" force away
          }}
        >
          {/* Background decorative grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
            {/* Links */}
            <g strokeOpacity="0.2">
              {graphData.links.map((link, i) => {
                const source = link.source as SkillNode;
                const target = link.target as SkillNode;
                const isVisible = !selectedCategory || (source.category === selectedCategory || target.category === selectedCategory);

                return (
                  <line
                    key={i}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={source.categoryColor === 'cyan' ? 'var(--primary)' : 'var(--secondary)'}
                    strokeWidth={Math.sqrt(link.value)}
                    opacity={isVisible ? 0.3 : 0.05}
                  />
                );
              })}
            </g>

            {/* Nodes */}
            {graphData.nodes.map((node) => {
              const isSelected = !selectedCategory || node.category === selectedCategory;
              const isHovered = hoveredNode?.id === node.id;
              const isCyan = node.categoryColor === 'cyan';

              return (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: isHovered ? 1.3 : 1,
                    opacity: isSelected ? 1 : 0.2,
                    x: node.x,
                    y: node.y
                  }}
                  transition={{ duration: 0 }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'grab' }}
                  drag
                  dragConstraints={containerRef}
                  onDrag={(event, info) => {
                    node.fx = node.x! + info.delta.x;
                    node.fy = node.y! + info.delta.y;
                  }}
                  onDragEnd={() => {
                    node.fx = null;
                    node.fy = null;
                  }}
                >
                  {/* Pulse effect for all nodes */}
                  <motion.circle
                    r={node.radius + 5}
                    fill={isCyan ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
                  />

                  <circle
                    r={node.radius}
                    fill={isCyan ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
                    fillOpacity={0.15}
                    stroke={isCyan ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
                    strokeWidth={isHovered ? 2 : 1}
                  />

                  {/* Center Dot */}
                  <circle
                    r={2}
                    fill={isCyan ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
                  />

                  <text
                    dy={node.radius + 15}
                    textAnchor="middle"
                    className="fill-foreground text-[10px] uppercase tracking-wider font-bold select-none pointer-events-none shadow-black drop-shadow-md"
                    style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {node.name}
                  </text>
                </motion.g>
              );
            })}
          </svg>

          {/* Advanced Tooltip Card */}
          <AnimatePresence>
            {hoveredNode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="absolute top-4 right-4 z-20 md:w-80 pointer-events-none"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 shadow-2xl">
                  {/* Decorative scan line */}
                  <motion.div
                    className={`absolute top-0 left-0 w-full h-1 ${hoveredNode.categoryColor === 'cyan' ? 'bg-primary' : 'bg-secondary'}`}
                    animate={{ opacity: [0.5, 1, 0.5], boxShadow: ['0 0 10px currentColor', '0 0 20px currentColor', '0 0 10px currentColor'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-2xl tracking-tight text-white mb-1">{hoveredNode.name}</h3>
                      <Badge
                        variant="outline"
                        className={`${hoveredNode.categoryColor === 'cyan' ? 'border-primary text-primary' : 'border-secondary text-secondary'}`}
                      >
                        {hoveredNode.category}
                      </Badge>
                    </div>
                    <div className={`text-4xl font-bold ${hoveredNode.categoryColor === 'cyan' ? 'text-primary' : 'text-secondary'} opacity-20`}>
                      {hoveredNode.name.charAt(0)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proficiency Level</span>
                        <span className={`font-mono font-bold ${hoveredNode.categoryColor === 'cyan' ? 'text-primary' : 'text-secondary'}`}>
                          {hoveredNode.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          className={`h-full ${hoveredNode.categoryColor === 'cyan' ? 'bg-primary' : 'bg-secondary'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${hoveredNode.level}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-white/10 pt-4">
                      <div>
                        <span className="block mb-1 opacity-50">STATUS</span>
                        <span className="text-white flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          ACTIVE
                        </span>
                      </div>
                      <div>
                        <span className="block mb-1 opacity-50">NODE_ID</span>
                        <span className="font-mono text-white/70">
                          {hoveredNode.id.split('-').pop()?.substring(0, 8).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Background Glow */}
                  <div
                    className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${hoveredNode.categoryColor === 'cyan' ? 'bg-primary' : 'bg-secondary'}`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
