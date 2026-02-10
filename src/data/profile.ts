export const profile = {
  name: "Muhammad Faisal Lodhi",
  shortName: "Faisal Lodhi",
  title: "AI & Full Stack Developer",
  tagline: "Building intelligent systems with RAG, LLMs & Modern Web Technologies",
  email: "faisallodhi1912@gmail.com",
  phone: "+92 317 0861998",
  location: "Islamabad, Pakistan",
  github: "https://github.com/lodhi7862",
  linkedin: "https://linkedin.com/in/faisal-lodhi-0850a821b",

  summary: `AI-focused Software Engineer specializing in Retrieval-Augmented Generation (RAG) systems, 
  LLM integration, and full-stack development. Passionate about building intelligent applications 
  that leverage cutting-edge AI technologies to solve real-world problems.`,

  terminalResponses: {
    whoami: `> M Faisal Lodhi
> AI & Full Stack Developer
> Location: Islamabad, Pakistan
> 
> Specializing in:
> - Retrieval-Augmented Generation (RAG)
> - Large Language Model Integration
> - Full Stack Web Development
> - Intelligent Document Processing`,

    education: `> SZABIST University
> BS Computer Science
> 2020 - 2024
> 
> Focus Areas:
> - Artificial Intelligence
> - Software Engineering
> - Database Systems`,

    experience: `> Career Timeline:
>
> [CURRENT] AI Engineer Intern @ DevGate
> - Building RAG-based AI systems
> - LLM integration & fine-tuning
> - Voice Agent Development
>
> [2024] Junior Developer @ Predictive-Lab
> - Full-stack development
> - AI/ML project implementation
>
> [2022] Software Developer @ ZONG HQ CMPAK
> - Enterprise software development
> - System optimization`,

    certifications: `> Certifications & Programs:
>
> 📜 Agentic AI Program
>    - Advanced AI Agent Development
>    - Multi-Agent Systems
>
> 🔐 Cyber Security Certification
>    - Security Best Practices
>    - Secure Development`,
  },
};

export const skills = {
  categories: [
    {
      id: "ai-ml",
      name: "AI/ML Core",
      color: "cyan",
      skills: [
        { name: "RAG", level: 95 },
        { name: "LLMs", level: 90 },
        { name: "NLP", level: 85 },
        { name: "Embeddings", level: 90 },
        { name: "Semantic Search", level: 88 },
      ],
    },
    {
      id: "languages",
      name: "Languages",
      color: "purple",
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "C++", level: 70 },
        { name: "C#", level: 75 },
        { name: "Java", level: 70 },
      ],
    },
    {
      id: "frameworks",
      name: "Frameworks",
      color: "cyan",
      skills: [
        { name: "FastAPI", level: 90 },
        { name: "Django", level: 88 },
        { name: "Flask", level: 85 },
        { name: "LangChain", level: 90 },
        { name: "React", level: 80 },
      ],
    },
    {
      id: "frontend",
      name: "Frontend",
      color: "purple",
      skills: [
        { name: "React 18", level: 80 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Next.js", level: 75 },
        { name: "Framer Motion", level: 70 },
      ],
    },
    {
      id: "databases",
      name: "Databases",
      color: "cyan",
      skills: [
        { name: "MongoDB", level: 60 },
        { name: "PostgreSQL", level: 80 },
        { name: "MySQL", level: 78 },
        { name: "FAISS", level: 88 },
        { name: "ChromaDB", level: 85 },
      ],
    },
    {
      id: "tools",
      name: "Tools & DevOps",
      color: "purple",
      skills: [
        { name: "Docker", level: 80 },
        { name: "Git", level: 90 },
        { name: "Streamlit", level: 85 },
        { name: "Selenium", level: 75 },
      ],
    },
  ],
};

