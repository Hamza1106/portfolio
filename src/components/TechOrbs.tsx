import { motion, useInView } from "framer-motion";
import { lazy, Suspense, useRef } from "react";

const TechOrbGrid = lazy(() => import("./TechOrbGrid"));

const SIZE = 104;

const SkeletonGrid = () => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 md:gap-4 justify-items-center">
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-3">
        <div
          className="rounded-full animate-pulse bg-white/5 border border-white/10"
          style={{ width: SIZE, height: SIZE }}
        />
        <div className="h-3 w-12 rounded bg-white/5 animate-pulse" />
      </div>
    ))}
  </div>
);

const TechOrbs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-muted-foreground font-body italic mb-3">
            "The tools of his craft..."
          </p>
          <h3 className="text-2xl md:text-3xl font-heading font-bold">
            <span className="text-gradient">Arsenal of Languages</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-2 font-body">
            Drag any orb to give it a spin
          </p>
        </motion.div>

        <Suspense fallback={<SkeletonGrid />}>
          <TechOrbGrid />
        </Suspense>
      </div>
    </section>
  );
};

export default TechOrbs;