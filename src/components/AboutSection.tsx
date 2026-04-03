import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Zap, Sparkles } from "lucide-react";

const skills = [
  {
    icon: Brain,
    title: "AI & Automation",
    description: "Building intelligent systems that think, learn, and automate complex workflows with precision.",
    colorClass: "text-primary",
    glowClass: "shadow-[0_0_30px_hsl(200,100%,55%,0.15)]",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Crafting performant, beautiful web experiences with modern frameworks and cutting-edge tech.",
    colorClass: "text-secondary",
    glowClass: "shadow-[0_0_30px_hsl(270,80%,60%,0.15)]",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing systems for speed, scalability, and seamless user experiences across all devices.",
    colorClass: "text-accent",
    glowClass: "shadow-[0_0_30px_hsl(160,80%,45%,0.15)]",
  },
  {
    icon: Sparkles,
    title: "Creative Design",
    description: "Blending aesthetics with functionality to create immersive, memorable digital experiences.",
    colorClass: "text-primary",
    glowClass: "shadow-[0_0_30px_hsl(200,100%,55%,0.15)]",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-[120px] rounded-full" style={{ background: "hsl(270, 80%, 60%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm text-primary font-heading tracking-widest uppercase mb-4">
            Who am I?
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">Crafting the Future</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            I'm a developer obsessed with the intersection of AI and creativity.
            I build systems that don't just work — they think, adapt, and evolve.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={item}
              className={`glass rounded-2xl p-8 glow-border group hover:scale-[1.02] transition-transform duration-300 ${skill.glowClass}`}
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex p-3 rounded-xl glass mb-5 ${skill.colorClass}`}>
                <skill.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {skill.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-3 gap-6 mt-16"
        >
          {[
            { number: "50+", label: "Projects Built" },
            { number: "3+", label: "Years Experience" },
            { number: "∞", label: "Curiosity" },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass rounded-2xl py-8 glow-border">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
