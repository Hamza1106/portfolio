import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, lazy, Suspense, FormEvent } from "react";
import { Mail, Github, Linkedin, Send, User, AtSign, MessageSquare, Phone, Type, CheckCircle2 } from "lucide-react";

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
        {/* Focus glow bar */}
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

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: Field) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Ambient bg */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] opacity-15 blur-[130px] rounded-full pointer-events-none" style={{ background: "hsl(200 100% 55%)" }} />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] opacity-10 blur-[130px] rounded-full pointer-events-none" style={{ background: "hsl(270 80% 60%)" }} />

      {/* Neural lines */}
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
          {/* LEFT — Form */}
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
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading text-sm font-medium overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(200 100% 55%), hsl(270 80% 60%))",
                  color: "hsl(240 10% 4%)",
                  boxShadow: "0 12px 32px -10px hsl(200 100% 55% / 0.5)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span key="sent" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Transmitted
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

              <div className="pt-4 flex flex-wrap gap-3 border-t border-white/5 mt-6">
                {[
                  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map((l) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <l.icon className="w-3.5 h-3.5" /> {l.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.form>

          {/* RIGHT — Planet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Orbit rings */}
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
              {/* Glow behind planet */}
              <div className="absolute inset-8 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, hsl(200 100% 55% / 0.6), hsl(270 80% 60% / 0.3), transparent 70%)" }} />

              <div className="absolute inset-0">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">Loading planet…</div>}>
                  <Planet />
                </Suspense>
              </div>
            </div>
          </motion.div>
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
