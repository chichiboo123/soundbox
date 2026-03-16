import { useCallback, useRef, useState } from "react";

const AUDIO_BASE_PATH = `${import.meta.env.BASE_URL}audio/`;

export function useAudioPlayer() {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const fadeIntervals = useRef<Map<string, number>>(new Map());
  const [playingSet, setPlayingSet] = useState<Set<string>>(new Set());

  const getAudio = useCallback((file: string) => {
    if (!audioCache.current.has(file)) {
      const audio = new Audio(AUDIO_BASE_PATH + file);

      audio.addEventListener("error", () => {
        setPlayingSet((prev) => {
          const next = new Set(prev);
          next.delete(file);
          return next;
        });
      });

      audio.addEventListener("ended", () => {
        setPlayingSet((prev) => {
          const next = new Set(prev);
          next.delete(file);
          return next;
        });
      });
      audioCache.current.set(file, audio);
    }
    return audioCache.current.get(file)!;
  }, []);

  const play = useCallback(
    (file: string) => {
      const audio = getAudio(file);
      // Clear any fade
      const fadeId = fadeIntervals.current.get(file);
      if (fadeId) {
        clearInterval(fadeId);
        fadeIntervals.current.delete(file);
      }
      audio.volume = 1;
      audio.currentTime = 0;
      setPlayingSet((prev) => new Set(prev).add(file));

      audio.play().catch(() => {
        setPlayingSet((prev) => {
          const next = new Set(prev);
          next.delete(file);
          return next;
        });
      });
    },
    [getAudio]
  );

  const stop = useCallback(
    (file: string) => {
      const audio = audioCache.current.get(file);
      if (audio) {
        const fadeId = fadeIntervals.current.get(file);
        if (fadeId) {
          clearInterval(fadeId);
          fadeIntervals.current.delete(file);
        }
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
      }
      setPlayingSet((prev) => {
        const next = new Set(prev);
        next.delete(file);
        return next;
      });
    },
    []
  );

  const fadeOut = useCallback(
    (file: string) => {
      const audio = audioCache.current.get(file);
      if (!audio || audio.paused) return;

      // Clear existing fade
      const existingFade = fadeIntervals.current.get(file);
      if (existingFade) clearInterval(existingFade);

      const steps = 30; // 3 seconds, 100ms intervals
      const decrement = audio.volume / steps;

      const interval = window.setInterval(() => {
        if (audio.volume > decrement) {
          audio.volume = Math.max(0, audio.volume - decrement);
        } else {
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
          clearInterval(interval);
          fadeIntervals.current.delete(file);
          setPlayingSet((prev) => {
            const next = new Set(prev);
            next.delete(file);
            return next;
          });
        }
      }, 100);

      fadeIntervals.current.set(file, interval);
    },
    []
  );

  const isPlaying = useCallback(
    (file: string) => playingSet.has(file),
    [playingSet]
  );

  return { play, stop, fadeOut, isPlaying };
}
