import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, MouseEvent } from "react";
import { Github, Play, ExternalLink, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Clock, MousePointerClick } from "lucide-react";
import projects, { type Project } from "@/data/projects";

const spring = { type: "spring" as const, stiffness: 180, damping: 22, mass: 1 };

const ShelfCard = ({
  project,
  index,
  total,
  isActive,
  hasSelection,
  onSelect,
  parallax,
}: {
  project: Project;
  index: number;
  total: number;
  isActive: boolean;
  hasSelection: boolean;
  onSelect: () => void;
  parallax: { x: number; y: number };
}) => {
  // Default: card is inserted ~55% into shelf. We visually achieve this by setting
  // the card's rest x to a negative value (sticking left/inside) — the outer container
  // extends past the shelf-right so the outside 40-45% is visible.
  const restX = 0;
  const pulledX = 140; // slide fully out
  const dimmedX = -20; // other cards recede slightly

  const x = isActive ? pulledX : hasSelection ? dimmedX : restX;

  return (
    <motion.div
      onClick={onSelect}
      initial={{ opacity: 0, x: 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, ...spring }}
      animate={{
        x,
        scale: isActive ? 1.06 : hasSelection ? 0.96 : 1,
        rotateY: isActive ? -6 + parallax.x * 0.5 : parallax.x * 0.3,
        rotateX: parallax.y * -0.3,
        zIndex: isActive ? 40 : total - index,
        filter: hasSelection && !isActive ? "brightness(0.6) blur(0.5px)" : "brightness(1)",
      }}
      whileHover={!isActive ? { x: 20, scale: 1.02 } : {}}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
      }}
      className="relative cursor-pointer group"
    >
      <div
        className="relative glass-strong rounded-r-2xl rounded-l-md px-5 py-4 border overflow-hidden"
        style={{
          borderColor: `hsl(${project.accent} / ${isActive ? 0.7 : 0.25})`,
          borderLeftWidth: 3,
          borderLeftColor: `hsl(${project.accent} / ${isActive ? 1 : 0.6})`,
          boxShadow: isActive
            ? `0 30px 80px -20px hsl(${project.accent} / 0.7), 0 0 60px hsl(${project.accent} / 0.4), inset 0 0 30px hsl(${project.accent} / 0.08)`
            : `0 10px 30px -18px hsl(${project.accent} / 0.35), inset 2px 0 10px hsl(240 30% 2% / 0.6)`,
          background: `linear-gradient(135deg, hsl(${project.accent} / 0.10), hsl(240 20% 8% / 0.6))`,
        }}
      >
        {/* corner illumination */}
        <div
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top left, hsl(${project.accent} / 0.6), transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none"
          style={{
            background: `radial-gradient(circle at bottom left, hsl(${project.accent} / 0.4), transparent 70%)`,
          }}
        />

        {/* Light sweep on active */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(115deg, transparent 40%, hsl(${project.accent} / 0.25) 50%, transparent 60%)`,
          }}
          animate={isActive ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />

        <div className="flex items-center justify-between relative z-10 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-heading text-sm font-bold flex-shrink-0"
              style={{
                background: `hsl(${project.accent} / 0.15)`,
                color: `hsl(${project.accent})`,
                border: `1px solid hsl(${project.accent} / 0.4)`,
              }}
            >
              {String(project.id).padStart(2, "0")}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm md:text-base font-heading font-semibold text-foreground leading-tight truncate">
                {project.title}
              </h4>
              <p className="text-[10px] md:text-xs text-muted-foreground font-body uppercase tracking-widest mt-0.5 truncate">
                {project.category}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ x: isActive ? 4 : 0, rotate: isActive ? 0 : 0 }}
            className="w-8 h-8 rounded-full glass flex items-center justify-center flex-shrink-0"
            style={{ color: `hsl(${project.accent})` }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-4 right-4 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, hsl(${project.accent} / 0.6), transparent)`,
          }}
        />
      </div>

      {/* ambient glow behind active card */}
      {isActive && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.3 }}
          transition={{ duration: 0.6 }}
          style={{
            background: `radial-gradient(ellipse at center, hsl(${project.accent} / 0.35), transparent 70%)`,
            filter: "blur(30px)",
          }}
        />
      )}
    </motion.div>
  );
};

