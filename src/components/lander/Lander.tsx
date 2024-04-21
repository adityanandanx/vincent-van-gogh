"use client";
import React, { useRef } from "react";
import starryNight from "@/assets/starrynight.jpg";
import starryNight2 from "@/assets/Starry_Night_Over_the_Rhone.jpg";
import vincent from "@/assets/selfportrait.jpg";
import NextImage, { StaticImageData } from "next/image";
import {
  MotionConfig,
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ImageWithAlt, images } from "@/lib/images";

type Props = {};
const Image = motion(NextImage);

export const Lander = (props: Props) => {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "66.5%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "33.5%"]);

  return (
    <div ref={target} className="flex h-screen relative overflow-hidden">
      <div className="h-full w-full flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="p-10"
        >
          <h1 className="text-7xl font-bold tracking-tighter">
            This is Vincent Van Gogh
          </h1>
          <h2 className="text-3xl leading-none font-cursive">
            Art is to console those who are broken by life.
          </h2>
        </motion.div>
        <LanderGallery images={images} progress={scrollYProgress} />
      </div>
      <div className="absolute h-full w-auto right-0 -z-10 overflow-hidden">
        <Image
          style={{ y: y1 }}
          priority
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          placeholder="blur"
          className="w-full h-full object-cover"
          src={vincent}
          alt="Vincent Van Gogh self portrait"
        />
      </div>
    </div>
  );
};

export const LanderGallery = ({
  images,
  progress,
}: {
  images: ImageWithAlt[];
  progress: MotionValue;
}) => {
  const x = useTransform(progress, [0, 1], ["0%", "-75%"]);
  return (
    <div className="w-full relative overflow-hidden flex flex-col justify-end">
      <motion.div
        style={{ x }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="flex flex-1 w-fit min-w-max gap-10 p-10"
      >
        {images.map((image, i) => {
          const start = i / images.length;
          const end = start + 1 / images.length;
          return (
            <LanderGalleryImage
              key={image.image.src}
              image={image}
              range={[start, end]}
              progress={progress}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export const LanderGalleryImage = ({
  image: { image, title: alt },
  range,
  progress,
}: {
  image: ImageWithAlt;
  range: [number, number];
  progress: MotionValue;
}) => {
  const opacity = useTransform(progress, range, [1, 0]);
  return (
    <motion.div style={{ opacity }}>
      <Image
        className="w-auto pointer-events-none object-contain h-64"
        key={image.src}
        src={image}
        alt={alt}
        placeholder="blur"
      />
    </motion.div>
  );
};
