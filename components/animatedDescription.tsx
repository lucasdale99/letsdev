"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedDescription = ({
  descriptions,
}: {
  descriptions: string[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % descriptions.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={currentIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg text-muted-foreground"
      >
        {descriptions[currentIndex]}
      </motion.p>
    </AnimatePresence>
  );
};
