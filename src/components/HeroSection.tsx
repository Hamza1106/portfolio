import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import IllustratedBoy from "./IllustratedBoy";

const storyLines = [
  { text: "Once upon a time, in a world of code and pixels...", delay: 0.5 },
  { text: "there lived a developer who dreamed in algorithms.", delay: 2.5 },
  { text: "He didn't just build websites — he crafted experiences.", delay: 5 },
];

const roles = [
  "AI Automation Expert",
  "Creative Developer",
  "Full-Stack Engineer",
  "Digital Storyteller",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [storyPhase, setStoryPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isBoyHovered, setIsBoyHovered] = useState(false);

  // Story intro sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setStoryPhase(1), 800),
      setTimeout(() => setStoryPhase(2), 3000),
      setTimeout(() => setStoryPhase(3), 5500),
      setTimeout(() => setShowContent(true), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, showContent]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic gradient backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "hsl(200, 100%, 55%)", top: "-10%", left: "-10%" }}
          animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "hsl(270, 80%, 60%)", bottom: "0%", right: "-5%" }}
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "hsl(160, 80%, 45%)", top: "40%", left: "30%" }}
          animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(200, 100%, 60%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(200, 100%, 60%) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* === STORYBOOK INTRO OVERLAY === */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center max-w-3xl px-6">
              {/* Book icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-flex mb-8"
              >
                <BookOpen className="w-16 h-16 text-primary/60" />
              </motion.div>

              {/* Story lines appearing one by one */}
              <div className="space-y-4">
                {storyLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={
                      storyPhase > i
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : {}
                    }
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-xl md:text-2xl font-heading text-foreground/80 italic leading-relaxed"
                  >
                    "{line.text}"
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MAIN HERO CONTENT === */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side - The illustrated boy */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ x: -60, opacity: 0 }}
            animate={showContent ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            onMouseEnter={() => setIsBoyHovered(true)}
            onMouseLeave={() => setIsBoyHovered(false)}
          >
            <IllustratedBoy />

            {/* Speech bubble when hovered */}
            <AnimatePresence>
              {isBoyHovered && (
                <motion.div
                  className="absolute -top-4 -right-4 md:right-[-120px] md:top-8 glass rounded-2xl rounded-bl-sm p-4 max-w-[200px] z-20"
                  initial={{ opacity: 0, scale: 0.7, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <p className="text-sm text-foreground font-body leading-snug">
                    Hey! 👋 I'm a developer who turns 
                    <span className="text-primary"> wild ideas</span> into 
                    <span className="text-accent"> real products</span>.
                  </p>
                  {/* Bubble tail */}
                  <div className="absolute -bottom-2 left-4 w-4 h-4 glass rotate-45 rounded-sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            className="text-center lg:text-left order-1 lg:order-2 flex-1"
            initial={{ x: 60, opacity: 0 }}
            animate={showContent ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            {/* Chapter badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
            >
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground font-heading tracking-widest uppercase">
                Chapter 1 — The Beginning
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-4"
            >
              <span className="text-foreground">Meet </span>
              <span className="text-gradient">Your Name</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="text-lg md:text-2xl font-heading text-muted-foreground mb-6 h-8"
            >
              <span>{displayText}</span>
              <span className="text-primary animate-pulse">|</span>
            </motion.div>

            {/* Story paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.7 }}
              className="text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 font-body leading-relaxed"
            >
              The boy sat at his desk, surrounded by glowing screens and infinite possibilities.
              He wasn't just writing code — he was
              <span className="text-primary"> automating the future</span> with AI,
              <span className="text-secondary"> crafting digital art</span>, and
              <span className="text-accent"> building the impossible</span>.
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.7, duration: 0.6 }}
              onClick={scrollToAbout}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass glow-border cursor-pointer font-heading font-medium text-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-4 h-4" />
              <span>Continue the Story</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating story elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <motion.div
          className="glass rounded-xl p-3 floating"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 0.5 } : {}}
          transition={{ delay: 2 }}
        >
          <span className="text-2xl">📖</span>
        </motion.div>
      </div>
      <div className="absolute bottom-32 right-16 hidden lg:block">
        <motion.div
          className="glass rounded-xl p-3 floating-delayed"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 0.5 } : {}}
          transition={{ delay: 2.3 }}
        >
          <span className="text-2xl">✨</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 0.4 } : {}}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
