import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:hamzaqureshi0128@gmail.com", color: "text-primary" },
  { icon: Github, label: "GitHub", href: "https://github.com/Hamza1106", color: "text-secondary" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/hamza-akhtar-8ab424415/", color: "text-accent" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-sm text-secondary font-heading tracking-widest uppercase mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">Let's Build Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body mb-12">
            Have an idea? Want to collaborate? Let's create something extraordinary.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl px-8 py-6 glow-border flex items-center gap-4 hover:scale-105 transition-transform duration-300"
              whileHover={{ y: -5 }}
            >
              <link.icon className={`w-6 h-6 ${link.color}`} />
              <span className="font-heading font-medium text-foreground">{link.label}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground font-body mt-20"
        >
          Designed & Built with ✨ and a lot of ☕
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
