import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";

export const useSound = (src: string) => {
  const audioElement = useRef<HTMLAudioElement | null>(null);
  // const audioCtx = useRef<AudioContext | null>(null);
  // const audioSource = useRef<MediaElementAudioSourceNode | null>(null);
  const audioAnalyser = useRef<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const init = () => {
    audioElement.current = new Audio(src);
    const audioCtx = new AudioContext();
    const audioSource = audioCtx.createMediaElementSource(audioElement.current);
    audioAnalyser.current = audioCtx.createAnalyser();
    audioSource.connect(audioAnalyser.current);
    audioAnalyser.current.connect(audioCtx.destination);
    audioAnalyser.current.fftSize = 1024;
  };

  const playSound = () => {
    if (!audioElement.current) {
      init();
    }
    audioElement.current?.play();
    setIsPlaying(true);
  };

  const pauseSound = () => {
    audioElement.current?.pause();
    setIsPlaying(false);
  };

  const getDataArray = () => {
    if (!audioAnalyser.current) throw new Error("useSound not initialized.");
    const bufferLength = audioAnalyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    audioAnalyser.current.getByteFrequencyData(dataArray);

    return { dataArray, bufferLength };
  };

  return {
    playSound,
    pauseSound,
    isPlaying,
    getDataArray,
  };
};
