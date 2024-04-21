"use client";
import { useSound } from "@/lib/hooks";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";

export const Player = ({src}: {src: string}) => {
  const { playSound, pauseSound, isPlaying, getDataArray } = useSound(
    src
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    const { bufferLength } = getDataArray();

    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    const animate = (ctx: CanvasRenderingContext2D) => {
      requestAnimationFrame(() => animate(ctx));
      x = 0;
      const { dataArray, bufferLength } = getDataArray();

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + 25 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
        ctx.fillRect(x, HEIGHT / 2 - barHeight, barWidth + 1, barHeight * 2);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, HEIGHT / 2 - barHeight / 2, barWidth, barHeight);

        ctx.beginPath();
        ctx.ellipse(
          x + barWidth / 2,
          HEIGHT / 2 - barHeight / 2,
          barWidth / 2,
          barWidth / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.ellipse(
          x + barWidth / 2,
          HEIGHT / 2 + barHeight / 2,
          barWidth / 2,
          barWidth / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        x += barWidth + 1;
      }
    };
    animate(ctx);
  }, [getDataArray, isPlaying]);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Button onClick={() => (isPlaying ? pauseSound() : playSound())}>
        {isPlaying ? "Pause" : "Play"}
      </Button>
      <canvas className="fixed inset-0 -z-10" ref={canvasRef}></canvas>
    </div>
  );
};
