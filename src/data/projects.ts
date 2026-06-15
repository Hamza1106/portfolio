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
    title: "AI Customer Care Assistant",
    description: "This chatbot operates like a custome care service employee, which enhance the performance and efficiency of any organization.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/CustomerCare",
    tags: ["AI", "Streamlit", "Python"],
    color: "primary",
  },
  {
    id: 2,
    title: "AI Map Generator",
    description: "An AI-powered world generator and explorer built with Python. Uses Machine Learning to classify terrain tiles and generates unique explorable worlds with fog of war.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/AI-Map-Generator",
    tags: ["Python", "AI", "Pygame"],
    color: "secondary",
  },
  {
    id: 3,
    title: "Restaurant Reservation System",
    description: "An AI-powered customer support chatbot built using Streamlit and Google Gemini API. This chatbot simulates a restaurant support assistant for Karachi Bites, handling queries like orders, menu details, reservations, and more.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/Restaurant-Service",
    tags: ["Streamlit", "AI", "Automation"],
    color: "accent",
  },
  {
    id: 4,
    title: "Real-time Image Analyzer",
    description: "Powerful image analysis tool powered by Google Gemini Vision AI. Upload any image and get instant AI-powered insights, object detection, descriptions, and more.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/Image-Analyzer",
    tags: ["Python", "Image-AI", "PNG"],
    color: "primary",
  },
  {
    id: 5,
    title: "Healthcare AI Assistant",
    description: "This chatbot operates like a Health care service employee, which can be very effective in critical health service centers",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/HealthCare",
    tags: ["Health", "Python", "GenAI"],
    color: "secondary",
  },
  {
    id: 6,
    title: "Electricity Consumption Analyzer",
    description: "This Analyzer is very much effective with the power house data. visualize the power consumption details.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/Electricity-Consumption-Analyzer",
    tags: ["ML", "Python", "FastAPI"],
    color: "accent",
  },
  {
    id: 7,
    title: "Content Generation Platform",
    description: "This is a Chatbot which helps in the generating content for specially content generators and analyzers.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/ContentGenerator",
    tags: ["Social-Media", "Python", "AI"],
    color: "primary",
  },
  {
    id: 8,
    title: "Data Visualization and Analytics Dashboard",
    description: "This model uses graphs and visuals to make understanding about the given data.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/DataAnalyzer",
    tags: ["Data-Science", "Python", "Matplotlib"],
    color: "secondary",
  },
  {
    id: 9,
    title: "Autonomous Chatbot Agent",
    description: "This is a chatbot agent which can perform tasks on its own without any human interaction. It can be used in various fields like customer support, personal assistants, and more.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    githubUrl: "https://github.com/Hamza1106/chatbot",
    tags: ["AI", "ML", "Python"],
    color: "accent",
  },
];

export default projects;
