export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#professional-experience" },
  { label: "Achievements", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Open Source", href: "#opensource" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "3+", label: "Projects Built" },
  { value: "2", label: "Awards Won" },
  { value: "AI/ML", label: "Specialisation" },
];

export const publications = [
  {
    title: "Hello Doctor – AI-Powered Diagnostic Tool",
    description:
      "A full-stack healthcare platform integrating TensorFlow/Keras models via Django REST API with a React + Tailwind frontend and MongoDB backend, secured with JWT authentication.",
  },
  {
    title: "KNN Breast Cancer Prediction Model",
    description:
      "K-Nearest Neighbours model achieving 99.12% test-set accuracy for classifying breast cancer malignancy, with preprocessing, K-value optimisation, and visualised performance plots.",
  },
];

export const professionalExperiences = [
  {
    title: "Full Stack Developer",
    company: "ShafaCode",
    period: "Mar 2026 – Present | Remote",
    type: "current",
    bullets: [
      "Developed scalable REST APIs using NestJS and TypeScript",
      "Designed and managed relational databases using PostgreSQL with TypeORM",
      "Implemented secure authentication and authorization systems",
      "Integrated AWS S3 for file storage and media handling",
      "Deployed and managed backend services using Railway",
      "Collaborated with frontend using Next.js and deployed applications on Vercel",
      "Optimized API performance and improved system scalability"
    ],
  },
  {
    title: "Backend Developer (Intern)",
    company: "ShafaCode",
    period: "Nov 2025 – Feb 2026 | Remote",
    type: "past",
    bullets: [
      "Built and maintained REST APIs for real-world applications",
      "Worked with NestJS, PostgreSQL, and TypeORM",
      "Assisted in backend architecture and database design",
      "Gained hands-on experience with production-level development",
      "Successfully completed internship and received official certification."
    ],
  }
];

export const experiences = [
  {
    title: "Champion – 1st Data Innovators Challenge",
    company: "AI Expert Career · 2024",
    period: "Achievement",
    type: "past",
    bullets: [
      "Secured 1st place in the 1st Data Innovators Challenge organised by AI Expert Career.",
      "Recognised for excellence in data-driven innovation and problem-solving.",
    ],
  },
  {
    title: "2nd Runner-up – DELTA DEV CODESTORM",
    company: "NUB Computer Club (NUBCC) · 2025",
    period: "Achievement",
    type: "past",
    bullets: [
      "Achieved 3rd place in the Web & Mobile App Development segment of Funathon Fiesta 2025.",
      "Developed a creative, impactful tech solution in a highly competitive environment.",
    ],
  },
];

export const projects = [
  {
    title: "Hello Doctor – AI-Powered Diagnostic Tool",
    description:
      "A full-stack AI-driven healthcare diagnostic platform capable of analysing medical data and generating intelligent predictions. Built REST APIs with Express.js and used Django exclusively for serving trained ML models.",
    stack: ["TensorFlow", "Keras", "Django", "React", "Tailwind", "MongoDB", "Express.js", "Node.js"],
    image: "/projects/hello-doctor.png",
    link: "https://github.com/decodersifat",
    linkLabel: "GitHub",
    featured: true,
  },
  {
    title: "BookiePedia – Digital Book Sharing Platform",
    description:
      "A platform where users can upload, view, and manage book listings. Role-based access: anyone can view books, while authenticated users can publish, edit, or update listings. Publisher profiles with dynamically fetched books via Django ORM.",
    stack: ["Django", "PostgreSQL", "Tailwind CSS"],
    image: "/projects/bookiepedia.png",
    link: "https://github.com/decodersifat",
    linkLabel: "GitHub",
    featured: true,
  },
  {
    title: "KNN Model – Breast Cancer Prediction",
    description:
      "A K-Nearest Neighbours classifier predicting breast cancer malignancy (benign vs malignant) with 99.12% test accuracy. Includes preprocessing, scaling, K-value optimisation, and accuracy visualisations.",
    stack: ["Python", "scikit-learn", "pandas", "Matplotlib"],
    image: "/projects/knn-model.png",
    link: "https://github.com/decodersifat",
    linkLabel: "GitHub",
    featured: false,
  },
];