const ProjectDetails = ({ project }: { project: Project }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="space-y-6"
  >
    <div className="flex items-center gap-3 flex-wrap">
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

const EmptyState = () => (
  <motion.div
    key="empty"
    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="space-y-8"
  >
    <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
      <MousePointerClick className="w-3.5 h-3.5 text-primary" />
      <span className="text-[10px] text-muted-foreground font-heading tracking-widest uppercase">
        Interactive Vault
      </span>
    </div>

    <h3 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
      <span className="text-gradient">Pick a project</span>
      <br />
      <span className="text-foreground/90">from the shelf.</span>
    </h3>

    <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-md">
      Select a card from the shelf to explore its story, technologies, challenges and live demo.
    </p>

    <motion.div
      className="flex items-center gap-3 text-primary font-heading text-sm tracking-widest uppercase"
      animate={{ x: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="relative flex items-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <span className="w-2 h-2 rounded-full bg-primary" />
      </span>
      Slide one out
      <ArrowRight className="w-4 h-4" />
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;
  const shelfRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleShelfMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = shelfRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: px * 6, y: py * 6 });
  };

  const resetParallax = () => setParallax({ x: 0, y: 0 });

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] opacity-20 blur-[140px] rounded-full pointer-events-none transition-colors duration-700"
        style={{ background: active ? `hsl(${active.accent})` : "hsl(200 100% 55%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-10 blur-[120px] rounded-full pointer-events-none"
        style={{ background: "hsl(270 80% 60%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
            Pull a card out of the shelf. Each one holds its own story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — details / empty state */}
          <div className="relative min-h-[540px] lg:min-h-[600px] flex items-center">
            <div className="w-full">
              <AnimatePresence mode="wait">
                {active ? <ProjectDetails key={active.id} project={active} /> : <EmptyState key="empty" />}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — futuristic 3D shelf */}
          <div
            className="relative"
            style={{ perspective: "1600px" }}
            ref={shelfRef}
            onMouseMove={handleShelfMove}
            onMouseLeave={resetParallax}
          >
            <motion.div
              className="relative py-8 pr-16"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: parallax.x * -0.4, rotateX: parallax.y * 0.4 }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              {/* Shelf cabinet frame */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(240 25% 9% / 0.85), hsl(240 30% 4% / 0.95))",
                  boxShadow: [
                    "inset 0 0 80px hsl(240 30% 2% / 0.9)",
                    "inset 0 2px 0 hsl(210 30% 40% / 0.15)",
                    "inset 0 -2px 0 hsl(210 30% 40% / 0.1)",
                    "inset 2px 0 0 hsl(210 30% 40% / 0.1)",
                    "inset -2px 0 0 hsl(210 30% 40% / 0.1)",
                    "0 40px 100px -30px hsl(200 100% 50% / 0.2)",
                  ].join(", "),
                  border: "1px solid hsl(210 30% 25% / 0.3)",
                  transform: "translateZ(-40px)",
                }}
              />

              {/* Metallic frame edges */}
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(210 40% 60% / 0.4) 20%, hsl(210 40% 80% / 0.6) 50%, hsl(210 40% 60% / 0.4) 80%, transparent)",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1 rounded-b-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(210 40% 60% / 0.3) 20%, hsl(210 40% 70% / 0.5) 50%, hsl(210 40% 60% / 0.3) 80%, transparent)",
                }}
              />

              {/* Neon top/bottom accent glows */}
              <div
                className="absolute left-0 right-0 top-1 h-[2px] blur-sm"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(200 100% 55% / 0.7), hsl(270 80% 60% / 0.7), transparent)",
                }}
              />
              <div
                className="absolute left-0 right-0 bottom-1 h-[2px] blur-sm"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(160 80% 45% / 0.7), hsl(200 100% 55% / 0.7), transparent)",
                }}
              />

              {/* Vertical shelf inner-left edge (where cards slot in) */}
              <div
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, hsl(200 100% 55% / 0.4), hsl(270 80% 60% / 0.4), hsl(160 80% 45% / 0.4), transparent)",
                  boxShadow: "0 0 20px hsl(200 100% 55% / 0.4)",
                }}
              />

              {/* Ambient inner glow — follows active */}
              <motion.div
                className="absolute inset-4 rounded-2xl pointer-events-none"
                animate={{
                  background: active
                    ? `radial-gradient(ellipse at 20% 50%, hsl(${active.accent} / 0.35), transparent 70%)`
                    : `radial-gradient(ellipse at 50% 50%, hsl(200 100% 55% / 0.1), transparent 70%)`,
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Cards stack */}
              <div
                className="relative space-y-4 pl-4 py-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                {projects.map((p, i) => (
                  <ShelfCard
                    key={p.id}
                    project={p}
                    index={i}
                    total={projects.length}
                    isActive={activeId === p.id}
                    hasSelection={activeId !== null}
                    onSelect={() => setActiveId((cur) => (cur === p.id ? null : p.id))}
                    parallax={parallax}
                  />
                ))}
              </div>

              {/* Close hint when a card is out */}
              <AnimatePresence>
                {active && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={() => setActiveId(null)}
                    className="absolute -bottom-2 right-6 inline-flex items-center gap-2 text-[10px] text-muted-foreground hover:text-foreground font-heading tracking-widest uppercase glass rounded-full px-3 py-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Slide back
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
