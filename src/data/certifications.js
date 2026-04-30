export const categories = [
  { id: "tech", name: "Technology", icon: "Code", description: "Software development, cloud, and cybersecurity." },
  { id: "business", name: "Business", icon: "Briefcase", description: "Project management, marketing, and leadership." },
  { id: "design", name: "Design", icon: "Palette", description: "UI/UX, visual branding, and motion graphics." },
  { id: "data", name: "Data Science", icon: "Database", description: "Analytics, Machine Learning, and Big Data." },
  { id: "soft-skills", name: "Communication", icon: "MessageSquare", description: "Public speaking and emotional intelligence." },
  { id: "finance", name: "Finance", icon: "TrendingUp", description: "Financial modeling and investment strategies." },
];

export const certifications = [
  // --- TECHNOLOGY ---
  {
    id: "js-basic",
    title: "JavaScript Basics",
    category: "tech",
    difficulty: "Beginner",
    questions: [
      {
        q: "What is the result of typeof null?",
        options: ["'null'", "'object'", "'undefined'", "'boolean'"],
        answer: 1,
      },
      {
        q: "Which keyword creates a constant variable?",
        options: ["var", "let", "const", "fixed"],
        answer: 2,
      },
      {
        q: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0,
      }
    ],
  },
  {
    id: "react-core",
    title: "React Fundamentals",
    category: "tech",
    difficulty: "Intermediate",
    questions: [
      {
        q: "What is used to pass data to a component from outside?",
        options: ["setState", "PropTypes", "Props", "Refs"],
        answer: 2,
      },
      {
        q: "Which hook is used for side effects?",
        options: ["useState", "useMemo", "useEffect", "useCallback"],
        answer: 2,
      }
    ],
  },

  // --- BUSINESS ---
  {
    id: "pmp-intro",
    title: "Project Management 101",
    category: "business",
    difficulty: "Beginner",
    questions: [
      {
        q: "What does the 'A' in SMART goals stand for?",
        options: ["Accountable", "Achievable", "Action-oriented", "Ambitious"],
        answer: 1,
      },
      {
        q: "Which methodology uses 'Sprints'?",
        options: ["Waterfall", "Agile/Scrum", "Lean", "Six Sigma"],
        answer: 1,
      }
    ],
  },

  // --- DESIGN ---
  {
    id: "ux-principles",
    title: "UX Design Principles",
    category: "design",
    difficulty: "Intermediate",
    questions: [
      {
        q: "What does 'Accessibility' (a11y) refer to?",
        options: ["App speed", "Design for all abilities", "Server uptime", "Mobile responsiveness"],
        answer: 1,
      },
      {
        q: "Which of these is a low-fidelity representation of a design?",
        options: ["Mockup", "Prototype", "Wireframe", "Style Guide"],
        answer: 2,
      }
    ],
  },

  // --- DATA SCIENCE ---
  {
    id: "python-data",
    title: "Python for Data Science",
    category: "data",
    difficulty: "Beginner",
    questions: [
      {
        q: "Which library is used primarily for data manipulation and analysis?",
        options: ["NumPy", "Pandas", "Matplotlib", "Django"],
        answer: 1,
      }
    ],
  }
];