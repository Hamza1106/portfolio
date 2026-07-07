import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    const observe = () => {
      document.querySelectorAll("a, button, [role='button'], .cursor-pointer").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };

    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full border border-primary/50"
        style={{ zIndex: 9999 }}
        animate={{
          x: pos.x - (hovering ? 24 : 16),
          y: pos.y - (hovering ? 24 : 16),
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: hovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none w-1.5 h-1.5 rounded-full bg-primary"
        style={{ zIndex: 9999 }}
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />
    </>
  );
};

export default CustomCursor;
