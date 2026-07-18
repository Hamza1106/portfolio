import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { hslStringToHex } from "@/lib/color";
import Box3D from "./Box3D";

const BOX_SIZE = 200;

type FocusedBoxCardProps = {
  project: Project;
  index: number;
  detailsOpen: boolean;
  onOpenCard: () => void;
  onBack: () => void;
};

/**
 * Shown once a box is picked from the cupboard grid. The card, box and back
 * button are all plain normal-flow flex children (nothing absolutely
 * positioned, nothing translated by a large negative Y). That's deliberate:
 * absolute + large negative translateY was what let the card escape above
 * the section and clip under the navbar. Spacing between all three is
 * controlled by one single `gap` value below — change GAP to move
 * everything closer/further apart at once.
 */
const GAP = 12; // px of space between card, box, and the back button
const DOWN_SHIFT = 0; // px — shifts the whole box+card+button group down a touch

const FocusedBoxCard = ({ project, index, detailsOpen, onOpenCard, onBack }: FocusedBoxCardProps) => {
  const [opened, setOpened] = useState(false);
  const accentHex = hslStringToHex(project.accent);

  useEffect(() => {
    setOpened(false);
    const t = setTimeout(() => setOpened(true), 350);
    return () => clearTimeout(t);
  }, [project.id]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center"
      style={{ gap: GAP, marginTop: DOWN_SHIFT }}
    >
      <AnimatePresence>
        {opened && (
          <motion.button
            type="button"
            onClick={onOpenCard}
            initial={{ opacity: 0, y: 40, scale: 0.4, rotate: -8 }}
            animate={{ opacity: 1, y: -14, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.6, rotate: -6, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 }}
            whileHover={{ y: -18, scale: 1.03 }}
            className="relative z-10 flex h-40 w-40 flex-col justify-between rounded-xl border p-4 text-left shadow-2xl backdrop-blur-md"
            style={{
              borderColor: `${accentHex}66`,
              background: "linear-gradient(160deg, hsl(240 25% 12% / 0.9), hsl(240 30% 6% / 0.95))",
              boxShadow: `0 20px 50px -20px ${accentHex}55, 0 0 0 1px ${accentHex}22 inset`,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                style={{ background: `${accentHex}26`, color: accentHex }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/40" />
            </div>
            <div>
              <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">{project.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-white/45">{project.category}</p>
            </div>
            {!detailsOpen && (
              <span className="text-[11px] font-medium" style={{ color: accentHex }}>
                Tap to explore →
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="pb-14">
        <Box3D size={BOX_SIZE} colorHex={accentHex} opened={opened} glow tiltX={-18} tiltY={28} />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="relative z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to shelf
      </button>
    </motion.div>
  );
};

export default FocusedBoxCard;