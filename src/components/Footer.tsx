import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Sparkles } from "lucide-react";

const FiverrIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
    <path d="M23.004 15.588a1 1 0 100-2 1 1 0 000 2zm-6.174-3.705h-2.42v6.415h-2.086v-6.415h-1.5v-.084c0-.87.52-1.303 1.63-1.303h.65v-1.74h-1.084c-2.043 0-3.283 1.198-3.283 3.13v.997H7.34v-.084c0-.87.52-1.303 1.63-1.303h.412V9.756h-.845c-2.043 0-3.283 1.198-3.283 3.13v.997H3.652v1.74h1.601v4.675h2.086v-4.675h3.383v4.675h2.087v-4.675h2.42v4.675h2.086v-4.675h2.593v-1.74h-2.593v-.2c0-.5.325-.65.87-.65h1.7V9.756h-2.42c-2.042 0-3.176.998-3.176 2.976v.15z" />
  </svg>
);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

type Social = { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; href: string; label: string; color: string };

const socials: Social[] = [
  { icon: Github,     href: "https://github.com/Hamza1106",          label: "GitHub",   color: "hsl(270 80% 60%)" },
  { icon: Linkedin,   href: "https://www.linkedin.com/in/hamza-akhtar-8ab424415/",                  label: "LinkedIn", color: "hsl(160 80% 45%)" },
  { icon: FiverrIcon, href: "https://www.fiverr.com/orbit_flow",     label: "Fiverr",   color: "hsl(200 100% 55%)" },
  { icon: Mail,       href: "#contact",                              label: "Email",    color: "hsl(310 80% 60%)" },
];

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(200 100% 55% / 0.6) 30%, hsl(270 80% 60% / 0.6) 70%, transparent 100%)" }}
      />
      <div
        className="absolute -top-28 left-1/2 -translate-x-1/2 w-[700px] h-56 opacity-20 blur-[120px] rounded-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, hsl(200 100% 55%), hsl(270 80% 60%))" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start pb-12 border-b border-white/5">

          {/* Brand */}
          <div>
            <button onClick={scrollTop} className="text-2xl font-heading font-bold text-gradient inline-block mb-3">
              Hamza Akhtar
            </button>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
              Creative developer &amp; AI automation engineer crafting immersive digital experiences.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-heading text-emerald-400 tracking-wide">Available for work</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="md:justify-self-center">
            <p className="text-[10px] font-heading tracking-[0.2em] uppercase text-muted-foreground mb-4">Navigation</p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors relative group w-fit">
                  {l.label}
                  <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </nav>

          {/* Socials */}
          <div className="md:justify-self-end">
            <p className="text-[10px] font-heading tracking-[0.2em] uppercase text-muted-foreground mb-4">Connect</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group"
                >
                  <span
                    className="absolute inset-0 rounded-xl opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      padding: "1px",
                      background: color,
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  <span className="absolute inset-[1px] rounded-xl bg-background/80 pointer-events-none" />
                  <span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 16px ${color}60` }}
                  />
                  <Icon className="w-4 h-4 relative z-10 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
            <span>© {year} Hamza Akhtar. Crafted with</span>
            <Sparkles className="w-3 h-3 text-primary" />
            <span>&amp; a lot of ☕</span>
          </div>

          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2.5 text-xs font-heading tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top
            <span className="relative w-7 h-7 rounded-full flex items-center justify-center">
              <span
                className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                style={{
                  padding: "1px",
                  background: "linear-gradient(135deg, hsl(200 100% 55%), hsl(270 80% 60%))",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <ArrowUp className="w-3 h-3 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;