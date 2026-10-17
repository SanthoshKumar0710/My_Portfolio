export type ProjectType = "ai" | "fullstack";

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  accentColor: string;
  featured: boolean;
  githubUrl?: string;
  videoUrl?: string;
  aspectRatio?: string;
  architectureDiagram?: string;
}

export interface SkillCategory {
  title: string;
  id: string;
  subtitle: string;
  skills: { name: string; tag: string }[];
}

export interface ProcessStage {
  step: string;
  title: string;
  description: string;
  details: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  specialization?: string;
  coursework: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  iconName: string;
  skillsCovered: string[];
}

export const PORTFOLIO_DATA = {
  hero: {
    name: "SANTHOSH KUMAR",
    shortName: "SANTHOSH",
    title: "AI/ML Engineer | Python Developer | Machine Learning Enthusiast",
    headline: "AI/ML ENGINEER",
    tagline: "Curiosity to Code. Data to Intelligence.",
    subtagline: "Building Intelligent Systems Through AI, Machine Learning and Software Engineering.",
    capabilityPills: [
      "ARTIFICIAL INTELLIGENCE",
      "MACHINE LEARNING",
      "DEEP LEARNING",
    ],
    status: "Exploring Intelligent Systems & Predictive Models",
    location: "Chennai, Tamil Nadu, India",
    videoSrc: "/videos/ai-portfolio-intro.mp4",
    resumeUrl: "/santhosh-kumar-resume.pdf",
    portraitUrl: "/images/portrait.png",
    narrative: [
      {
        progress: [0, 0.22],
        heading: "SANTHOSH KUMAR",
        subheading: "AI/ML Engineer & Intelligent Systems Developer",
        details: "Designing robust machine learning architectures, predictive pipelines, and full-stack AI applications.",
        align: "center" as const,
      },
      {
        progress: [0.25, 0.48],
        heading: "PERCEPTION & COMPUTER VISION",
        subheading: "Spatial Understanding • Sensor Fusion • Predictive Safety",
        details: "Engineering multi-stage perception models like NAYAN-X: intent prediction, risk assessment, and adaptive collision avoidance for complex unstructured roads.",
        align: "left" as const,
      },
      {
        progress: [0.52, 0.75],
        heading: "PREDICTIVE ANALYTICS & DEEP LEARNING",
        subheading: "Neural Optimization • Anomaly Detection • Telemetry Telepathy",
        details: "Developing automated infrastructure telemetry failure prediction, learning rate convergence analysis, and classification pipelines with TensorFlow and Scikit-learn.",
        align: "right" as const,
      },
      {
        progress: [0.80, 0.98],
        heading: "INTELLIGENT SYSTEMS AT SCALE",
        subheading: "FastAPI • Docker • Modern Web Architecture",
        details: "Bridging mathematical models to production environments through containerized microservices and responsive web platforms.",
        align: "center" as const,
      },
    ],
  },

  about: {
    heading: "ABOUT ME",
    subtitle: "Curiosity to Code. Data to Intelligence.",
    summary:
      "I am an aspiring AI/ML Engineer pursuing a B.E. in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at Rajalakshmi Institute of Technology, Chennai. I have a foundation in Python, data structures and algorithms, machine learning, deep learning, natural language processing, computer vision, and generative AI. Through academic and personal projects, I explore predictive analytics, intelligent applications, computer vision, and full-stack software development. I am passionate about building practical intelligent systems and solving real-world problems through AI and software engineering.",
    highlights: [
      { label: "Institution", value: "Rajalakshmi Institute of Technology" },
      { label: "Specialization", value: "Artificial Intelligence & Machine Learning" },
      { label: "Degree Period", value: "2024 — 2028" },
      { label: "Core Foundation", value: "Python, ML/DL, Computer Vision, Full-Stack" },
    ],
  },

  stats: [
    { label: "Intelligent Systems", value: "5+", detail: "Autonomous Vision & Predictive Apps" },
    { label: "Neural Architecture", value: "100%", detail: "TensorFlow, PyTorch & OpenCV" },
    { label: "API & Backend", value: "FastAPI", detail: "Docker containerized services" },
    { label: "Academic Specialization", value: "AI & ML", detail: "Rajalakshmi Institute of Tech" },
  ],

  process: [
    {
      step: "01",
      title: "UNDERSTAND",
      description: "Identify the problem, constraints, and expected outcome.",
      details: "Formulate concrete mathematical objectives, system constraints, failure modes, and metrics.",
    },
    {
      step: "02",
      title: "PREPARE",
      description: "Collect, inspect, and preprocess relevant data.",
      details: "Clean raw datasets, handle outliers, engineer meaningful features, and prevent distribution leakage.",
    },
    {
      step: "03",
      title: "MODEL",
      description: "Choose appropriate algorithms and develop the solution.",
      details: "Select baseline algorithms, design neural network architectures, and optimize hyperparameters.",
    },
    {
      step: "04",
      title: "EVALUATE",
      description: "Validate results using suitable evaluation methods.",
      details: "Rigorous cross-validation, loss convergence curves, confusion matrices, and error analysis.",
    },
    {
      step: "05",
      title: "INTEGRATE",
      description: "Connect the model to an application or API where applicable.",
      details: "Deploy inference endpoints via FastAPI, manage state with Redis, and containerize with Docker.",
    },
    {
      step: "06",
      title: "IMPROVE",
      description: "Analyze limitations and refine the implementation.",
      details: "Profile latency, conduct error retrospectives, and iterate on architecture for greater robustness.",
    },
  ] as ProcessStage[],

  capabilities: [
    {
      id: "programming",
      title: "Programming",
      subtitle: "Foundational languages for systems, algorithms, and models",
      skills: [
        { name: "Python", tag: "Primary Language" },
        { name: "Java", tag: "OOP & Architecture" },
        { name: "C", tag: "Low-level Systems" },
        { name: "JavaScript", tag: "Web & Interaction" },
        { name: "SQL", tag: "Relational Queries" },
      ],
    },
    {
      id: "aiml",
      title: "AI & Machine Learning",
      subtitle: "Algorithms, neural networks, vision, and predictive workflows",
      skills: [
        { name: "Machine Learning", tag: "Supervised & Unsupervised" },
        { name: "Deep Learning", tag: "Neural Networks" },
        { name: "Natural Language Processing", tag: "Text & Semantics" },
        { name: "Computer Vision", tag: "Detection & Tracking" },
        { name: "Predictive Analytics", tag: "Statistical Modeling" },
      ],
    },
    {
      id: "libraries",
      title: "Libraries & Frameworks",
      subtitle: "Scientific computing, model training, and data manipulation",
      skills: [
        { name: "NumPy", tag: "Vector Operations" },
        { name: "Pandas", tag: "Data Wrangling" },
        { name: "Scikit-learn", tag: "Statistical ML" },
        { name: "TensorFlow / Keras", tag: "Deep Learning" },
        { name: "PyTorch", tag: "Neural Prototyping" },
        { name: "OpenCV", tag: "Vision Pipelines" },
        { name: "XGBoost", tag: "Gradient Boosting" },
        { name: "Matplotlib", tag: "Data Visualization" },
      ],
    },
    {
      id: "web-backend",
      title: "Web & Backend",
      subtitle: "Full-stack platforms and production API integration",
      skills: [
        { name: "React", tag: "Frontend UI" },
        { name: "FastAPI", tag: "Async REST APIs" },
        { name: "Flask", tag: "Python Microservices" },
        { name: "REST APIs", tag: "Client-Server Design" },
        { name: "HTML5", tag: "Semantic Markup" },
        { name: "CSS3", tag: "Responsive Styling" },
      ],
    },
    {
      id: "databases",
      title: "Databases",
      subtitle: "Structured and document-oriented data storage",
      skills: [
        { name: "PostgreSQL", tag: "Relational Storage" },
        { name: "MongoDB", tag: "NoSQL Documents" },
        { name: "MySQL", tag: "Relational Database" },
      ],
    },
    {
      id: "tools",
      title: "Tools & DevOps",
      subtitle: "Development workflows, versioning, and containerization",
      skills: [
        { name: "Git", tag: "Version Control" },
        { name: "GitHub", tag: "Collaboration & CI" },
        { name: "Docker", tag: "Containerization" },
        { name: "VS Code", tag: "Primary IDE" },
        { name: "Linux", tag: "Terminal & Environment" },
      ],
    },
    {
      id: "core-cs",
      title: "Core Computer Science",
      subtitle: "Theoretical and algorithmic computer science principles",
      skills: [
        { name: "Data Structures & Algorithms", tag: "Problem Solving" },
        { name: "Object-Oriented Programming", tag: "Software Design" },
        { name: "Database Management Systems", tag: "Data Integrity" },
        { name: "Operating Systems", tag: "Processes & Memory" },
        { name: "Computer Networks", tag: "Protocols & Routing" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "nayan-x",
      type: "ai" as ProjectType,
      title: "NAYAN-X",
      category: "Autonomous Vision & Predictive Collision Avoidance",
      year: "2024",
      description:
        "Designed an AI-driven collision-avoidance architecture for autonomous vehicles operating on unstructured Indian roads.",
      longDescription:
        "Engineered the conceptual and architectural framework for NAYAN-X, a predictive safety system specifically modeled for the high variability of unstructured road environments. Implements a multi-stage cognitive pipeline designed to continuously perceive unpredictable obstacles, project intent, remember situational context, and adapt trajectory safety margins.",
      highlights: [
        "Predictive safety system concept designed for unstructured driving environments.",
        "SEE → PREDICT → REMEMBER → ASSESS → ADAPT → AVOID → LEARN cognitive architecture.",
        "Perception, multi-object tracking, motion and intent prediction modules.",
        "Dynamic risk assessment, adaptive trajectory planning, and safety supervision.",
      ],
      tags: ["Python", "Computer Vision", "Deep Learning", "Sensor Fusion", "AI/ML"],
      accentColor: "#00D9FF",
      featured: true,
      githubUrl: "https://github.com/SanthoshKumar0710/NAYAN-X",
    },
    {
      id: "ai-infra-failure-prediction",
      type: "ai" as ProjectType,
      title: "AI Infrastructure Failure Prediction Platform",
      category: "Predictive Analytics & Systems Intelligence",
      year: "2024",
      description:
        "Developed an AI-based platform to analyze infrastructure metrics and predict potential system failures.",
      longDescription:
        "Built a complete predictive telemetry platform that monitors time-series system metrics to detect anomalies before critical downtime occurs. Integrates automated data-ingestion pipelines, risk-assessment scoring models, a high-throughput FastAPI REST backend, a reactive React metrics dashboard, and containerized Docker services.",
      highlights: [
        "Data-processing workflows for high-frequency infrastructure telemetry.",
        "Anomaly detection and predictive analysis for proactively identifying failure precursors.",
        "Risk-assessment workflows with proactive alerting triggers.",
        "FastAPI backend services, React frontend components, PostgreSQL persistence, and Docker orchestration.",
      ],
      tags: ["Python", "Machine Learning", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
      accentColor: "#7657FF",
      featured: true,
      githubUrl: "https://github.com/SanthoshKumar0710/ai-infra-failure-prediction",
    },
    {
      id: "lead-scoring-prediction",
      type: "ai" as ProjectType,
      title: "Lead Scoring Prediction",
      category: "Machine Learning & Classification",
      year: "2024",
      description:
        "Developed a machine learning model to predict lead conversion probability and prioritize prospects.",
      longDescription:
        "Designed and evaluated a predictive classification pipeline that scores prospective leads based on historical interactions and behavioral features. Performed thorough data exploration, handling of imbalanced features, categorical encoding, and classification model training to provide clear probabilistic insights for decision-making.",
      highlights: [
        "Rigorous exploratory data analysis and feature transformation.",
        "Classification model development using Scikit-learn algorithms.",
        "Probabilistic scoring to identify and prioritize high-potential conversions.",
        "Evaluation with precision, recall, and ROC-AUC curve diagnostics.",
      ],
      tags: ["Python", "Pandas", "Scikit-learn", "Machine Learning", "Data Visualization"],
      accentColor: "#A855F7",
      featured: true,
      githubUrl: "https://github.com/SanthoshKumar0710",
    },
    {
      id: "learning-rate-analysis",
      type: "ai" as ProjectType,
      title: "Learning Rate Analysis in Deep Neural Network Training",
      category: "Deep Learning & Neural Optimization Research",
      year: "2024",
      description:
        "Analyzed how different learning rates affect neural-network training dynamics, loss landscapes, and convergence speed.",
      longDescription:
        "Conducted empirical experiments on neural-network training convergence across varied learning rate schedules and optimization algorithms. Tracked training and validation trajectories to observe gradient oscillations, vanishing/exploding behaviors, and generalization performance across multiple hyperparameter runs.",
      highlights: [
        "Systematic comparison of fixed, decayed, and adaptive learning rate configurations.",
        "Validation performance analysis against training loss over deep feedforward and convolutional models.",
        "Clear visualization of optimization trends and loss curves using Matplotlib.",
        "In-depth analysis of underfitting, divergence, and saddle-point escape dynamics.",
      ],
      tags: ["Python", "TensorFlow/Keras", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      accentColor: "#00D9FF",
      featured: true,
      githubUrl: "https://github.com/Santhoshkumar/DL-MINI-PROJECT",
    },
    {
      id: "auramart",
      type: "fullstack" as ProjectType,
      title: "AuraMart — Enterprise Full-Stack E-Commerce Platform",
      category: "Full-Stack Software Architecture",
      year: "2024",
      description:
        "Developed a modern full-stack e-commerce platform with a React frontend and a robust FastAPI REST API backend.",
      longDescription:
        "Engineered an enterprise-ready e-commerce solution with full separation of concerns between client and server. The backend features async FastAPI endpoints, PostgreSQL persistence via SQLAlchemy ORM, and Redis session caching. The frontend is built on React 19, TypeScript, and Tailwind CSS, featuring Razorpay payment verification and Docker service deployment.",
      highlights: [
        "Relational database modeling with PostgreSQL and SQLAlchemy ORM.",
        "High-speed Redis-based caching and session management.",
        "Payment gateway integration with Razorpay signature verification and Cash on Delivery (COD).",
        "Product image and file upload processing with strict MIME-type validation and Docker containerization.",
      ],
      tags: ["Python", "FastAPI", "React 19", "TypeScript", "Vite", "Tailwind CSS v4", "PostgreSQL", "Redis", "Docker"],
      accentColor: "#E7C77A",
      featured: true,
      githubUrl: "https://github.com/SanthoshKumar0710/e-commerce",
    },
  ] as Project[],

  experience: [
    {
      period: "2024 — Present",
      role: "B.E. Computer Science & Engineering (AI/ML)",
      studio: "Rajalakshmi Institute of Technology, Chennai",
      description:
        "Pursuing specialized engineering degree in Artificial Intelligence and Machine Learning with focus on algorithms, computer vision, deep neural networks, and systems engineering.",
    },
    {
      period: "2024",
      role: "Autonomous Vision & Predictive Safety Engineering",
      studio: "NAYAN-X Research & Development",
      description:
        "Architected predictive collision-avoidance cognitive pipeline (SEE → PREDICT → REMEMBER → ASSESS → ADAPT → AVOID → LEARN) for unstructured Indian roads.",
    },
    {
      period: "2024",
      role: "Higher Secondary Completion",
      studio: "Don Bosco Matric Higher Secondary School, Chennai",
      description:
        "Completed secondary education with strong foundations in Mathematics, Physics, Chemistry, and Computer Science.",
    },
  ],

  education: [
    {
      degree: "B.E. Computer Science and Engineering",
      specialization: "Specialization: Artificial Intelligence and Machine Learning",
      institution: "Rajalakshmi Institute of Technology",
      location: "Chennai, Tamil Nadu, India",
      period: "2024 — Expected 2028",
      coursework: [
        "Data Structures & Algorithms",
        "Machine Learning",
        "Deep Learning",
        "Data Analytics",
        "Artificial Intelligence",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
      ],
    },
    {
      degree: "Higher Secondary Education",
      institution: "Don Bosco Matric Higher Secondary School",
      location: "Chennai, Tamil Nadu, India",
      period: "Completed 2024",
      coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    },
  ] as EducationItem[],

  certifications: [
    {
      title: "Google AI Essentials",
      issuer: "Google",
      iconName: "google",
      skillsCovered: ["Artificial Intelligence", "Prompt Engineering", "Responsible AI", "Generative AI"],
    },
    {
      title: "Machine Learning for Data Science",
      issuer: "Project Certificate",
      iconName: "ml",
      skillsCovered: ["Supervised ML", "Model Evaluation", "Scikit-learn", "Feature Engineering"],
    },
    {
      title: "UiPath Certifications",
      issuer: "UiPath",
      iconName: "uipath",
      skillsCovered: ["Robotic Process Automation", "Workflow Automation", "Process Mining"],
    },
    {
      title: "MongoDB",
      issuer: "MongoDB University",
      iconName: "mongodb",
      skillsCovered: ["Document Data Modeling", "Aggregation Framework", "NoSQL Indexing"],
    },
    {
      title: "RAG Certification",
      issuer: "AI Specialization",
      iconName: "rag",
      skillsCovered: ["Retrieval-Augmented Generation", "Vector Databases", "Embeddings", "LLM Integration"],
    },
    {
      title: "Machine Learning Foundations",
      issuer: "AWS",
      iconName: "aws",
      skillsCovered: ["Cloud ML Pipelines", "SageMaker Workflows", "Model Deployment Basics"],
    },
    {
      title: "SQL Certifications",
      issuer: "Database Certification",
      iconName: "sql",
      skillsCovered: ["Complex Joins", "Subqueries", "Aggregations", "Query Optimization"],
    },
  ] as CertificationItem[],

  terminalCommands: [
    {
      cmd: "whoami",
      output:
        "Santhosh Kumar — AI/ML Engineer | Python Developer | Machine Learning Enthusiast\nLocation: Chennai, Tamil Nadu, India\nFocus: Intelligent Systems, Computer Vision, Deep Learning & Predictive Engineering.",
    },
    {
      cmd: "skills",
      output:
        "Programming: Python, Java, C, JavaScript, SQL\nAI / ML: Machine Learning, Deep Learning, NLP, Computer Vision, Predictive Analytics\nLibraries: NumPy, Pandas, Scikit-learn, TensorFlow/Keras, PyTorch, OpenCV, XGBoost, Matplotlib\nBackend & Web: React, FastAPI, Flask, REST APIs, HTML5, CSS3\nDatabases & Tools: PostgreSQL, MongoDB, MySQL, Docker, Git, Linux",
    },
    {
      cmd: "projects",
      output:
        "1. NAYAN-X: Autonomous Collision Avoidance for Unstructured Roads (Vision, Sensor Fusion)\n2. AI Infrastructure Failure Prediction: Telemetry Anomaly Detection (FastAPI, React, Docker)\n3. Lead Scoring Prediction: Predictive Prospect Prioritization (Scikit-learn, Pandas)\n4. Learning Rate Analysis: Deep Neural Network Optimization Dynamics (TensorFlow, Keras)\n5. AuraMart: Enterprise Full-Stack E-Commerce Platform (FastAPI, React 19, PostgreSQL, Redis)",
    },
    {
      cmd: "education",
      output:
        "1. B.E. Computer Science & Engineering (AI & ML) — Rajalakshmi Institute of Technology, Chennai [2024 - 2028]\n2. Higher Secondary Education — Don Bosco Matric Higher Secondary School, Chennai [Completed 2024]",
    },
    {
      cmd: "certifications",
      output:
        "• Google AI Essentials\n• Machine Learning for Data Science — Project Certificate\n• UiPath Certifications\n• MongoDB\n• RAG Certification\n• Machine Learning Foundations — AWS\n• SQL Certifications",
    },
    {
      cmd: "contact",
      output:
        "Email: santhoshkumar07102006@email.com\nPhone: +91 7200480272\nGitHub: https://github.com/SanthoshKumar0710\nLinkedIn: https://www.linkedin.com/in/santhosh-kumar-1037a132b/\nLocation: Chennai, Tamil Nadu, India",
    },
    {
      cmd: "help",
      output:
        "Supported commands: whoami, skills, projects, education, certifications, contact, clear, help",
    },
  ],

  visionDemo: {
    title: "COMPUTER VISION PERCEPTION ENGINE",
    subtitle: "Raw Camera Sensor Input vs Real-Time AI Inference (NAYAN-X Architecture)",
    description:
      "Interactive comparison of unprocessed sensor feed versus neural perception pipeline showing dynamic object bounding, depth-aware intent prediction, and obstacle risk classification.",
    beforeLabel: "Raw Sensor Input",
    afterLabel: "Neural Perception & Tracking",
  },

  contact: {
    heading: "LET'S BUILD SOMETHING INTELLIGENT.",
    subheading:
      "I am passionate about AI, machine learning, and software engineering. I welcome opportunities to learn, collaborate, and contribute to meaningful technical projects.",
    name: "Santhosh Kumar",
    email: "santhoshkumar07102006@email.com",
    phone: "7200480272",
    location: "Chennai, Tamil Nadu, India",
    github: "https://github.com/SanthoshKumar0710",
    linkedin: "https://www.linkedin.com/in/santhosh-kumar-1037a132b/",
  },

  socials: [
    {
      name: "GitHub",
      handle: "SanthoshKumar0710",
      url: "https://github.com/SanthoshKumar0710",
    },
    {
      name: "LinkedIn",
      handle: "santhosh-kumar-1037a132b",
      url: "https://www.linkedin.com/in/santhosh-kumar-1037a132b/",
    },
    {
      name: "Email",
      handle: "santhoshkumar07102006@email.com",
      url: "mailto:santhoshkumar07102006@email.com",
    },
  ],
};