export const articles = [
  {
    title: "Building an AI-Powered Healthcare Diagnostic Platform",
    summary:
      "A deep dive into the architecture of Hello Doctor — integrating TensorFlow/Keras models served via Django with a React frontend and MongoDB backend, secured with JWT authentication.",
    link: "https://www.linkedin.com/in/decodersifat",
    tags: ["AI", "Django", "React", "MongoDB"],
  },
  {
    title: "KNN for Cancer Detection: Hitting 99% Accuracy",
    summary:
      "How I built, tuned, and evaluated a K-Nearest Neighbours model on a public breast-cancer dataset — covering preprocessing, K-value selection, and result visualisation.",
    link: "https://www.linkedin.com/in/decodersifat",
    tags: ["ML", "Python", "scikit-learn", "Healthcare"],
  },
  {
    title: "Role-Based Access Control in Django: A Practical Guide",
    summary:
      "Implementing granular role-based permissions in BookiePedia — allowing any user to browse while restricting create / edit / delete to authenticated publishers only.",
    link: "https://www.linkedin.com/in/decodersifat",
    tags: ["Django", "PostgreSQL", "Auth"],
  },
  {
    title: "Full-Stack Development with React + Tailwind CSS",
    summary:
      "Best practices for integrating React with Tailwind CSS in production, covering component architecture, theming, and performance optimisation.",
    link: "https://www.linkedin.com/in/decodersifat",
    tags: ["React", "Tailwind CSS", "Frontend"],
  },
  {
    title: "RESTful API Design Patterns with Express.js",
    summary:
      "Clean API design with Express.js: routing, middleware composition, JWT auth flows, and Mongoose data models for scalable Node.js backends.",
    link: "https://www.linkedin.com/in/decodersifat",
    tags: ["Node.js", "Express.js", "REST", "JWT"],
  },
  {
    title: "Getting Started with Computer Vision using OpenCV",
    summary:
      "A beginner-friendly walkthrough of image preprocessing, contour detection, and feature extraction with Python and OpenCV — illustrated with real project examples.",
    link: "https://www.linkedin.com/in/decodersifat",
    tags: ["OpenCV", "Python", "Computer Vision"],
  },
];

export const openSourceProjects = [
  {
    name: "hello-doctor",
    description: "AI-powered healthcare diagnostic platform with TensorFlow/Keras models served via Django REST API",
    lang: "Python",
    link: "https://github.com/decodersifat",
  },
  {
    name: "bookiepedia",
    description: "Digital book sharing platform with role-based access control built in Django + PostgreSQL",
    lang: "Python",
    link: "https://github.com/decodersifat",
  },
  {
    name: "knn-cancer-predict",
    description: "Breast cancer malignancy prediction model achieving 99.12% accuracy using KNN + scikit-learn",
    lang: "Python",
    link: "https://github.com/decodersifat",
  },
  {
    name: "portfolio",
    description: "Personal developer portfolio built with Next.js, Tailwind CSS, TypeScript, and GSAP animations",
    lang: "JavaScript",
    link: "https://github.com/decodersifat",
  },
];

export const contactLinks = [
  {
    label: "Email",
    value: "hello.sifat@inqbic.com",
    href: "mailto:hello.sifat@inqbic.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/decodersifat",
    href: "https://www.linkedin.com/in/decodersifat",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "github.com/decodersifat",
    href: "https://github.com/decodersifat",
    icon: "github",
  },
  {
    label: "Phone",
    value: "+88-01538386793",
    href: "tel:+8801538386793",
    icon: "phone",
  },
];
