"use client";
import { images } from "@/lib/images";
import NextImage from "next/image";
import React, { useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Variants, motion, useInView } from "framer-motion";

const Image = motion(NextImage);

type Props = {};

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  hover: {
    scale: 1.025,
  },
  tap: {
    scale: 0.985,
  },
};

export const Paintings = (props: Props) => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.15 }}
      className="flex flex-wrap gap-10"
    >
      {images.map(({ image, title }, i) => {
        return (
          <Dialog open={open} onOpenChange={setOpen} key={image.src}>
            <DialogTrigger
              onClick={() => {
                setCurrent(i);
                setOpen(true);
              }}
            >
              <Image
                whileHover="hover"
                whileTap="tap"
                variants={variants}
                className="h-auto w-full md:h-96 md:w-auto"
                alt={title}
                src={image}
                placeholder="blur"
              />
            </DialogTrigger>
            <DialogContent className="">
              <PaintingsCarousel current={current} />
            </DialogContent>
          </Dialog>
        );
      })}
    </motion.div>
  );
};

export const PaintingsCarousel = ({ current }: { current: number }) => {
  return (
    <Carousel opts={{ startIndex: current }}>
      <CarouselContent className="flex items-center ">
        {images.map(({ image, title }, i) => {
          return (
            <CarouselItem className="h-full w-full" key={image.src}>
              <Image alt={title} src={image} placeholder="blur" />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
