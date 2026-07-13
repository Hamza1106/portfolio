import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, lazy, Suspense, FormEvent } from "react";
import { Github, Linkedin, Send, User, AtSign, MessageSquare, Phone, Type, CheckCircle2, ArrowUpRight, Loader2 } from "lucide-react";

const Planet = lazy(() => import("./Planet"));

type Field = "name" | "email" | "subject" | "phone" | "message";

const FloatingInput = ({
  id,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  as = "input",
  required = false,
}: {
  id: Field;
  label: string;
  type?: string;
  icon: typeof User;
  value: string;
  onChange: (v: string) => void;
  as?: "input" | "textarea";
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const commonProps = {
    id,
    name: id,
    value,
    onChange: (e: any) => onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    required,
    className:
      "w-full bg-transparent outline-none text-foreground font-body text-sm md:text-base px-4 pt-6 pb-2 relative z-10",
  };

  return (
    <div className="relative group">
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: focused
            ? "0 0 0 1px hsl(200 100% 55% / 0.6), 0 0 24px hsl(200 100% 55% / 0.35)"
            : "0 0 0 1px hsl(240 20% 30% / 0.4)",
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative glass rounded-xl overflow-hidden">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Icon className="w-4 h-4" style={{ opacity: active ? 0 : 1, transition: "opacity 0.2s" }} />
        </div>
        <motion.label
          htmlFor={id}
          animate={{
            y: active ? -12 : 0,
            x: active ? -20 : 0,
            scale: active ? 0.82 : 1,
            color: focused ? "hsl(200 100% 65%)" : "hsl(240 5% 60%)",
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-10 top-4 font-body text-sm origin-left pointer-events-none z-10"
        >
          {label}
        </motion.label>
        {as === "textarea" ? (
          <textarea {...commonProps} rows={5} className={commonProps.className + " pl-10 resize-none"} />
        ) : (
          <input {...commonProps} type={type} className={commonProps.className + " pl-10"} />
        )}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ originX: 0 }}
        />
      </div>
    </div>
  );
};

// ------------------ Connect Cards ------------------
type ConnectLink = {
  label: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  glow: string;
  accent: string;
  tag: string;
};

const FiverrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M23.004 15.588a1 1 0 100-2 1 1 0 000 2zm-6.174-3.705h-2.42v6.415h-2.086v-6.415h-1.5v-.084c0-.87.52-1.303 1.63-1.303h.65v-1.74h-1.084c-2.043 0-3.283 1.198-3.283 3.13v.997H7.34v-.084c0-.87.52-1.303 1.63-1.303h.412V9.756h-.845c-2.043 0-3.283 1.198-3.283 3.13v.997H3.652v1.74h1.601v4.675h2.086v-4.675h3.383v4.675h2.087v-4.675h2.42v4.675h2.086v-4.675h2.593v-1.74h-2.593v-.2c0-.5.325-.65.87-.65h1.7V9.756h-2.42c-2.042 0-3.176.998-3.176 2.976v.15z" />
  </svg>
);

const connectLinks: ConnectLink[] = [
  {
    label: "Fiverr",
    handle: "orbit_flow",
    href: "https://www.fiverr.com/orbit_flow",
    icon: FiverrIcon,
    glow: "hsl(160 80% 45%)",
    accent: "from-accent to-primary",
    tag: "Hire me",
  },
  {
    label: "GitHub",
    handle: "@hamza-akhtar",
    href: "https://github.com",
    icon: Github,
    glow: "hsl(200 100% 55%)",
    accent: "from-primary to-secondary",
    tag: "Open source",
  },
  {
    label: "LinkedIn",
    handle: "Hamza Akhtar",
    href: "https://linkedin.com",
    icon: Linkedin,
    glow: "hsl(270 80% 60%)",
    accent: "from-secondary to-primary",
    tag: "Network",
  },
];