export const projects = [
  {
    id: 1,
    title: "AI Document Summarization System",
    description: "Intelligent document processing system using RAG architecture for automated summarization and key information extraction from large documents.",
    longDescription: "Built a sophisticated RAG-based system that processes and summarizes documents using advanced NLP techniques. Features semantic chunking, vector embeddings, and LLM-powered summarization.",
    tech: ["Python", "LangChain", "FastAPI", "FAISS", "OpenAI"],
    category: "AI/ML",
    featured: true,
    github: "https://github.com/lodhi7862",
    live: "https://github.com/lodhi7862/document-summarization",
    metrics: {
      accuracy: "94%",
      processingSpeed: "2.5s/page",
      documentsProcessed: "10K+",
    },
  },
  {
    id: 2,
    title: "Talk With Your PDF",
    description: "Django-based RAG chatbot enabling natural conversations with PDF documents using FAISS vector storage.",
    longDescription: "A conversational AI system that allows users to upload PDFs and ask questions in natural language. Uses FAISS for efficient similarity search and maintains conversation context.",
    tech: ["Django", "Python", "FAISS", "LangChain", "OpenAI"],
    category: "AI/ML",
    featured: false,
    github: "https://github.com/lodhi7862",
    live: "https://example.com/demo",
    metrics: {
      responseTime: "1.2s",
      contextWindow: "16K tokens",
      accuracy: "91%",
    },
  },
  {
    id: 3,
    title: "University Assistant",
    description: "Flask-based RAG system providing intelligent assistance for university-related queries and information retrieval.",
    longDescription: "An AI-powered assistant specifically designed for university environments. Handles queries about courses, schedules, and academic information using a custom knowledge base.",
    tech: ["Flask", "Python", "RAG", "ChromaDB", "Streamlit"],
    category: "AI/ML",
    featured: true,
    github: "https://github.com/lodhi7862",
    live: "https://example.com/demo",
    metrics: {
      queriesHandled: "5K+",
      userSatisfaction: "4.5/5",
    },
  },
  {
    id: 4,
    title: "Voice Agent - RAG-Enabled Voice Assistant",
    description: "Production-grade real-time voice assistant with RAG capabilities, supporting multiple document formats and AI models with streaming audio processing.",
    longDescription: "A sophisticated voice agent that combines real-time speech processing with Retrieval-Augmented Generation. Features real-time speech-to-text via Deepgram, LLM-powered responses with token streaming, and text-to-speech synthesis. Supports document processing up to 100MB with hierarchical chunking, E5 embeddings, and Qdrant vector database. Includes agent management system for custom knowledge bases and multi-agent support.",
    tech: ["Python", "FastAPI", "React", "Deepgram", "DeepSeek", "Qdrant", "WebSocket", "RAG", "Vite", "Tailwind CSS"],
    category: "AI/ML",
    featured: true,
    github: "https://github.com/lodhi7862",
    live: "https://github.com/lodhi7862/Voice_Agent",
    metrics: {
      documentSize: "100MB+",
      latency: "<500ms",
      accuracy: "94%",
      supportedFormats: "6+",
    },
  },
  {
    id: 5,
    title: "Car Parts E-Commerce",
    description: "Full-featured Django e-commerce platform for automotive parts with inventory management and payment integration.",
    longDescription: "A comprehensive e-commerce solution built with Django, featuring product catalog, shopping cart, order management, and admin dashboard for inventory control.",
    tech: ["Django", "Python", "PostgreSQL", "Bootstrap", "Stripe"],
    category: "Full Stack",
    featured: false,
    github: "https://github.com/lodhi7862",
    live: "https://example.com/demo",
    metrics: {
      products: "500+",
      dailyVisitors: "1K+",
    },
  },
  {
    id: 6,
    title: "React Portfolio Website",
    description: "Modern, responsive portfolio website showcasing projects and skills with smooth animations.",
    longDescription: "A clean and modern portfolio website built with React, featuring smooth scroll animations, project showcases, and contact functionality.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    featured: false,
    github: "https://github.com/lodhi7862",
    live: "https://example.com/demo",
    metrics: null,
  },
  {
    id: 7,
    title: "Task Management System",
    description: "ASP.NET Core CRUD application for efficient task and project management with team collaboration features.",
    longDescription: "A robust task management system with user authentication, project boards, task assignments, and progress tracking. Built with ASP.NET Core and SQL Server.",
    tech: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework"],
    category: "Full Stack",
    featured: false,
    github: "https://github.com/lodhi7862",
    live: "https://example.com/demo",
    metrics: {
      activeUsers: "200+",
      tasksCompleted: "5K+",
    },
  },
  {
    id: 8,
    title: "AR-Based Kids Dictionary",
    description: "Unity 3D augmented reality application for interactive children's learning with Firebase backend.",
    longDescription: "An innovative AR application that brings learning to life. Kids can point their device at objects to see 3D models and learn vocabulary in an engaging way.",
    tech: ["Unity 3D", "C#", "Firebase", "AR Foundation", "Vuforia"],
    category: "AR/VR",
    featured: false,
    github: "https://github.com/lodhi7862",
    live: "https://example.com/demo",
    metrics: {
      downloads: "1K+",
      rating: "4.7/5",
    },
  },
  {
    id: 9,
    title: "Laa do (LaadoApp)",
    description: "React Native mobile application for connecting users and managing requests/tasks within a personal network.",
    longDescription: "Built a comprehensive mobile application using React Native and Expo. Features a robust backend with Node.js and Express, utilizing Drizzle ORM for PostgreSQL and Firebase for real-time capabilities. Includes features for user connections, task sharing, and profile management.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "Drizzle ORM", "PostgreSQL", "Firebase"],
    category: "Mobile App",
    featured: true,
    github: "https://github.com/lodhi7862/LaadoApp",
    live: "https://github.com/lodhi7862/LaadoApp",
    metrics: {
      platform: "Android/iOS",
      architecture: "Monorepo",
      database: "PostgreSQL",
    },
  },
];


