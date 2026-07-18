import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, MouseEvent } from "react";
import { Github, FileText, ExternalLink, Sparkles, ArrowRight, CheckCircle2, Clock, MousePointerClick } from "lucide-react";
import projects, { type Project } from "@/data/projects";
import CupboardGrid from "./CupboardGrid";
import FocusedBoxCard from "./FocusedBoxCard";
import CaseStudyModal from "./CaseStudyModal";

const spring = { type: "spring" as const, stiffness: 180, damping: 22, mass: 1 };

const ProjectDetails = ({ project }: { project: Project }) => {
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  return (
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
        {project.caseStudy && (
          <motion.button
            type="button"
            onClick={() => setShowCaseStudy(true)}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-heading text-sm text-foreground"
          >
            <FileText className="w-4 h-4" /> Case Study
          </motion.button>
        )}
      </div>

      {project.caseStudy && (
        <CaseStudyModal project={project} isOpen={showCaseStudy} onClose={() => setShowCaseStudy(false)} />
      )}
    </motion.div>
  );
};

const EmptyState = ({ hint }: { hint?: string }) => (
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
      {hint ?? "Select a card from the shelf to explore its story, technologies, challenges and live demo."}
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
      {hint ? "Tap the card" : "Slide one out"}
      <ArrowRight className="w-4 h-4" />
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [detailsId, setDetailsId] = useState<number | null>(null);

  const focusedProject = focusedIndex !== null ? projects[focusedIndex] : null;
  const active = projects.find((p) => p.id === detailsId) ?? null;
  const glowSource = active ?? focusedProject;

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

  const handleSelectBox = (index: number) => {
    setFocusedIndex(index);
    setDetailsId(null);
  };

  const handleBack = () => {
    setFocusedIndex(null);
    setDetailsId(null);
  };

  return (
    <section id="projects" className="relative pt-32 pb-6  px-6 overflow-hidden">
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] opacity-20 blur-[140px] rounded-full pointer-events-none transition-colors duration-700"
        style={{ background: glowSource ? `hsl(${glowSource.accent})` : "hsl(200 100% 55%)" }}
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
            Pull a box out of the shelf. Each one holds its own story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT — details / empty state */}
          <div className="relative min-h-[540px] lg:min-h-[600px] flex items-center pl-2 lg:pl-6">
            <div className="w-full">
              <AnimatePresence mode="wait">
                {active ? (
                  <ProjectDetails key={active.id} project={active} />
                ) : (
                  <EmptyState key="empty" hint={focusedProject ? "Tap the card that slid out of the box to see its story." : undefined} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — cupboard grid, or the single focused/opened box */}
          <div
            className="relative flex items-center justify-center min-h-[540px] lg:min-h-[680px]"
            style={{ perspective: "1600px" }}
            ref={shelfRef}
            onMouseMove={handleShelfMove}
            onMouseLeave={resetParallax}
          >
            <AnimatePresence mode="wait">
              {focusedProject ? (
                <FocusedBoxCard
                  key={focusedProject.id}
                  project={focusedProject}
                  index={focusedIndex!}
                  detailsOpen={active !== null}
                  onOpenCard={() => setDetailsId(focusedProject.id)}
                  onBack={handleBack}
                />
              ) : (
                <CupboardGrid key="grid" projects={projects} parallax={parallax} onSelect={handleSelectBox} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;