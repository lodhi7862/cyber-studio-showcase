import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/data/profile';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';

interface SkillNode {
  id: string;
  name: string;
  level: number;
  category: string;
  categoryColor: string;
  x: number;
  y: number;
}

interface Connection {
  from: SkillNode;
  to: SkillNode;
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  // Generate node positions in a neural network layout
  const { nodes, connections } = useMemo(() => {
    const allNodes: SkillNode[] = [];
    const categoryPositions: { [key: string]: { x: number; y: number } } = {};

    // Position categories in a circle
    skills.categories.forEach((category, catIndex) => {
      const angle = (catIndex / skills.categories.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 280;
      categoryPositions[category.id] = {
        x: 400 + Math.cos(angle) * radius,
        y: 300 + Math.sin(angle) * radius,
      };

      // Position skills around category center
      category.skills.forEach((skill, skillIndex) => {
        const skillAngle = angle + ((skillIndex - (category.skills.length - 1) / 2) * 0.3);
        const skillRadius = 80 + Math.random() * 40;
        allNodes.push({
          id: `${category.id}-${skill.name}`,
          name: skill.name,
          level: skill.level,
          category: category.name,
          categoryColor: category.color,
          x: categoryPositions[category.id].x + Math.cos(skillAngle) * skillRadius,
          y: categoryPositions[category.id].y + Math.sin(skillAngle) * skillRadius,
        });
      });
    });

    // Create connections between related skills
    const allConnections: Connection[] = [];
    allNodes.forEach((node, i) => {
      // Connect to 1-2 random nodes from other categories
      const otherNodes = allNodes.filter(
        (n, j) => i !== j && n.category !== node.category
      );
      const connectionCount = 1 + Math.floor(Math.random() * 2);
      for (let c = 0; c < connectionCount && c < otherNodes.length; c++) {
        const randomIndex = Math.floor(Math.random() * otherNodes.length);
        allConnections.push({
          from: node,
          to: otherNodes[randomIndex],
        });
      }
    });

    return { nodes: allNodes, connections: allConnections };
  }, []);

  const filteredNodes = selectedCategory
    ? nodes.filter((n) => n.category === selectedCategory)
    : nodes;

  const filteredConnections = selectedCategory
    ? connections.filter(
        (c) => c.from.category === selectedCategory || c.to.category === selectedCategory
      )
    : connections;

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Skill</span>{' '}
            <span className="text-neon-purple">Network</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            An interactive visualization of my technical expertise and how different skills connect
          </p>
        </FadeIn>

        {/* Category filters */}
        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-3 mb-12">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className={`cursor-pointer px-4 py-2 text-sm transition-all ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Skills
          </Badge>
          {skills.categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                selectedCategory === category.name
                  ? category.color === 'cyan'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                  : 'hover:bg-muted'
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )
              }
            >
              {category.name}
            </Badge>
          ))}
        </FadeIn>

        {/* Neural network visualization */}
        <FadeIn delay={0.3}>
          <div className="relative w-full h-[600px] glass rounded-3xl overflow-hidden border-neon-purple/30">
            <svg className="w-full h-full" viewBox="0 0 800 600">
              {/* Connections */}
              <g className="opacity-30">
                {filteredConnections.map((conn, i) => (
                  <motion.line
                    key={i}
                    x1={conn.from.x}
                    y1={conn.from.y}
                    x2={conn.to.x}
                    y2={conn.to.y}
                    stroke={
                      conn.from.categoryColor === 'cyan'
                        ? 'hsl(180, 100%, 50%)'
                        : 'hsl(270, 100%, 63%)'
                    }
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: i * 0.01 }}
                  />
                ))}
              </g>

              {/* Nodes */}
              {filteredNodes.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                  onMouseEnter={() => setHoveredSkill(node)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer glow */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={20 + node.level / 10}
                    fill={
                      node.categoryColor === 'cyan'
                        ? 'hsl(180, 100%, 50%)'
                        : 'hsl(270, 100%, 63%)'
                    }
                    opacity={0.1}
                    animate={{
                      r: [20 + node.level / 10, 25 + node.level / 10, 20 + node.level / 10],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                  />

                  {/* Inner node */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={8 + node.level / 20}
                    fill="hsl(240, 15%, 8%)"
                    stroke={
                      node.categoryColor === 'cyan'
                        ? 'hsl(180, 100%, 50%)'
                        : 'hsl(270, 100%, 63%)'
                    }
                    strokeWidth="2"
                    whileHover={{ scale: 1.3 }}
                  />

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontFamily="Space Grotesk"
                    opacity={0.8}
                  >
                    {node.name}
                  </text>
                </motion.g>
              ))}
            </svg>

            {/* Skill tooltip */}
            <AnimatePresence>
              {hoveredSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-4 right-4 glass p-4 rounded-xl min-w-[200px]"
                  style={{
                    borderColor:
                      hoveredSkill.categoryColor === 'cyan'
                        ? 'hsl(180, 100%, 50%)'
                        : 'hsl(270, 100%, 63%)',
                    borderWidth: '1px',
                  }}
                >
                  <h4 className="font-bold text-lg mb-1">{hoveredSkill.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {hoveredSkill.category}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Proficiency</span>
                      <span
                        className={
                          hoveredSkill.categoryColor === 'cyan'
                            ? 'text-primary'
                            : 'text-secondary'
                        }
                      >
                        {hoveredSkill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          hoveredSkill.categoryColor === 'cyan'
                            ? 'bg-primary'
                            : 'bg-secondary'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${hoveredSkill.level}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* Skills grid fallback for mobile */}
        <div className="mt-12 grid grid-cols-2 md:hidden gap-4">
          {skills.categories.map((category) => (
            <div key={category.id} className="glass p-4 rounded-xl">
              <h4
                className={`font-semibold mb-3 ${
                  category.color === 'cyan' ? 'text-primary' : 'text-secondary'
                }`}
              >
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="text-xs bg-muted/50"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
