export interface Project {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  githubUrl: string;
  tags: string[];
  color: "primary" | "secondary" | "accent";
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Content Generator",
    description: "An intelligent content generation platform powered by GPT-4 with custom fine-tuning for brand voice consistency.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["AI", "React", "Python"],
    color: "primary",
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    description: "Interactive 3D visualization tool for understanding neural network architectures and training processes in real-time.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["Three.js", "TensorFlow", "WebGL"],
    color: "secondary",
  },
  {
    id: 3,
    title: "Smart Automation Suite",
    description: "End-to-end business process automation platform with AI-driven decision making and workflow optimization.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["Node.js", "AI", "Automation"],
    color: "accent",
  },
  {
    id: 4,
    title: "Real-time Data Pipeline",
    description: "High-throughput data streaming pipeline with real-time analytics dashboard and anomaly detection.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["Kafka", "React", "D3.js"],
    color: "primary",
  },
  {
    id: 5,
    title: "Voice-Controlled Dashboard",
    description: "AI-powered dashboard with natural language voice commands for hands-free data exploration and reporting.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["Speech AI", "React", "WebRTC"],
    color: "secondary",
  },
  {
    id: 6,
    title: "Predictive Analytics Engine",
    description: "Machine learning platform for time-series forecasting with automated model selection and hyperparameter tuning.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["ML", "Python", "FastAPI"],
    color: "accent",
  },
  {
    id: 7,
    title: "Collaborative Code Editor",
    description: "Real-time multiplayer code editor with AI code completion, syntax highlighting, and integrated terminal.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["WebSocket", "Monaco", "AI"],
    color: "primary",
  },
  {
    id: 8,
    title: "AR Shopping Experience",
    description: "Augmented reality e-commerce platform allowing customers to visualize products in their space before purchasing.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["AR.js", "React", "Three.js"],
    color: "secondary",
  },
  {
    id: 9,
    title: "Autonomous Bot Framework",
    description: "Framework for building intelligent autonomous agents that can navigate, learn, and perform complex tasks.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com",
    tags: ["AI", "Robotics", "Python"],
    color: "accent",
  },
];

export default projects;
