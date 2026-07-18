import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { hslStringToHex } from "@/lib/color";
import Box3D from "./Box3D";

const COLS = 2;
const BOX_SIZE = 76;

type CupboardGridProps = {
  projects: Project[];
  parallax?: { x: number; y: number };
  onSelect: (index: number) => void;
};

/** A small metal bolt/rivet, one per corner — a physical hardware detail. */
const Rivet = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
  const pos: Record<typeof position, string> = {
    tl: "top-3 left-3",
    tr: "top-3 right-3",
    bl: "bottom-3 left-3",
    br: "bottom-3 right-3",
  };
  return (
    <div
      className={`absolute h-2.5 w-2.5 rounded-full ${pos[position]}`}
      style={{
        background: "radial-gradient(circle at 35% 30%, #f2f2f2, #9a9ea3 45%, #35373a 100%)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.7), inset 0 -1px 1px rgba(0,0,0,0.5)",
      }}
    />
  );
};

/** A small rivet dot used at the ends of shelf rails. */
const MiniRivet = () => (
  <div
    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
    style={{
      background: "radial-gradient(circle at 35% 30%, #eee, #888 55%, #2c2c2c 100%)",
      boxShadow: "0 1px 1px rgba(0,0,0,0.6)",
    }}
  />
);

/** A physical metal shelf rail between rows, riveted at both ends. */
const ShelfRail = () => (
  <div className="mx-1 flex items-center gap-2">
    <MiniRivet />
    <div
      className="h-[4px] flex-1 rounded-sm"
      style={{
        background: "linear-gradient(180deg, #7a7f87, #2c2f33 55%, #111214)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.22)",
      }}
    />
    <MiniRivet />
  </div>
);

/**
 * A realistic brushed-gunmetal display cabinet — metallic gradient shell,
 * a subtle diagonal brushed-metal texture, corner rivets, a colored accent
 * ring around the inner window (so it doesn't read as flat grey), an
 * engraved metal plaque, and riveted metal shelf rails, holding a 3-row x
 * 2-column grid — one box per project, no repeats, no caption clutter.
 *
 * Each box sits inside a padded, isolated hit-area with its own stacking
 * context (relative + z-0, bumped to z-20 on hover/focus) — needed because
 * the tilted cube visually spills a little past its own box. Hover feedback
 * is a plain CSS transition (not framer's whileHover) — that's deliberate:
 * a per-frame animated scale on many tightly-packed 3D-tilted elements was
 * producing a faint constant "wiggle" as hover state flickered between
 * neighbours; a CSS transition is cheaper and settles instantly.
 */
const CupboardGrid = ({ projects, onSelect }: CupboardGridProps) => {
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += COLS) {
    rows.push(projects.slice(i, i + COLS));
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* soft colored ambient glow behind the whole cabinet */}
      <div
        className="absolute -inset-10 -z-10 rounded-[3rem] opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 25% 20%, hsl(200 100% 55% / 0.22), transparent 55%), radial-gradient(circle at 75% 80%, hsl(270 80% 60% / 0.18), transparent 55%)",
        }}
      />

      {/* ground shadow — makes the cabinet feel like it's resting on a surface */}
      <div
        className="absolute -bottom-4 left-1/2 h-8 w-[75%] -translate-x-1/2 rounded-full opacity-60 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.85), transparent 70%)" }}
      />

      {/* engraved metal header plaque */}
      <div
        className="absolute -top-3.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-heading uppercase tracking-widest text-white/75"
        style={{
          background: "linear-gradient(160deg, #4b5058, #24272b)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -1px 2px rgba(0,0,0,0.6), 0 8px 18px -8px rgba(0,0,0,0.8)",
        }}
      >
        <Sparkles className="h-3 w-3 text-primary" />
        Project Vault
      </div>

      {/* brushed steel outer shell */}
      <div
        className="relative rounded-[1.5rem] p-[3px] shadow-[0_35px_80px_-30px_rgba(0,0,0,0.9)]"
        style={{
          background:
            "linear-gradient(135deg, #dfe3e7 0%, #9298a0 18%, #45484d 40%, #6e737a 55%, #26282b 75%, #a7abb0 100%)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[1.3rem] px-8 py-8"
          style={{
            background: "linear-gradient(165deg, #2c2f34 0%, #17181b 55%, #0c0d0e 100%)",
            boxShadow: "inset 0 2px 18px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* colored accent ring — a slim conic-gradient border around the inner
              window so the cabinet doesn't read as flat, dull grey metal */}
          <div
            className="absolute inset-2 rounded-[1.1rem] pointer-events-none opacity-50"
            style={{
              padding: 1,
              background:
                "conic-gradient(from 0deg, hsl(200 100% 55%), hsl(270 80% 60%), hsl(160 80% 45%), hsl(200 100% 55%))",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* subtle brushed-metal diagonal texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(97deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 4px)",
              mixBlendMode: "overlay",
            }}
          />
          {/* soft top light catch, like light hitting a curved metal edge */}
          <div
            className="absolute inset-x-6 top-0 h-12 rounded-b-full opacity-[0.06] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, white, transparent 70%)" }}
          />

          <Rivet position="tl" />
          <Rivet position="tr" />
          <Rivet position="bl" />
          <Rivet position="br" />

          <div className="relative flex flex-col gap-4">
            {rows.map((rowProjects, rowIdx) => (
              <div key={rowIdx} className="flex flex-col gap-4">
                <div className="flex justify-center gap-8">
                  {rowProjects.map((project) => {
                    const globalIndex = projects.findIndex((p) => p.id === project.id);
                    const hex = hslStringToHex(project.accent);
                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => onSelect(globalIndex)}
                        aria-label={`Open ${project.title}`}
                        className="group relative z-0 rounded-xl p-2.5 hover:z-20 focus:z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      >
                        {/* colored glow halo, only visible on hover/focus */}
                        <span
                          className="absolute inset-0 rounded-xl opacity-0 blur-lg transition-opacity duration-300 ease-out group-hover:opacity-70 group-focus-visible:opacity-70 pointer-events-none"
                          style={{ background: hex }}
                        />
                        <span className="relative block transition-transform duration-200 ease-out group-hover:scale-110 group-active:scale-95">
                          <Box3D size={BOX_SIZE} colorHex={hex} opened={false} />
                        </span>
                      </button>
                    );
                  })}
                </div>
                {rowIdx < rows.length - 1 && <ShelfRail />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CupboardGrid;