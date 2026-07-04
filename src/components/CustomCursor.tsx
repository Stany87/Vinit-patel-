import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useSpring(0, { stiffness: 500, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 40 });
  const scaleX = useSpring(1, { stiffness: 400, damping: 35 });
  const scaleY = useSpring(1, { stiffness: 400, damping: 35 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const updateCursorLabel = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const open = target.closest("[data-cursor='open']");
      const book = target.closest("[data-cursor='book'], button.book-cta, a.book-cta");
      const img = target.closest("img, [data-cursor='view']");
      const link = target.closest("a, button");

      if (open) {
        setLabel("OPEN");
        scaleX.set(2.6);
        scaleY.set(2.6);
      } else if (book) {
        setLabel("BOOK");
        scaleX.set(2.6);
        scaleY.set(2.6);
      } else if (img) {
        setLabel("VIEW");
        scaleX.set(2.6);
        scaleY.set(2.6);
      } else if (link) {
        setLabel("");
        scaleX.set(1.8);
        scaleY.set(1.8);
      } else {
        setLabel("");
        scaleX.set(1);
        scaleY.set(1);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousemove", updateCursorLabel);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", updateCursorLabel);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        left: mouseX,
        top: mouseY,
        scaleX,
        scaleY,
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden
    >
      {label && <span className="custom-cursor__label">{label}</span>}
    </motion.div>
  );
}
