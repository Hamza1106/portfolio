import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Compass, Zap, Trophy } from "lucide-react";
import type { Project } from "@/data/projects";

const STEPS = [
  { key: "problem", label: "Problem", icon: Target },
  { key: "approach", label: "Approach", icon: Compass },
  { key: "challenge", label: "Challenge", icon: Zap },
  { key: "result", label: "Result", icon: Trophy },
] as const;

type CaseStudyModalProps = {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * A full "case file" overlay, portaled straight to document.body so it can
 * never be clipped by an ancestor's overflow-hidden or perspective (both of
 * which exist around the shelf area). Presented as a connected vertical
 * timeline rather than a stacked accordion — reads like opening a dossier.
 */
const CaseStudyModal = ({ project, isOpen, onClose }: CaseStudyModalProps) => {
  if (!project.caseStudy) return null;
  const cs = project.caseStudy;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(5, 6, 10, 0.75)", backdropFilter: "blur(10px)" }}
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-[1.75rem] p-8 sm:p-10"
            style={{
              background: "linear-gradient(165deg, hsl(240 25% 10% / 0.97), hsl(240 30% 5% / 0.99))",
              border: `1px solid hsl(${project.accent} / 0.25)`,
              boxShadow: `0 40px 100px -30px rgba(0,0,0,0.9), 0 0 80px -20px hsl(${project.accent} / 0.25)`,
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full glass text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-heading uppercase tracking-widest"
              style={{
                background: `hsl(${project.accent} / 0.12)`,
                color: `hsl(${project.accent})`,
                border: `1px solid hsl(${project.accent} / 0.3)`,
              }}
            >
              Case File
            </span>
            <h3 className="mb-1 text-2xl font-heading font-bold sm:text-3xl">
              <span className="text-gradient">{project.title}</span>
            </h3>
            <p className="mb-8 text-xs uppercase tracking-wide text-muted-foreground font-body">
              {project.category}
            </p>

            <div className="relative space-y-8">
              <div
                className="absolute left-[15px] top-2 bottom-2 w-px"
                style={{ background: `linear-gradient(to bottom, hsl(${project.accent} / 0.5), transparent)` }}
              />
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                    className="relative flex gap-4"
                  >
                    <div
                      className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `hsl(${project.accent} / 0.15)`,
                        border: `1px solid hsl(${project.accent} / 0.5)`,
                        color: `hsl(${project.accent})`,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <span
                        className="text-[10px] font-heading uppercase tracking-widest"
                        style={{ color: `hsl(${project.accent})` }}
                      >
                        {step.label}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/85 font-body">{cs[step.key]}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CaseStudyModal;