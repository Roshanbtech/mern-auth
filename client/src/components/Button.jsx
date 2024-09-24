import { useRef, useState } from "react";
import { motion } from "framer-motion";

const TARGET_TEXT = "Click Me"; // Default text if none is provided
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const AnimatedButton = ({ text = TARGET_TEXT, onClick }) => {
  const intervalRef = useRef(null);
  const [scrambledText, setScrambledText] = useState(text);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");
      setScrambledText(scrambled);
      pos++;
      if (pos >= text.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setScrambledText(text);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border-[1px] border-blue-400 bg-black px-4 py-2 font-mono font-medium uppercase text-blue-400 transition-colors hover:text-blue-300"
    >
      <div className="relative z-10">{scrambledText}</div>
      {/* Hover gradient effect */}
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-blue-400/0 from 40% via-blue-400/100 to-blue-400/0 to to-10% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default AnimatedButton;
