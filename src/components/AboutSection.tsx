import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Code, Zap, Sparkles, BookOpen } from "lucide-react";
import TechOrbs from "./TechOrbs";

const storyChapters = [
  {
    icon: Brain,
    title: "Chapter 2: The AI Awakening",
    narrative: "He discovered the power of artificial intelligence — machines that could think, learn, and create alongside him.",
    description: "Building intelligent systems that automate complex workflows, from chatbots to predictive models.",
    colorClass: "text-primary",
    borderColor: "border-primary/30",
    glowBg: "hsl(200, 100%, 55%)",
  },
  {
    icon: Code,
    title: "Chapter 3: The Code Forge",
    narrative: "Late nights turned into masterpieces — lines of code weaving together into beautiful digital tapestries.",
    description: "Crafting performant, beautiful web experiences with React, TypeScript, and cutting-edge frameworks.",
    colorClass: "text-secondary",
    borderColor: "border-secondary/30",
    glowBg: "hsl(270, 80%, 60%)",
  },
  {
    icon: Zap,
    title: "Chapter 4: The Speed Demon",
    narrative: "Speed became his obsession — every millisecond mattered, every interaction had to feel instant.",
    description: "Optimizing systems for blazing performance, seamless UX, and infinite scalability.",
    colorClass: "text-accent",
    borderColor: "border-accent/30",
    glowBg: "hsl(160, 80%, 45%)",
  },
  {
    icon: Sparkles,
    title: "Chapter 5: The Artist",
    narrative: "But code alone wasn't enough. He needed art, motion, and magic to truly captivate.",
    description: "Blending aesthetics with functionality — animations, micro-interactions, and immersive design.",
    colorClass: "text-primary",
    borderColor: "border-primary/30",
    glowBg: "hsl(200, 100%, 55%)",
  },
];

