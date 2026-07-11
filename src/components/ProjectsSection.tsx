import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, MouseEvent } from "react";
import { Github, Play, ExternalLink, Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import projects, { type Project } from "@/data/projects";

const ShelfCard = ({
  project,
  index,
  isActive,
  onHover,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onHover: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 12 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 120, damping: 18 }}
      animate={{
        x: isActive ? -60 : 0,
        scale: isActive ? 1.04 : 1,
        rotateX: tilt.x,
        rotateY: isActive ? tilt.y - 4 : tilt.y,
        zIndex: isActive ? 30 : 10 - index,
      }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "right center",
      }}
      className="relative cursor-pointer group"
    >
      {/* Card body — sticks out from shelf via negative right */}
      <div
        className="relative glass-strong rounded-2xl px-5 py-4 border overflow-hidden"
        style={{
          borderColor: `hsl(${project.accent} / ${isActive ? 0.6 : 0.25})`,
          boxShadow: isActive
            ? `0 20px 60px -20px hsl(${project.accent} / 0.5), 0 0 40px hsl(${project.accent} / 0.3)`
            : `0 8px 24px -12px hsl(${project.accent} / 0.25)`,
          background: `linear-gradient(135deg, hsl(${project.accent} / 0.08), hsl(${project.accent} / 0.02))`,
        }}
      >
        {/* Light sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(115deg, transparent 40%, hsl(${project.accent} / 0.25) 50%, transparent 60%)`,
          }}
          animate={isActive ? { x: ["-100%", "100%"] } : {}}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-heading text-sm font-bold"
              style={{
                background: `hsl(${project.accent} / 0.15)`,
                color: `hsl(${project.accent})`,
                border: `1px solid hsl(${project.accent} / 0.4)`,
              }}
            >
              {String(project.id).padStart(2, "0")}
            </div>
            <div>
              <h4 className="text-sm md:text-base font-heading font-semibold text-foreground leading-tight">
                {project.title}
              </h4>
              <p className="text-[10px] md:text-xs text-muted-foreground font-body uppercase tracking-widest mt-0.5">
                {project.category}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ x: isActive ? 4 : 0 }}
            className="w-8 h-8 rounded-full glass flex items-center justify-center"
            style={{ color: `hsl(${project.accent})` }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Bottom edge glow */}
        <div
          className="absolute bottom-0 left-4 right-4 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, hsl(${project.accent} / 0.6), transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
};

const ProjectDetails = ({ project }: { project: Project }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3">
      <span
        className="inline-flex items-center gap-1.5 text-[10px] font-heading uppercase tracking-widest px-3 py-1 rounded-full"
        style={{
          background: `hsl(${project.accent} / 0.12)`,
          color: `hsl(${project.accent})`,
          border: `1px solid hsl(${project.accent} / 0.3)`,
        }}
      >
        <Sparkles className="w-3 h-3" />
        {project.category}
      </span>
      <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground font-body">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        {project.status}
      </span>
      <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground font-body">
        <Clock className="w-3 h-3" />
        {project.timeline}
      </span>
    </div>

    <h3 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
      <span className="text-gradient">{project.title}</span>
    </h3>

    <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
      {project.description}
    </p>

    <div className="grid grid-cols-2 gap-2">
      {project.features.map((f, i) => (
        <motion.div
          key={f}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.06 }}
          className="flex items-center gap-2 text-sm text-foreground/80 font-body"
        >
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: `hsl(${project.accent})` }} />
          {f}
        </motion.div>
      ))}
    </div>

    <div className="flex flex-wrap gap-2">
      {project.tags.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.05 }}
          className="text-xs px-3 py-1 rounded-full glass font-body text-muted-foreground"
        >
          {tag}
        </motion.span>
      ))}
    </div>

    <div className="flex flex-wrap gap-3 pt-2">
      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-sm font-medium relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(${project.accent} / 0.9), hsl(${project.accent} / 0.6))`,
          color: "hsl(240 10% 4%)",
          boxShadow: `0 8px 24px -8px hsl(${project.accent} / 0.6)`,
        }}
      >
        <ExternalLink className="w-4 h-4" /> Live Demo
      </motion.a>
      <motion.a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glow-border font-heading text-sm text-foreground"
      >
        <Github className="w-4 h-4" /> GitHub
      </motion.a>
      <motion.a
        href={project.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-heading text-sm text-foreground"
      >
        <Play className="w-4 h-4" /> Watch Demo
      </motion.a>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [activeId, setActiveId] = useState<number>(projects[0].id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient bg */}
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] opacity-20 blur-[140px] rounded-full pointer-events-none"
        style={{ background: `hsl(${active.accent})` }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-10 blur-[120px] rounded-full pointer-events-none"
        style={{ background: "hsl(270 80% 60%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-sm text-accent font-heading tracking-widest uppercase mb-4">
            The Vault
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Hover a card on the shelf. Each project slides out and reveals its story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — details */}
          <div className="relative min-h-[540px] lg:min-h-[600px]">
            <AnimatePresence mode="wait">
              <ProjectDetails project={active} />
            </AnimatePresence>
          </div>

          {/* RIGHT — shelf */}
          <div className="relative" style={{ perspective: "1400px" }}>
            {/* Shelf structure */}
            <div className="relative py-8">
              {/* Back plane */}
              <div
                className="absolute inset-0 rounded-3xl border border-white/5"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(240 20% 8% / 0.6), hsl(240 30% 4% / 0.9))",
                  boxShadow:
                    "inset 0 0 60px hsl(240 30% 2% / 0.9), 0 30px 80px -30px hsl(200 100% 50% / 0.15)",
                  transform: "translateZ(-40px)",
                }}
              />
              {/* Top rail */}
              <div
                className="absolute left-0 right-0 top-0 h-3 rounded-t-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(200 100% 55% / 0.5), hsl(270 80% 60% / 0.5), transparent)",
                  filter: "blur(1px)",
                }}
              />
              {/* Bottom rail */}
              <div
                className="absolute left-0 right-0 bottom-0 h-3 rounded-b-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(160 80% 45% / 0.5), hsl(200 100% 55% / 0.5), transparent)",
                  filter: "blur(1px)",
                }}
              />
              {/* Ambient inner glow */}
              <div
                className="absolute inset-4 rounded-2xl opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 30% 50%, hsl(${active.accent} / 0.3), transparent 70%)`,
                  transition: "background 0.6s",
                }}
              />

              {/* Cards stack — sticking out on the right */}
              <div
                className="relative space-y-3 pl-6 pr-0 py-6"
                style={{ transformStyle: "preserve-3d" }}
                onMouseLeave={() => setActiveId(projects[0].id)}
              >
                {projects.map((p, i) => (
                  <div key={p.id} className="pr-[-30px]" style={{ marginRight: "-30px" }}>
                    <ShelfCard
                      project={p}
                      index={i}
                      isActive={activeId === p.id}
                      onHover={() => setActiveId(p.id)}
                    />
                  </div>
                ))}
              </div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{
                    background: `hsl(${active.accent})`,
                    left: `${20 + i * 12}%`,
                    top: `${10 + (i % 3) * 30}%`,
                    boxShadow: `0 0 8px hsl(${active.accent})`,
                  }}
                  animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
