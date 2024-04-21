"use client";
import {
  useScroll,
  motion,
  MotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { ReactNode, useRef } from "react";
import bg from "@/assets/starrynight.jpg";

type Props = {
  value: string;
};

export const TextOpacityScroll = ({ value }: Props) => {
  const el = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: el,
    offset: ["start 0.9", "start 0.25"],
  });
  const words = value.split(" ");
  return (
    <div
      style={{ backgroundImage: `url(${bg.src})` }}
      className="min-h-screen relative flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="max-w-screen-2xl mx-auto px-10 py-20">
        <p
          ref={el}
          className="relative flex flex-wrap gap-2 text-3xl md:text-5xl font-medium font-serif"
        >
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export const Word = ({
  children,
  range,
  progress,
}: {
  children: ReactNode;
  range: [number, number];
  progress: MotionValue;
}) => {
  const opacity = useSpring(useTransform(progress, range, [0.1, 1]), {
    bounce: 0,
  });
  return <motion.span style={{ opacity }}>{children}</motion.span>;
};
