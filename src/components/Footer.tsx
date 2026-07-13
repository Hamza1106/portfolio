import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const FiverrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M23.004 15.588a1 1 0 100-2 1 1 0 000 2zm-6.174-3.705h-2.42v6.415h-2.086v-6.415h-1.5v-.084c0-.87.52-1.303 1.63-1.303h.65v-1.74h-1.084c-2.043 0-3.283 1.198-3.283 3.13v.997H7.34v-.084c0-.87.52-1.303 1.63-1.303h.412V9.756h-.845c-2.043 0-3.283 1.198-3.283 3.13v.997H3.652v1.74h1.601v4.675h2.086v-4.675h3.383v4.675h2.087v-4.675h2.42v4.675h2.086v-4.675h2.593v-1.74h-2.593v-.2c0-.5.325-.65.87-.65h1.7V9.756h-2.42c-2.042 0-3.176.998-3.176 2.976v.15z" />
  </svg>
);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiverrIcon, href: "https://www.fiverr.com/orbit_flow", label: "Fiverr" },
  { icon: Mail, href: "mailto:hamza.akhtar0129@gmail.com", label: "Email" },
];

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 mt-20">
      {/* subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(200 100% 55% / 0.5), hsl(270 80% 60% / 0.5), transparent)",
        }}
      />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 opacity-20 blur-[100px] rounded-full pointer-events-none"
        style={{ background: "hsl(200 100% 55%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div>
            <button
              onClick={scrollTop}
              className="text-2xl font-heading font-bold text-gradient inline-block"
            >
              Hamza Akhtar
            </button>
            <p className="mt-3 text-sm text-muted-foreground font-body max-w-xs">
              Creative developer &amp; AI automation engineer crafting immersive
              digital experiences.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap md:justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex md:justify-end gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/25 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © {year} Hamza Akhtar. Designed &amp; built with ✨ and a lot of ☕
          </p>
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-xs font-heading tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors group"
          >
            Back to top
            <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