const ConnectCard = ({ item, index }: { item: ConnectLink; index: number }) => {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
      }}
      className="group relative block glass-strong rounded-3xl p-8 overflow-hidden cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateX: hover ? (pos.y - 0.5) * -10 : 0,
          rotateY: hover ? (pos.x - 0.5) * 12 : 0,
          scale: hover ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Spotlight following cursor */}
        <motion.div
          className="absolute inset-0 -m-8 pointer-events-none rounded-3xl"
          animate={{ opacity: hover ? 1 : 0 }}
          style={{
            background: `radial-gradient(400px circle at ${pos.x * 100}% ${pos.y * 100}%, ${item.glow}33, transparent 60%)`,
          }}
        />

        {/* Corner glow */}
        <motion.div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          animate={{ opacity: hover ? 0.7 : 0.25, scale: hover ? 1.2 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ background: item.glow }}
        />

        {/* Top row: icon + arrow */}
        <div className="relative flex items-start justify-between mb-8">
          <motion.div
            animate={{
              y: hover ? -4 : 0,
              rotate: hover ? -6 : 0,
              boxShadow: hover
                ? `0 20px 40px -12px ${item.glow}, 0 0 30px ${item.glow}80`
                : `0 8px 24px -12px ${item.glow}60`,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-14 h-14 rounded-2xl glass flex items-center justify-center border border-white/10"
            style={{ transform: "translateZ(40px)" }}
          >
            <Icon className="w-6 h-6 text-foreground" />
            <motion.span
              className="absolute inset-0 rounded-2xl border"
              style={{ borderColor: item.glow }}
              animate={{ scale: hover ? 1.4 : 1, opacity: hover ? 0 : 0 }}
              transition={{ duration: 0.8, repeat: hover ? Infinity : 0 }}
            />
          </motion.div>

          <motion.div
            animate={{
              x: hover ? 4 : 0,
              y: hover ? -4 : 0,
              rotate: hover ? 0 : -45,
              opacity: hover ? 1 : 0.4,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10"
            style={{ transform: "translateZ(30px)" }}
          >
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </motion.div>
        </div>

        {/* Text */}
        <div className="relative" style={{ transform: "translateZ(20px)" }}>
          <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-heading text-muted-foreground mb-2">
            {item.tag}
          </span>
          <h3 className={`text-2xl md:text-3xl font-heading font-bold mb-1 bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}>
            {item.label}
          </h3>
          <p className="text-sm text-muted-foreground font-body">{item.handle}</p>
        </div>

        {/* Bottom animated line */}
        <div className="relative mt-8 h-[2px] w-full bg-white/5 rounded-full overflow-hidden" style={{ transform: "translateZ(10px)" }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: `linear-gradient(90deg, ${item.glow}, transparent)` }}
            animate={{ width: hover ? "100%" : "20%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Sweeping shine */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3 -skew-x-12"
            style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.08), transparent)" }}
            animate={{ x: hover ? ["-100%", "300%"] : "-100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.a>
  );
};

// ------------------ Main ------------------
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const set = (k: Field) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/hamza.akhtar0129@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || `New portfolio message from ${form.name}`,
          phone: form.phone,
          message: form.message,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] opacity-15 blur-[130px] rounded-full pointer-events-none" style={{ background: "hsl(200 100% 55%)" }} />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] opacity-10 blur-[130px] rounded-full pointer-events-none" style={{ background: "hsl(270 80% 60%)" }} />

      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(200 100% 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(270 80% 60%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${i * 25}%`}
            y1="0"
            x2={`${100 - i * 15}%`}
            y2="100%"
            stroke="url(#nl)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm text-secondary font-heading tracking-widest uppercase mb-4">
            Signal Received
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">Let's Build Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
            Have an idea? Want to collaborate? Transmit your message across the galaxy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-strong rounded-3xl p-6 md:p-10 glow-border relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: "hsl(200 100% 55%)" }} />

            <div className="relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput id="name" label="Full Name" icon={User} value={form.name} onChange={set("name")} required />
                <FloatingInput id="email" label="Email" type="email" icon={AtSign} value={form.email} onChange={set("email")} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput id="subject" label="Subject" icon={Type} value={form.subject} onChange={set("subject")} required />
                <FloatingInput id="phone" label="Phone (optional)" type="tel" icon={Phone} value={form.phone} onChange={set("phone")} />
              </div>
              <FloatingInput id="message" label="Your message" icon={MessageSquare} value={form.message} onChange={set("message")} as="textarea" required />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading text-sm font-medium overflow-hidden disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, hsl(200 100% 55%), hsl(270 80% 60%))",
                  color: "hsl(240 10% 4%)",
                  boxShadow: "0 12px 32px -10px hsl(200 100% 55% / 0.5)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {status === "sent" ? (
                      <motion.span key="sent" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Transmitted
                      </motion.span>
                    ) : status === "sending" ? (
                      <motion.span key="sending" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Transmitting…
                      </motion.span>
                    ) : status === "error" ? (
                      <motion.span key="err" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                        Try again
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-flex items-center gap-2">
                        Send Transmission <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{ background: "linear-gradient(115deg, transparent 40%, hsl(0 0% 100% / 0.35) 50%, transparent 60%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-6 rounded-full border border-secondary/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-8 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, hsl(200 100% 55% / 0.6), hsl(270 80% 60% / 0.3), transparent 70%)" }} />
              <div className="absolute inset-0">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">Loading planet…</div>}>
                  <Planet />
                </Suspense>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------------- Connect section ---------------- */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs text-accent font-heading tracking-[0.25em] uppercase mb-3">
              // Direct Channels
            </span>
            <h3 className="text-3xl md:text-5xl font-heading font-bold">
              <span className="text-gradient">Find Me Elsewhere</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {connectLinks.map((l, i) => (
              <ConnectCard key={l.label} item={l} index={i} />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground font-body mt-20"
        >
          Designed & Built with ✨ and a lot of ☕ by Hamza Akhtar
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
