import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Zap, Sparkles, BookOpen } from "lucide-react";

const storyChapters = [
  {
    icon: Brain,
    title: "Chapter 2: The AI Awakening",
    narrative: "He discovered the power of artificial intelligence — machines that could think, learn, and create alongside him.",
    description: "Building intelligent systems that automate complex workflows, from chatbots to predictive models.",
    colorClass: "text-primary",
    borderColor: "border-primary/20",
    glowBg: "hsl(200, 100%, 55%)",
  },
  {
    icon: Code,
    title: "Chapter 3: The Code Forge",
    narrative: "Late nights turned into masterpieces — lines of code weaving together into beautiful digital tapestries.",
    description: "Crafting performant, beautiful web experiences with React, TypeScript, and cutting-edge frameworks.",
    colorClass: "text-secondary",
    borderColor: "border-secondary/20",
    glowBg: "hsl(270, 80%, 60%)",
  },
  {
    icon: Zap,
    title: "Chapter 4: The Speed Demon",
    narrative: "Speed became his obsession — every millisecond mattered, every interaction had to feel instant.",
    description: "Optimizing systems for blazing performance, seamless UX, and infinite scalability.",
    colorClass: "text-accent",
    borderColor: "border-accent/20",
    glowBg: "hsl(160, 80%, 45%)",
  },
  {
    icon: Sparkles,
    title: "Chapter 5: The Artist",
    narrative: "But code alone wasn't enough. He needed art, motion, and magic to truly captivate.",
    description: "Blending aesthetics with functionality — animations, micro-interactions, and immersive design.",
    colorClass: "text-primary",
    borderColor: "border-primary/20",
    glowBg: "hsl(200, 100%, 55%)",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      {/* Section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-[120px] rounded-full"
        style={{ background: "hsl(270, 80%, 60%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header - storybook style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
          >
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground font-heading tracking-widest uppercase">
              The Story Continues
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">His Journey Unfolds</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body italic">
            "Every great developer has a story. This is mine — told through the chapters that shaped who I am."
          </p>
        </motion.div>

        {/* Story chapters as a vertical timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-secondary/40 to-accent/40"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <div className="space-y-16 md:space-y-24">
            {storyChapters.map((chapter, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={chapter.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                  >
                    <div className={`w-12 h-12 rounded-full glass flex items-center justify-center ${chapter.borderColor} border`}>
                      <chapter.icon className={`w-5 h-5 ${chapter.colorClass}`} />
                    </div>
                    {/* Dot glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-lg opacity-30"
                      style={{ background: chapter.glowBg }}
                    />
                  </motion.div>

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-4" : "md:pl-4"}`}>
                    <motion.div
                      className={`glass rounded-2xl p-6 md:p-8 glow-border group hover:scale-[1.02] transition-transform duration-300`}
                      whileHover={{ y: -4 }}
                    >
                      <h3 className={`text-lg font-heading font-semibold ${chapter.colorClass} mb-3`}>
                        {chapter.title}
                      </h3>
                      <p className="text-foreground/80 font-body italic mb-4 text-sm leading-relaxed">
                        "{chapter.narrative}"
                      </p>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">
                        {chapter.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats as story epilogue */}
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
                whileHover={{
                  y: -14,
                  rotateX: -12,
                  rotateY: 8,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                className="relative text-center glass rounded-2xl py-6 md:py-8 glow-border cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 10px 30px -12px hsl(200 100% 55% / 0.25), 0 4px 12px -6px hsl(270 80% 60% / 0.2)",
                }}
              >
                <div
                  className="text-2xl md:text-4xl font-heading font-bold text-gradient mb-2"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs md:text-sm text-muted-foreground font-body"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {stat.label}
                </div>
                {/* Floating glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, hsl(200 100% 55% / 0.25), transparent 70%)",
                    transform: "translateZ(-10px)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