const spring = { type: "spring" as const, stiffness: 260, damping: 22, mass: 0.9 };

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-[120px] rounded-full pointer-events-none"
        style={{ background: "hsl(270, 80%, 60%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground font-heading tracking-widest uppercase">
              The Story Continues
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">His Journey Unfolds</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body italic">
            "Every great developer has a story. This is mine — told through the chapters that shaped who I am."
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30 overflow-hidden"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <motion.div
              className="absolute left-0 w-full h-32 -top-32"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(200 100% 65% / 0.9), hsl(270 80% 70% / 0.9), transparent)",
                filter: "blur(1px)",
              }}
              animate={{ y: ["0%", "1600%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {storyChapters.map((chapter, i) => {
              const isLeft = i % 2 === 0;
              const Icon = chapter.icon;
              const isHovered = hovered === i;
              const isDimmed = hovered !== null && hovered !== i;
              // detach direction: left cards move further left, right cards further right
              const detachX = isHovered ? (isLeft ? -32 : 32) : 0;
              const detachRotY = isHovered ? (isLeft ? -5 : 5) : 0;

              return (
                <motion.div
                  key={chapter.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon on timeline */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-20 group"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.6 + i * 0.15 }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      {[0, 1].map((r) => (
                        <motion.span
                          key={r}
                          className={`absolute inset-0 rounded-full border ${chapter.borderColor}`}
                          animate={{
                            scale: isHovered ? [1, 2.8] : [1, 2.2],
                            opacity: [isHovered ? 0.9 : 0.6, 0],
                          }}
                          transition={{
                            duration: isHovered ? 1.6 : 2.8,
                            repeat: Infinity,
                            delay: r * (isHovered ? 0.8 : 1.4),
                            ease: "easeOut",
                          }}
                        />
                      ))}
                      <motion.div
                        className="absolute inset-0 rounded-full blur-2xl"
                        animate={{ opacity: isHovered ? 1 : 0.6, scale: isHovered ? 1.6 : 1 }}
                        transition={spring}
                        style={{ background: chapter.glowBg }}
                      />
                      <motion.div
                        animate={{ scale: isHovered ? 1.15 : 1 }}
                        transition={spring}
                        className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full glass-strong flex items-center justify-center border-2 ${chapter.borderColor}`}
                        style={{
                          boxShadow: `0 0 30px ${chapter.glowBg}, inset 0 0 12px ${chapter.glowBg}40`,
                        }}
                      >
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${chapter.colorClass}`} />
                      </motion.div>

                      {/* Particles escaping from node when hovered */}
                      <AnimatePresence>
                        {isHovered &&
                          [...Array(6)].map((_, p) => {
                            const angle = (p / 6) * Math.PI * 2;
                            const dx = Math.cos(angle) * 60 * (isLeft ? -1 : 1);
                            const dy = Math.sin(angle) * 40;
                            return (
                              <motion.span
                                key={p}
                                className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full pointer-events-none"
                                style={{ background: chapter.glowBg, boxShadow: `0 0 8px ${chapter.glowBg}` }}
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                animate={{ x: dx, y: dy, opacity: [0, 1, 0], scale: [0, 1, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: p * 0.08, ease: "easeOut" }}
                              />
                            );
                          })}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-56px)] ${isLeft ? "md:pr-4" : "md:pl-4"}`}
                    style={{ perspective: "1200px" }}
                    animate={{ opacity: isDimmed ? 0.55 : 1, filter: isDimmed ? "blur(1px)" : "blur(0px)" }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      onHoverStart={() => setHovered(i)}
                      onHoverEnd={() => setHovered((h) => (h === i ? null : h))}
                      animate={{
                        x: detachX,
                        rotateY: detachRotY,
                        rotateX: isHovered ? 2 : 0,
                        scale: isHovered ? 1.03 : 1,
                        z: isHovered ? 40 : 0,
                      }}
                      transition={spring}
                      className="glass rounded-2xl p-6 md:p-8 glow-border relative overflow-hidden cursor-pointer"
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: isLeft ? "right center" : "left center",
                        boxShadow: isHovered
                          ? `0 30px 80px -20px ${chapter.glowBg}, 0 0 60px ${chapter.glowBg}80, inset 0 0 30px ${chapter.glowBg}15`
                          : "0 10px 30px -20px hsl(240 30% 2% / 0.5)",
                      }}
                    >
                      {/* Animated connector line — stretches on hover */}
                      <motion.div
                        className={`hidden md:block absolute top-1/2 ${
                          isLeft ? "right-0" : "left-0"
                        } h-[2px] origin-${isLeft ? "left" : "right"}`}
                        style={{
                          [isLeft ? "right" : "left"]: 0,
                          transform: `translate${isLeft ? "X(100%)" : "X(-100%)"} translateY(-50%)`,
                          background: `linear-gradient(${isLeft ? "to right" : "to left"}, ${chapter.glowBg}, transparent)`,
                          boxShadow: `0 0 10px ${chapter.glowBg}`,
                        } as React.CSSProperties}
                        animate={{
                          width: isHovered ? 72 : 40,
                          opacity: isHovered ? 1 : 0.7,
                        }}
                        transition={spring}
                      >
                        {/* Energy pulse traveling along connector */}
                        {isHovered && (
                          <motion.span
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                            style={{
                              background: chapter.glowBg,
                              boxShadow: `0 0 12px ${chapter.glowBg}, 0 0 24px ${chapter.glowBg}`,
                            }}
                            initial={{ [isLeft ? "left" : "right"]: "0%" }}
                            animate={{ [isLeft ? "left" : "right"]: ["0%", "100%"] } as any}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </motion.div>

                      {/* Ambient glow inside card */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          background: `radial-gradient(circle at ${isLeft ? "100%" : "0%"} 50%, ${chapter.glowBg}22, transparent 60%)`,
                        }}
                      />

                      <h3 className={`text-lg md:text-xl font-heading font-semibold ${chapter.colorClass} mb-3 relative`}>
                        {chapter.title}
                      </h3>
                      <p className="text-foreground/80 font-body italic mb-4 text-sm leading-relaxed relative">
                        "{chapter.narrative}"
                      </p>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed relative">
                        {chapter.description}
                      </p>
                    </motion.div>
                  </motion.div>

                  <div className="hidden md:block md:w-[calc(50%-56px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <TechOrbs />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-24"
        >
          <p className="text-center text-muted-foreground font-body italic mb-8">
            "And the numbers spoke for themselves..."
          </p>
          <div className="grid grid-cols-3 gap-4 md:gap-6" style={{ perspective: "1200px" }}>
            {[
              { number: "50+", label: "Projects Built" },
              { number: "3+", label: "Years of Story" },
              { number: "∞", label: "Curiosity" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -14, rotateX: -12, rotateY: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                className="relative text-center glass rounded-2xl py-6 md:py-8 glow-border cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 10px 30px -12px hsl(200 100% 55% / 0.25), 0 4px 12px -6px hsl(270 80% 60% / 0.2)",
                }}
              >
                <div className="text-2xl md:text-4xl font-heading font-bold text-gradient mb-2" style={{ transform: "translateZ(30px)" }}>
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-body" style={{ transform: "translateZ(20px)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
