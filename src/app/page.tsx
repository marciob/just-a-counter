"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export default function Home() {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for dec, 1 for inc

  const decrement = () => {
    setDirection(-1);
    setCount((prev) => prev - 1);
  };

  const increment = () => {
    setDirection(1);
    setCount((prev) => prev + 1);
  };

  return (
    <main className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden select-none">
      {/* Background/Click Areas */}
      <div className="absolute inset-0 flex flex-row">
        {/* Decrease Zone (Left) */}
        <div
          onClick={decrement}
          className="w-1/2 h-full cursor-pointer active:bg-white/5 transition-colors duration-200 group relative"
        >
          {/* Hover Hint */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-red-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          <span className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-800 text-6xl font-thin opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            -
          </span>
        </div>

        {/* Increase Zone (Right) */}
        <div
          onClick={increment}
          className="w-1/2 h-full cursor-pointer active:bg-white/5 transition-colors duration-200 group relative"
        >
           {/* Hover Hint */}
           <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-emerald-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
           <span className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-800 text-6xl font-thin opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            +
          </span>
        </div>
      </div>

      {/* Counter Display */}
      <div className="pointer-events-none z-10 flex flex-col items-center">
        <div className="relative h-[14rem] sm:h-[18rem] md:h-[22rem] w-full flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.span
              key={count}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  y: direction > 0 ? 50 : -50,
                  opacity: 0,
                  scale: 0.5,
                  filter: "blur(10px)",
                }),
                center: {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                },
                exit: (direction: number) => ({
                  y: direction > 0 ? -50 : 50,
                  opacity: 0,
                  scale: 1.5,
                  filter: "blur(10px)",
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                filter: { duration: 0.2 },
              }}
              className={clsx(
                "absolute text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold tracking-tighter tabular-nums",
                count === 0 ? "text-zinc-500" : "text-white"
              )}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer: Label + Reset */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        <p className="text-zinc-600 text-sm italic font-medium tracking-widest uppercase opacity-50">
          Just A Counter
        </p>
        {count !== 0 && (
          <button
            onClick={() => {
              setDirection(0);
              setCount(0);
            }}
            className="pointer-events-auto text-zinc-700 hover:text-zinc-400 text-xs uppercase tracking-widest transition-colors duration-200"
          >
            Reset
          </button>
        )}
      </div>
    </main>
  );
}
