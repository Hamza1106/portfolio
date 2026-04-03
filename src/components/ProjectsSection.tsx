import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X, Play } from "lucide-react";
import projects, { type Project } from "@/data/projects";

const colorMap = {
  primary: {
    border: "hover:shadow-[0_0_40px_hsl(200,100%,55%,0.2)]",
    tag: "bg-primary/10 text-primary",
  },
  secondary: {
    border: "hover:shadow-[0_0_40px_hsl(270,80%,60%,0.2)]",
    tag: "bg-secondary/10 text-secondary",
  },
  accent: {
    border: "hover:shadow-[0_0_40px_hsl(160,80%,45%,0.2)]",
    tag: "bg-accent/10 text-accent",
  },
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const colors = colorMap[project.color];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`glass rounded-2xl p-6 cursor-pointer glow-border group transition-shadow duration-500 ${colors.border}`}
    >
      {/* Card number */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground font-heading">
          #{String(project.id).padStart(2, "0")}
        </span>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-gradient transition-all">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className={`text-xs px-2 py-1 rounded-full font-body ${colors.tag}`}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative glass-strong rounded-3xl p-8 max-w-2xl w-full glow-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-muted transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <span className="text-xs text-primary font-heading tracking-widest uppercase">
          Project #{String(project.id).padStart(2, "0")}
        </span>
        <h3 className="text-3xl font-heading font-bold text-gradient mt-2 mb-4">
          {project.title}
        </h3>
        <p className="text-muted-foreground font-body mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Video embed */}
        <div className="relative rounded-2xl overflow-hidden glass mb-6 aspect-video flex items-center justify-center">
          <div className="text-center">
            <Play className="w-12 h-12 text-primary mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">Demo Video</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full glass text-muted-foreground font-body">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass glow-border font-heading text-sm text-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            View Code
          </a>
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-heading text-sm hover:bg-primary/20 transition-colors"
          >
            <Play className="w-4 h-4" />
            Watch Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6" ref={ref}>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-10 blur-[120px] rounded-full" style={{ background: "hsl(160, 80%, 45%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm text-accent font-heading tracking-widest uppercase mb-4">
            My Work
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            A collection of AI-powered tools, creative experiments, and production applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
