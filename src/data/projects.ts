export interface CaseStudy {
  problem: string;
  approach: string;
  challenge: string;
  result: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  summary: string;
  category: string;
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  tags: string[];
  features: string[];
  status: "Live" | "In Progress" | "Beta" | "Archived";
  timeline: string;
  color: "primary" | "secondary" | "accent";
  accent: string; // hsl
  /** Optional — only projects with a case study show the "Case Study" button. */
  caseStudy?: CaseStudy;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered World Generation Engine",
    summary: "AI-powered procedural world generation with intelligent terrain rendering.",
    description:
      "A Python-based procedural world generation engine using Random Forest, Decision Tree, and KNN to create intelligent terrains with pseudo-3D visualization and real-time exploration.",
    category: "Artificial Intelligence",
    videoUrl: "",
    githubUrl: "https://github.com/Hamza1106/AI-Map-Generator",
    liveUrl: "https://youtu.be/Tko6NYtb-NA",
    tags: [
      "Python",
      "Machine Learning",
      "Random Forest",
      "KNN",
      "Pygame"
    ],
    features: [
      "Procedural AI world generation",
      "Pseudo-3D terrain rendering",
      "ML terrain classification",
      "Interactive minimap",
      "Dynamic fog system",
      "Background music & FPS monitor"
    ],
    status: "Live",
    timeline: "2025",
    color: "primary",
    accent: "200 100% 55%",
    caseStudy: {
      problem:
        "Wanted to explore whether classical machine learning — not just noise functions — could drive believable procedural terrain, as a semester AI project built entirely in Python.",
      approach:
        "Used Perlin noise for base elevation, then layered Random Forest, Decision Tree, and KNN classifiers on top to intelligently label terrain types instead of relying on static height thresholds. Added pseudo-3D rendering, an interactive minimap, dynamic fog-of-war, and real-time keyboard-driven exploration in Pygame.",
      challenge:
        "Raw noise gave inconsistent, patchy biome transitions. Fixed it by engineering features — elevation, moisture, slope — and feeding those into the classifiers instead of the raw noise value, which produced far more natural terrain blending without hurting frame rate.",
      result:
        "A fully playable top-down world explorer with live minimap, fog system, and ML-classified terrain — the centerpiece of the semester AI project and proof of applying classical ML models outside typical tabular datasets.",
    },
  },

  {
    id: 2,
    title: "Royal Dastarkhuwan",
    summary: "A premium restaurant website with cinematic storytelling and immersive UI.",
    description:
      "A luxury restaurant experience featuring cinematic animations, interactive storytelling, elegant food galleries, and a fully responsive modern interface.",
    category: "Premium Web Experience",
    videoUrl: "",
    githubUrl: "https://github.com/Hamza1106/Royal-Dastarkhuwan",
    liveUrl: "https://royal-dastarkhuwan.vercel.app",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "UI/UX"
    ],
    features: [
      "Interactive food gallery",
      "Story-driven scrolling",
      "Premium animations",
      "Table reservation UI",
      "Responsive design",
      "Luxury restaurant experience"
    ],
    status: "Live",
    timeline: "2025",
    color: "secondary",
    accent: "270 80% 60%",
    caseStudy: {
      problem:
        "Most Pakistani restaurant websites are static menu pages. Wanted to prove a local dining brand could feel as cinematic and premium online as international hospitality brands.",
      approach:
        "Built with React, TypeScript, Tailwind CSS, and Framer Motion. Structured the site as a scroll-driven \"tasting journey\" — courses, cities, and dishes reveal as you scroll — instead of a flat menu list, paired with a table reservation interface and a premium food gallery.",
      challenge:
        "Cinematic scroll animation is easy to over-do and breaks on mobile. Had to tune Framer Motion's viewport triggers and cut back animation weight on smaller screens so the site stayed smooth instead of janky on phones.",
      result:
        "A fully responsive, live premium web experience — a strong portfolio piece for pitching hospitality and premium-brand clients on freelance platforms.",
    },
  },

  {
    id: 3,
    title: "Jamaica Tour Management System",
    summary: "A full-stack travel booking platform with secure authentication.",
    description:
      "A travel management platform built with React, Node.js, and MongoDB featuring JWT authentication, admin dashboards, and tour booking management.",
    category: "Full Stack Development",
    videoUrl: "",
    githubUrl: "https://github.com/Hamza1106/jamaica-tour-management",
    liveUrl: "https://jamaica-tour-management.vercel.app",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT"
    ],
    features: [
      "JWT authentication",
      "Role-based dashboards",
      "Tour booking system",
      "Admin management",
      "Customer management",
      "MongoDB Atlas integration"
    ],
    status: "Live",
    timeline: "2025",
    color: "accent",
    accent: "160 80% 45%",
    caseStudy: {
      problem:
        "Irie Island Tours needed one platform to do two very different jobs: let travellers book taxis, transfers, and tour packages, while giving the business itself a working admin system to manage bookings and customers.",
      approach:
        "Built full-stack with React, Node.js, Express, and MongoDB Atlas. Added JWT-based authentication with role-based dashboards, so the same app serves a public booking flow and a separate admin management view depending on who's logged in.",
      challenge:
        "Getting role-based access right — making sure a public visitor booking a tour could never see or reach admin routes, and that permissions were enforced on the backend, not just hidden in the UI.",
      result:
        "A live, full-stack booking and management system for a real tours & transfers business — the first end-to-end MERN deployment in the portfolio with working auth and an admin dashboard.",
    },
  },

  {
    id: 4,
    title: "HerCare AI",
    summary: "AI-powered healthcare platform for women's wellness.",
    description:
      "An AI healthcare platform featuring symptom tracking, PCOS risk assessment, personalized health insights, and an intelligent chatbot.",
    category: "Healthcare AI",
    videoUrl: "",
    githubUrl: "https://github.com/Hamza1106/HerCare-AI",
    liveUrl: "https://her-care-ai-hazel.vercel.app/",
    tags: [
      "React",
      "Python",
      "Flask",
      "Artificial Intelligence",
      "Healthcare"
    ],
    features: [
      "AI health chatbot",
      "PCOS risk assessment",
      "Symptom tracking",
      "Personalized recommendations",
      "Secure authentication",
      "Health dashboard"
    ],
    status: "Live",
    timeline: "2025",
    color: "primary",
    accent: "200 100% 55%",
    caseStudy: {
      problem:
        "Women's health tech is underserved, especially private, judgement-free symptom tracking and PCOS risk assessment. Wanted to build an approachable AI health companion as a team project.",
      approach:
        "React frontend with a Flask/Python backend. Built an AI chatbot for symptom-based guidance, a PCOS risk assessment model, personalized recommendations, secure authentication, and a health dashboard — split across a small team.",
      challenge:
        "A force-push from a teammate overwrote shared branch history and put the whole team's work at risk of being lost. Had to carefully reconcile the git history and recover everyone's commits without wiping any contributions.",
      result:
        "A live AI-driven healthcare platform, plus real hands-on experience resolving high-stakes git conflicts under pressure — a collaboration skill that mattered as much as the AI model itself.",
    },
  },

  {
    id: 5,
    title: "Wear-IT Store",
    summary: "A modern sportswear e-commerce platform with premium UI.",
    description:
      "A stylish React-based e-commerce application featuring a responsive storefront, product catalog, shopping cart, and smooth user experience.",
    category: "E-Commerce",
    videoUrl: "",
    githubUrl: "https://github.com/Hamza1106/Wear-IT-Store",
    liveUrl: "https://wear-it-store.vercel.app/",
    tags: [
      "React",
      "TypeScript",
      "E-Commerce",
      "Shopping Cart",
      "UI Design"
    ],
    features: [
      "Responsive storefront",
      "Product catalog",
      "Shopping cart",
      "Smooth animations",
      "Premium UI",
      "Mobile-first experience"
    ],
    status: "Live",
    timeline: "2025",
    color: "secondary",
    accent: "270 80% 60%",
    caseStudy: {
      problem:
        "Wanted a sportswear e-commerce front (Velocity Wear) that felt like an actual premium athletic brand storefront, not a generic shopping template.",
      approach:
        "Built with React and TypeScript — a full product catalog, shopping cart, and mobile-first responsive layout, with animation used to reinforce the \"performance\" brand feel rather than just decorate the page.",
      challenge:
        "Keeping product-grid interactions and animations smooth on mobile while still feeling premium — had to be selective about what animates versus what stays static to avoid jank on lower-end devices.",
      result:
        "A live, fully responsive storefront that doubles as a catalog/cart/checkout-flow showcase — useful proof of e-commerce fundamentals when pitching freelance retail clients.",
    },
  },

  {
    id: 6,
    title: "Pizza House 3D",
    summary: "A modern restaurant website with immersive 3D-inspired design.",
    description:
      "A visually engaging restaurant website featuring premium animations, interactive product showcases, and a fully responsive user experience.",
    category: "Interactive 3D Experience",
    videoUrl: "",
    githubUrl: "https://github.com/Hamza1106/Pizza-House-3D",
    liveUrl: "https://pizza-house-3d.vercel.app",
    tags: [
      "React",
      "TypeScript",
      "Frontend",
      "UI/UX",
      "3D Design"
    ],
    features: [
      "Interactive product showcase",
      "Premium UI/UX",
      "Smooth animations",
      "Responsive design",
      "Modern frontend architecture",
      "Immersive visual experience"
    ],
    status: "Live",
    timeline: "2025",
    color: "accent",
    accent: "160 80% 45%",
    caseStudy: {
      problem:
        "Pizza Town Sukkur, a real local restaurant on Military Road, needed an online presence that stood out and clearly communicated its actual dine-in, drive-through, and delivery options — not another flat menu PDF.",
      approach:
        "Built a React frontend with interactive product showcase sections and immersive, premium animations, designed specifically around this restaurant's real offerings, branding, and location.",
      challenge:
        "Translating a real business's actual service model and identity into an engaging interactive design without it feeling generic or disconnected from the real brand.",
      result:
        "A live site for an actual operating restaurant — a genuine client deliverable rather than a demo, which strengthens the freelance portfolio with real local-business work.",
    },
  },
];

export default projects;