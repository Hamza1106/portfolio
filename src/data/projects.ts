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
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Content Generator",
    summary: "GPT-4 powered content platform with brand voice fine-tuning.",
    description:
      "An intelligent content generation platform powered by GPT-4 with custom fine-tuning for brand voice consistency across marketing, docs and social channels.",
    category: "Generative AI",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["AI", "React", "Python", "OpenAI"],
    features: ["Custom brand voice", "Multi-language", "One-click export", "Team workspaces"],
    status: "Live",
    timeline: "2024 · 4 months",
    color: "primary",
    accent: "200 100% 55%",
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    summary: "Interactive 3D neural network explorer in real-time.",
    description:
      "Interactive 3D visualization tool for understanding neural network architectures and training processes with live layer inspection.",
    category: "Data Viz",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["Three.js", "TensorFlow", "WebGL"],
    features: ["Live training view", "Layer inspection", "Export models", "GPU accelerated"],
    status: "Live",
    timeline: "2023 · 6 months",
    color: "secondary",
    accent: "270 80% 60%",
  },
  {
    id: 3,
    title: "Smart Automation Suite",
    summary: "End-to-end AI-driven business workflow automation.",
    description:
      "End-to-end business process automation platform with AI-driven decision making, integrations and workflow optimization.",
    category: "Automation",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["Node.js", "AI", "Automation"],
    features: ["Visual builder", "200+ integrations", "AI decisions", "Audit logs"],
    status: "Beta",
    timeline: "2024 · Ongoing",
    color: "accent",
    accent: "160 80% 45%",
  },
  {
    id: 4,
    title: "Real-time Data Pipeline",
    summary: "High-throughput streaming with anomaly detection.",
    description:
      "High-throughput data streaming pipeline with real-time analytics dashboard and ML-powered anomaly detection.",
    category: "Data Engineering",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["Kafka", "React", "D3.js"],
    features: ["Sub-second latency", "Anomaly alerts", "Custom dashboards", "Horizontal scale"],
    status: "Live",
    timeline: "2023 · 5 months",
    color: "primary",
    accent: "200 100% 55%",
  },
  {
    id: 5,
    title: "Voice-Controlled Dashboard",
    summary: "Hands-free analytics via natural language voice.",
    description:
      "AI-powered dashboard with natural language voice commands for hands-free data exploration and reporting.",
    category: "Voice AI",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["Speech AI", "React", "WebRTC"],
    features: ["Natural language", "Real-time transcription", "Voice commands", "Multi-user"],
    status: "In Progress",
    timeline: "2025 · Ongoing",
    color: "secondary",
    accent: "270 80% 60%",
  },
  {
    id: 6,
    title: "Predictive Analytics Engine",
    summary: "AutoML forecasting with hyperparameter tuning.",
    description:
      "Machine learning platform for time-series forecasting with automated model selection and hyperparameter tuning.",
    category: "Machine Learning",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    tags: ["ML", "Python", "FastAPI"],
    features: ["AutoML", "Time-series", "Explainability", "REST API"],
    status: "Live",
    timeline: "2024 · 3 months",
    color: "accent",
    accent: "160 80% 45%",
  },
];

export default projects;
