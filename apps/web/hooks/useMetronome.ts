"use client";

import { useEffect, useRef, useState } from "react";

export function useMetronome(playClick: (isAccent: boolean, type: "woodblock" | "ping" | "claves") => void) {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSignature, setTimeSignature] = useState("4/4"); // "4/4", "3/4", "2/4", "6/8"
  const [soundType, setSoundType] = useState<"woodblock" | "ping" | "claves">("woodblock");
  const [currentBeat, setCurrentBeat] = useState(0);

  const isPlayingRef = useRef(isPlaying);
  const bpmRef = useRef(bpm);
  const timeSignatureRef = useRef(timeSignature);
  const soundTypeRef = useRef(soundType);

  const currentBeatRef = useRef(0);
  const timerIdRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sync references
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { timeSignatureRef.current = timeSignature; }, [timeSignature]);
  useEffect(() => { soundTypeRef.current = soundType; }, [soundType]);

  const getBeatsPerMeasure = () => {
    switch (timeSignatureRef.current) {
      case "3/4": return 3;
      case "2/4": return 2;
      case "6/8": return 6;
      default: return 4;
    }
  };

  // High-precision scheduler loop
  const scheduleNextClick = () => {
    const beatsPerMeasure = getBeatsPerMeasure();
    const isAccent = currentBeatRef.current === 0;

    playClick(isAccent, soundTypeRef.current);
    
    // Notify visual state
    setCurrentBeat(currentBeatRef.current);

    // Compute next step time
    const secondsPerBeat = 60.0 / bpmRef.current;
    nextNoteTimeRef.current += secondsPerBeat;

    // Advance beat counters
    currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasure;
  };

  const startMetronome = (audioCtx: AudioContext) => {
    if (isPlayingRef.current) return;

    audioCtxRef.current = audioCtx;
    nextNoteTimeRef.current = audioCtx.currentTime;
    currentBeatRef.current = 0;
    setIsPlaying(true);

    const scheduler = () => {
      while (nextNoteTimeRef.current < audioCtx.currentTime + 0.1) {
        scheduleNextClick();
      }
      timerIdRef.current = window.setTimeout(scheduler, 25) as unknown as number;
    };

    scheduler();
  };

  const stopMetronome = () => {
    if (!isPlayingRef.current) return;

    setIsPlaying(false);
    setCurrentBeat(0);
    currentBeatRef.current = 0;

    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  const toggleMetronome = (audioCtx: AudioContext) => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome(audioCtx);
    }
  };

  const handleTap = () => {
    const now = performance.now();
    // Maintain a simple rolling window of tap timings
    if (!window.tapTimes) {
      window.tapTimes = [];
    }
    const times = window.tapTimes;
    times.push(now);
    if (times.length > 4) {
      times.shift();
    }
    if (times.length > 1) {
      const intervals: number[] = [];
      for (let i = 1; i < times.length; i++) {
        const val1 = times[i];
        const val2 = times[i - 1];
        if (val1 !== undefined && val2 !== undefined) {
          intervals.push(val1 - val2);
        }
      }
      if (intervals.length > 0) {
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const calculatedBpm = Math.round(60000 / avgInterval);
        if (calculatedBpm >= 40 && calculatedBpm <= 240) {
          setBpm(calculatedBpm);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return {
    bpm,
    setBpm,
    isPlaying,
    timeSignature,
    setTimeSignature,
    soundType,
    setSoundType,
    currentBeat,
    toggleMetronome,
    handleTap,
    getBeatsPerMeasure
  };
}

// Global declaration for tapTimes storage
declare global {
  interface Window {
    tapTimes?: number[];
  }
}
