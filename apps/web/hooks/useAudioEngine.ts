/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";

// Standard frequency map for C4-B5 octave keys
export const NOTE_FREQS: Record<string, number> = {
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
  "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25, "E5": 659.25, "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "A5": 880.00, "A#5": 932.33, "B5": 987.77
};

export const KEY_TO_NOTE: Record<string, string> = {
  "a": "C4", "w": "C#4", "s": "D4", "e": "D#4", "d": "E4", "f": "F4", "t": "F#4", "g": "G4", "y": "G#4", "h": "A4", "u": "A#4", "j": "B4",
  "k": "C5", "o": "C#5", "l": "D5", "p": "D#5", "ñ": "E5", ";": "E5", "z": "F5", "x": "G5", "c": "A5"
};

export function useAudioEngine() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on demand (to satisfy browser autoplay blocks)
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play a note synthesize trigger with adsr envelope to prevent popping sounds
  const playNote = (frequency: number, duration: number = 0.5, type: OscillatorType = "sine") => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Envelope configuration
      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      // Attack
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.02);
      // Decay / Release ramp
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("AudioContext playback blocked or failed:", e);
    }
  };

  // Trigger a metronome beat click sound (high accent vs. low normal click)
  const playClick = (isAccent: boolean = false, type: "woodblock" | "ping" | "claves" = "woodblock") => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      if (type === "woodblock") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(isAccent ? 1200 : 800, now);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.5, now + 0.002);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      } else if (type === "ping") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(isAccent ? 2500 : 1800, now);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.005);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      } else { // claves
        osc.type = "sine";
        osc.frequency.setValueAtTime(isAccent ? 3200 : 2700, now);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.4, now + 0.001);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      }

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      console.warn("Metronome click failed:", e);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { playNote, playClick, getAudioContext };
}
