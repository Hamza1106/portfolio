import { motion } from "framer-motion";
import { shadeHex } from "@/lib/color";

type Box3DProps = {
  size: number;
  colorHex: string;
  opened?: boolean;
  glow?: boolean;
  tiltX?: number;
  tiltY?: number;
};

/**
 * A real 6-face CSS 3D cube (transform-style: preserve-3d), not a WebGL object.
 * Five faces are plain static divs. The lid (top face) is a static OUTER
 * wrapper (placed once, never animated — so it never fights framer's own
 * transform pipeline) containing an INNER motion.div that framer actually
 * rotates open around its back edge, like a real hinged lid, when `opened`
 * toggles true.
 */
const Box3D = ({ size, colorHex, opened = false, glow = false, tiltX = -22, tiltY = 32 }: Box3DProps) => {
  const half = size / 2;

  const front = colorHex;
  const back = shadeHex(colorHex, -0.35);
  const right = shadeHex(colorHex, -0.2);
  const left = shadeHex(colorHex, -0.3);
  const top = shadeHex(colorHex, 0.25);
  const bottom = shadeHex(colorHex, -0.45);

  const faceBase: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    backfaceVisibility: "hidden",
  };

  return (
    <div style={{ width: size, height: size, perspective: 900, pointerEvents: "none" }}>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        <div style={{ ...faceBase, background: back, transform: `rotateY(180deg) translateZ(${half}px)` }} />
        <div style={{ ...faceBase, background: right, transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceBase, background: left, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceBase, background: bottom, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        <div
          style={{
            ...faceBase,
            background: front,
            transform: `translateZ(${half}px)`,
            boxShadow: glow ? `0 0 18px ${colorHex}99, inset 0 0 12px ${colorHex}55` : undefined,
          }}
        />
        {/* lid — outer div is a static placement (never animated, so it never
            fights framer's transform pipeline); the INNER motion.div is what
            actually swings open, hinged along its back edge, like a real lid
            opening rather than just fading away */}
        <div
          style={{
            ...faceBase,
            transform: `rotateX(90deg) translateZ(${half}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: top,
              transformOrigin: "top center",
              backfaceVisibility: "hidden",
            }}
            animate={{ rotateX: opened ? -130 : 0 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </div>
    </div>
  );
};

export default Box3D;