"use client";
import { ImageWithAlt, images } from "@/lib/images";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import NextImage from "next/image";
import React, { useRef } from "react";

const Image = motion(NextImage);

type Props = {
  quote: string;
  author: string;
};

export const Quote = ({ quote, author }: Props) => {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );
  return (
    <div ref={target} className="h-[250vh] relative">
      <motion.div
        style={{ opacity }}
        className="sticky h-screen flex items-center overflow-hidden justify-center top-0 p-10"
      >
        <blockquote className="text-center md:text-left">
          <p className="text-3xl md:text-5xl font-cursive">{quote}</p>
          <footer className="text-muted-foreground text-right">
            - {author}
          </footer>
        </blockquote>
      </motion.div>
    </div>
  );
};
