import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const IllustratedBoy = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[320px] h-[420px] md:w-[400px] md:h-[500px] cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow behind character */}
      <motion.div
        className="absolute inset-0 rounded-full blur-[80px] opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)), hsl(var(--secondary)), transparent)" }}
        animate={{ scale: isHovered ? 1.3 : 1, opacity: isHovered ? 0.35 : 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Floor / ground shadow */}
      <motion.div
        className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[180px] h-[20px] rounded-full bg-primary/10 blur-xl"
        animate={{ width: isHovered ? 140 : 180, opacity: isHovered ? 0.15 : 0.25 }}
        transition={{ duration: 0.6 }}
      />

      <svg
        viewBox="0 0 400 500"
        className="relative z-10 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === CHAIR === */}
        <motion.g
          animate={{ opacity: isHovered ? 0.3 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Chair seat */}
          <rect x="140" y="330" width="120" height="12" rx="4" fill="hsl(230, 20%, 18%)" stroke="hsl(200, 100%, 55%)" strokeWidth="1" strokeOpacity="0.3" />
          {/* Chair back */}
          <rect x="240" y="250" width="12" height="92" rx="4" fill="hsl(230, 20%, 15%)" stroke="hsl(200, 100%, 55%)" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="244" y="260" width="4" height="20" rx="2" fill="hsl(200, 100%, 55%)" fillOpacity="0.3" />
          <rect x="244" y="290" width="4" height="20" rx="2" fill="hsl(270, 80%, 60%)" fillOpacity="0.3" />
          {/* Chair legs */}
          <rect x="148" y="342" width="8" height="60" rx="3" fill="hsl(230, 20%, 15%)" stroke="hsl(200, 100%, 55%)" strokeWidth="0.5" strokeOpacity="0.2" />
          <rect x="244" y="342" width="8" height="60" rx="3" fill="hsl(230, 20%, 15%)" stroke="hsl(200, 100%, 55%)" strokeWidth="0.5" strokeOpacity="0.2" />
        </motion.g>

        {/* === BOY CHARACTER === */}
        <motion.g
          animate={
            isHovered
              ? { y: -60, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } }
              : { y: 0, transition: { duration: 0.5, ease: "easeOut" } }
          }
        >
          {/* Body / Torso - hoodie */}
          <motion.g
            animate={isHovered ? { scaleY: 1.05, originY: 1 } : { scaleY: 1 }}
            transition={{ duration: 0.6 }}
          >
            <path
              d="M170 280 Q170 240, 200 230 Q230 220, 230 260 L235 330 L165 330 Z"
              fill="hsl(230, 25%, 12%)"
              stroke="hsl(200, 100%, 55%)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Hoodie highlight */}
            <path
              d="M185 240 Q200 235, 215 240"
              stroke="hsl(200, 100%, 55%)"
              strokeWidth="1"
              strokeOpacity="0.3"
              fill="none"
            />
            {/* Chest glow line */}
            <motion.line
              x1="200" y1="250" x2="200" y2="310"
              stroke="hsl(200, 100%, 55%)"
              strokeWidth="1"
              animate={{ strokeOpacity: isHovered ? 0.6 : 0.2 }}
              transition={{ duration: 0.5 }}
            />
          </motion.g>

          {/* Head */}
          <motion.g
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Hair */}
            <ellipse cx="200" cy="195" rx="38" ry="15" fill="hsl(230, 30%, 8%)" />
            {/* Head shape */}
            <ellipse cx="200" cy="210" rx="32" ry="35" fill="hsl(30, 40%, 70%)" />
            {/* Hair overlay */}
            <path
              d="M168 205 Q168 180, 200 175 Q232 180, 232 205"
              fill="hsl(230, 30%, 8%)"
            />
            {/* Eyes */}
            <motion.g
              animate={isHovered ? { scaleY: 1.2 } : { scaleY: 1 }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <ellipse cx="188" cy="215" rx="4" ry="4" fill="hsl(var(--background))" />
              <ellipse cx="212" cy="215" rx="4" ry="4" fill="hsl(var(--background))" />
              {/* Eye shine */}
              <motion.circle
                cx="190" cy="213" r="1.5"
                fill="hsl(200, 100%, 55%)"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              />
              <motion.circle
                cx="214" cy="213" r="1.5"
                fill="hsl(200, 100%, 55%)"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              />
            </motion.g>
            {/* Mouth */}
            <motion.path
              d={isHovered ? "M192 228 Q200 236, 208 228" : "M194 226 Q200 230, 206 226"}
              stroke="hsl(0, 50%, 60%)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              transition={{ duration: 0.4 }}
            />
            {/* Glasses (tech vibe) */}
            <rect x="180" y="208" width="16" height="14" rx="3" stroke="hsl(200, 100%, 55%)" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
            <rect x="204" y="208" width="16" height="14" rx="3" stroke="hsl(200, 100%, 55%)" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
            <line x1="196" y1="215" x2="204" y2="215" stroke="hsl(200, 100%, 55%)" strokeWidth="1" strokeOpacity="0.4" />
          </motion.g>

          {/* Arms */}
          {/* Left arm - resting on lap when sitting, waving when standing */}
          <motion.path
            d={
              isHovered
                ? "M170 260 Q150 240, 140 210 Q135 195, 145 190"
                : "M170 260 Q155 280, 160 310 Q162 320, 165 325"
            }
            stroke="hsl(30, 40%, 70%)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Right arm */}
          <motion.path
            d={
              isHovered
                ? "M230 260 Q250 280, 255 310"
                : "M230 260 Q245 280, 240 310 Q238 320, 235 325"
            }
            stroke="hsl(30, 40%, 70%)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Waving hand sparkle */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.circle
                  cx="145" cy="185"
                  r="3"
                  fill="hsl(200, 100%, 55%)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
                />
                <motion.circle
                  cx="135" cy="195"
                  r="2"
                  fill="hsl(270, 80%, 60%)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, repeat: Infinity, repeatDelay: 0.5 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Legs */}
          <motion.g
            animate={
              isHovered
                ? { y: 20 }
                : { y: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            {/* Left leg */}
            <motion.path
              d={
                isHovered
                  ? "M180 330 L178 390 L170 395"
                  : "M180 330 Q175 350, 178 370 Q180 385, 170 390"
              }
              stroke="hsl(230, 30%, 15%)"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              transition={{ duration: 0.5 }}
            />
            {/* Right leg */}
            <motion.path
              d={
                isHovered
                  ? "M220 330 L222 390 L230 395"
                  : "M220 330 Q225 350, 222 370 Q220 385, 230 390"
              }
              stroke="hsl(230, 30%, 15%)"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              transition={{ duration: 0.5 }}
            />
            {/* Shoes */}
            <motion.ellipse
              cx={isHovered ? "165" : "165"}
              cy={isHovered ? "397" : "392"}
              rx="15"
              ry="6"
              fill="hsl(200, 100%, 40%)"
              transition={{ duration: 0.5 }}
            />
            <motion.ellipse
              cx={isHovered ? "235" : "235"}
              cy={isHovered ? "397" : "392"}
              rx="15"
              ry="6"
              fill="hsl(200, 100%, 40%)"
              transition={{ duration: 0.5 }}
            />
          </motion.g>
        </motion.g>

        {/* Laptop on lap (only when sitting) */}
        <AnimatePresence>
          {!isHovered && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <rect x="170" y="310" width="60" height="5" rx="2" fill="hsl(230, 20%, 20%)" stroke="hsl(200, 100%, 55%)" strokeWidth="0.8" strokeOpacity="0.4" />
              <rect x="175" y="290" width="50" height="20" rx="2" fill="hsl(230, 25%, 10%)" stroke="hsl(200, 100%, 55%)" strokeWidth="0.8" strokeOpacity="0.3" />
              {/* Screen glow */}
              <rect x="178" y="293" width="44" height="14" rx="1" fill="hsl(200, 100%, 55%)" fillOpacity="0.1" />
              {/* Code lines on screen */}
              <line x1="182" y1="298" x2="205" y2="298" stroke="hsl(200, 100%, 55%)" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="182" y1="302" x2="195" y2="302" stroke="hsl(270, 80%, 60%)" strokeWidth="1" strokeOpacity="0.4" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* "Hover me" hint */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            hover over me ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IllustratedBoy;