export const experience = [
  {
    id: 1,
    role: "AI Engineer Intern",
    company: "DevGate",
    period: "2025 - Present",
    current: true,
    description: "Building RAG-based AI systems and integrating LLMs for intelligent document processing solutions.",
    responsibilities: [
      "Developing RAG pipelines for document intelligence",
      "Fine-tuning and deploying LLM models",
      "Building AI-powered automation workflows",
      "Creating vector search solutions with FAISS",
    ],
    tech: ["Python", "LangChain", "FastAPI", "FAISS", "OpenAI"],
  },
  {
    id: 2,
    role: "Junior Developer",
    company: "Predictive-Lab",
    period: "2024",
    current: false,
    description: "Full-stack development with focus on AI/ML integration and web application development.",
    responsibilities: [
      "Developing full-stack web applications",
      "Implementing ML models in production",
      "API development and integration",
      "Database design and optimization",
    ],
    tech: ["Django", "React", "Python", "PostgreSQL", "Docker"],
  },
  {
    id: 3,
    role: "Software Developer",
    company: "ZONG HQ CMPAK",
    period: "2023",
    current: false,
    description: "Enterprise software development and system optimization for telecommunications infrastructure.",
    responsibilities: [
      "Developing enterprise software solutions",
      "System performance optimization",
      "Database management and queries",
      "Technical documentation",
    ],
    tech: ["Python", "SQL", "Linux", "Shell Scripting"],
  },
];

export const experiments = [
  {
    id: 1,
    title: "3D Neural Network Viz",
    description: "Interactive 3D visualization of neural network architectures",
    category: "WebGL",
    status: "completed",
    preview: null,
  },
  {
    id: 2,
    title: "AI Voice Assistant",
    description: "Voice-controlled AI assistant with natural language understanding",
    category: "AI Demo",
    status: "in-progress",
    preview: null,
  },
  {
    id: 3,
    title: "Particle System Generator",
    description: "Customizable particle effects for web applications",
    category: "Animation",
    status: "completed",
    preview: null,
  },
  {
    id: 4,
    title: "Semantic Search Engine",
    description: "AI-powered search with context understanding",
    category: "AI Demo",
    status: "planned",
    preview: null,
  },
];
