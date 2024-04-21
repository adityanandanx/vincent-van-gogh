import { Paintings } from "@/components/Paintings";
import { Player } from "@/components/audio";
import { Lander } from "@/components/lander";
import { Quote } from "@/components/quote";
import { TextOpacityScroll } from "@/components/text-opacity-scroll";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Lander />
      <TextOpacityScroll
        value={`The world ignites my soul with its vibrant hues. From the swirling sky of a starry night to the golden glow of a sunflower field, I strive to capture the essence of life on canvas with every brushstroke. My journey as an artist has been a tempestuous one, fueled by passion and a relentless pursuit of expressing the unseen emotions that lie beneath the surface.`}
      />
      <Quote
        quote="I dream my painting and I paint my dream."
        author="Vincent Van Gogh"
      />
      <div className="max-w-screen-2xl mx-auto relative">
        <Paintings />
        <div className="h-screen"></div>
      </div>
    </>
  );
}
