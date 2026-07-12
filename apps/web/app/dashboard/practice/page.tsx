/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useAudioEngine, NOTE_FREQS, KEY_TO_NOTE } from "../../../hooks/useAudioEngine";
import { useMetronome } from "../../../hooks/useMetronome";
import { detectChord } from "../../../utils/chordDetector";
import { 
  Activity, 
  Zap, 
  BookOpen, 
  Play, 
  Square, 
  RotateCcw, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Volume2
} from "lucide-react";

// MIDI note translation helper
const midiNoteToName = (noteNum: number): string => {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octave = Math.floor(noteNum / 12) - 1;
  const noteName = notes[noteNum % 12];
  return `${noteName}${octave}`;
};

export default function PracticeRoom() {
  const [activeTab, setActiveTab] = useState<"metronome" | "keyboard" | "notation">("metronome");
  
  const { playNote, playClick, getAudioContext } = useAudioEngine();
  
  // 1. METRONOME HOOK
  const {
    bpm,
    setBpm,
    isPlaying: isMetronomePlaying,
    timeSignature,
    setTimeSignature,
    soundType,
    setSoundType,
    currentBeat,
    toggleMetronome,
    handleTap,
    getBeatsPerMeasure
  } = useMetronome(playClick);

  // 2. KEYBOARD STATE & MIDI
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [midiStatus, setMidiStatus] = useState<string>("Buscando dispositivos...");
  
  const handleNoteOn = (note: string) => {
    const freq = NOTE_FREQS[note];
    if (freq) {
      playNote(freq, 0.4, "triangle");
      setActiveNotes(prev => [...prev.filter(n => n !== note), note]);
    }
  };

  const handleNoteOff = (note: string) => {
    setActiveNotes(prev => prev.filter(n => n !== note));
  };

  // Keyboard PC key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const note = KEY_TO_NOTE[key];
      if (note) {
        handleNoteOn(note);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const note = KEY_TO_NOTE[key];
      if (note) {
        handleNoteOff(note);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Web MIDI API integration
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.requestMIDIAccess) {
      setMidiStatus("MIDI no soportado en este navegador.");
      return;
    }

    let midiAccess: any = null;

    const onMIDIMessage = (message: any) => {
      const [status, noteNumber, velocity] = message.data;
      // 144 is noteOn (channel 1), 128 is noteOff
      if (status === 144 && velocity > 0) {
        const noteName = midiNoteToName(noteNumber);
        if (NOTE_FREQS[noteName]) {
          handleNoteOn(noteName);
        }
      } else if (status === 128 || (status === 144 && velocity === 0)) {
        const noteName = midiNoteToName(noteNumber);
        handleNoteOff(noteName);
      }
    };

    navigator.requestMIDIAccess()
      .then((access: any) => {
        midiAccess = access;
        const inputs = Array.from(access.inputs.values()) as any[];
        if (inputs.length > 0) {
          setMidiStatus(`Conectado: ${inputs[0]?.name}`);
          inputs.forEach(input => {
            input.onmidimessage = onMIDIMessage;
          });
        } else {
          setMidiStatus("No hay dispositivos MIDI conectados. Conéctate vía USB.");
        }
        
        access.onstatechange = () => {
          const updatedInputs = Array.from(access.inputs.values()) as any[];
          if (updatedInputs.length > 0) {
            setMidiStatus(`Conectado: ${updatedInputs[0]?.name}`);
          } else {
            setMidiStatus("Dispositivo desconectado.");
          }
        };
      })
      .catch(() => {
        setMidiStatus("Acceso MIDI rechazado.");
      });

    return () => {
      if (midiAccess) {
        (Array.from(midiAccess.inputs.values()) as any[]).forEach(input => {
          input.onmidimessage = null;
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeChord = detectChord(activeNotes);

  // 3. NOTATION PRACTICE GAME
  // Melody list: Twinkle Twinkle Little Star: C4, C4, G4, G4, A4, A4, G4
  const MELODY = ["C4", "C4", "G4", "G4", "A4", "A4", "G4"];
  const [melodyIndex, setMelodyIndex] = useState(0);
  const [scoreMessage, setScoreMessage] = useState<string>("¡Toca la primera nota para iniciar!");
  const [isMelodyFinished, setIsMelodyFinished] = useState(false);

  // Helper coordinate mapper for SVG staff positions
  const getNoteY = (note: string): number => {
    switch (note) {
      case "C4": return 120; // Ledger line
      case "D4": return 110;
      case "E4": return 100; // Line 1
      case "F4": return 90;
      case "G4": return 80;  // Line 2
      case "A4": return 70;
      case "B4": return 60;  // Line 3
      case "C5": return 50;
      default: return 80;
    }
  };

  const handleNotationNoteClick = (note: string, index: number) => {
    const freq = NOTE_FREQS[note];
    if (freq) {
      playNote(freq, 0.5, "sine");
    }

    if (isMelodyFinished) return;

    if (note === MELODY[melodyIndex] && index === melodyIndex) {
      if (melodyIndex + 1 === MELODY.length) {
        setIsMelodyFinished(true);
        setScoreMessage("¡Felicitaciones! Melodía completada a la perfección. 🎉");
      } else {
        setMelodyIndex(prev => prev + 1);
        setScoreMessage(`¡Bien hecho! Ahora toca: ${MELODY[melodyIndex + 1]}`);
      }
    } else {
      setScoreMessage(`¡Ups! Nota incorrecta. Toca: ${MELODY[melodyIndex]}`);
    }
  };

  const resetMelody = () => {
    setMelodyIndex(0);
    setIsMelodyFinished(false);
    setScoreMessage("¡Comencemos de nuevo! Toca: C4");
  };

  // Connect MIDI / Keyboard to Notation Game
  useEffect(() => {
    if (activeNotes.length > 0 && activeTab === "notation" && !isMelodyFinished) {
      const latestPressedNote = activeNotes[activeNotes.length - 1];
      const targetNote = MELODY[melodyIndex];
      
      if (latestPressedNote === targetNote) {
        if (melodyIndex + 1 === MELODY.length) {
          setIsMelodyFinished(true);
          setScoreMessage("¡Felicitaciones! Melodía completada desde tu teclado. 🎉");
        } else {
          setMelodyIndex(prev => prev + 1);
          setScoreMessage(`¡Perfecto! Siguiente nota: ${MELODY[melodyIndex + 1]}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNotes, activeTab]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Tabs Switcher */}
      <div className="flex gap-4 p-1.5 bg-white/5 border border-white/5 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("metronome")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full justify-center ${
            activeTab === "metronome"
              ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Activity className="w-4 h-4" />
          Metrónomo
        </button>
        <button
          onClick={() => setActiveTab("keyboard")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full justify-center ${
            activeTab === "keyboard"
              ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Zap className="w-4 h-4" />
          Teclado MIDI
        </button>
        <button
          onClick={() => setActiveTab("notation")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full justify-center ${
            activeTab === "notation"
              ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Partitura
        </button>
      </div>

      {/* METRONOME TAB */}
      {activeTab === "metronome" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/5 bg-[#07041c]/45 p-8 rounded-3xl backdrop-blur-xl">
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-white mb-2">Práctica de Tempo</h3>
              <p className="text-xs text-slate-400">Desarrolla precisión rítmica. Utiliza el deslizador o presiona TAP rítmicamente para ajustar los BPM.</p>
            </div>

            {/* BPM Display & Buttons */}
            <div className="flex items-center justify-between gap-6 bg-white/5 p-6 rounded-2xl border border-white/5">
              <div className="flex gap-2">
                <button 
                  onClick={() => setBpm(b => Math.max(40, b - 5))}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10"
                >
                  -5
                </button>
                <button 
                  onClick={() => setBpm(b => Math.max(40, b - 1))}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10"
                >
                  -1
                </button>
              </div>
              <div className="text-center">
                <span className="font-mono text-5xl font-extrabold text-white leading-none">{bpm}</span>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">BPM</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setBpm(b => Math.min(240, b + 1))}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10"
                >
                  +1
                </button>
                <button 
                  onClick={() => setBpm(b => Math.min(240, b + 5))}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10"
                >
                  +5
                </button>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input 
                type="range" 
                min="40" 
                max="240" 
                value={bpm} 
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full accent-violet-600 bg-white/10 rounded-lg appearance-none h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-600 font-mono">
                <span>LENTO (40)</span>
                <span>MODERADO (120)</span>
                <span>RÁPIDO (240)</span>
              </div>
            </div>

            {/* Select options row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Métricas</label>
                <select
                  value={timeSignature}
                  onChange={(e) => setTimeSignature(e.target.value)}
                  className="w-full bg-[#030014] text-slate-300 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                >
                  <option value="4/4">4 / 4</option>
                  <option value="3/4">3 / 4</option>
                  <option value="2/4">2 / 4</option>
                  <option value="6/8">6 / 8</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Sonido</label>
                <select
                  value={soundType}
                  onChange={(e) => setSoundType(e.target.value as any)}
                  className="w-full bg-[#030014] text-slate-300 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                >
                  <option value="woodblock">Caja Madera</option>
                  <option value="ping">Ping Digital</option>
                  <option value="claves">Claves Clásicas</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  const ctx = getAudioContext();
                  toggleMetronome(ctx);
                }}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 ${
                  isMetronomePlaying
                    ? "bg-rose-600 hover:bg-rose-500 shadow-rose-500/10 text-white"
                    : "bg-violet-600 hover:bg-violet-500 shadow-violet-500/25 text-white"
                }`}
              >
                {isMetronomePlaying ? (
                  <>
                    <Square className="w-4 h-4 fill-white" /> Detener
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Iniciar
                  </>
                )}
              </button>
              <button
                onClick={handleTap}
                className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 font-semibold text-slate-300 text-sm transition-all active:scale-95"
              >
                TAP
              </button>
            </div>
          </div>

          {/* Visualization area */}
          <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/5 rounded-3xl space-y-8 min-h-[300px]">
            {/* Visual bouncing dot representation */}
            <div className="flex items-center gap-4">
              {[...Array(getBeatsPerMeasure())].map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full transition-all duration-75 border ${
                    currentBeat === i && isMetronomePlaying
                      ? i === 0
                        ? "bg-teal-400 border-teal-300 scale-125 shadow-lg shadow-teal-500/50"
                        : "bg-violet-500 border-violet-400 scale-115 shadow-lg shadow-violet-500/50"
                      : "bg-white/5 border-white/10 scale-100"
                  }`}
                />
              ))}
            </div>

            {/* Dial animation pulse */}
            <div className="relative w-44 h-44 rounded-full border border-white/5 flex items-center justify-center bg-gradient-to-br from-violet-950/20 to-teal-950/10">
              <div 
                className={`absolute inset-0 rounded-full border border-violet-500/40 transition-all duration-300 pointer-events-none ${
                  currentBeat === 0 && isMetronomePlaying
                    ? "scale-105 opacity-100 ring-4 ring-violet-500/20"
                    : "scale-95 opacity-0"
                }`}
              />
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Pulso</span>
                <span className="text-2xl font-mono font-extrabold text-white">
                  {isMetronomePlaying ? currentBeat + 1 : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KEYBOARD TAB */}
      {activeTab === "keyboard" && (
        <div className="border border-white/5 bg-[#07041c]/45 p-8 rounded-3xl backdrop-blur-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-white mb-1">Teclado MIDI Interactivo</h3>
              <p className="text-xs text-slate-400">Utiliza el mouse, las teclas de tu computadora (A-S-D-F...) o conecta un teclado MIDI USB.</p>
            </div>
            
            {/* Status bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
              <div className={`w-2.5 h-2.5 rounded-full ${midiStatus.startsWith("Conectado") ? "bg-teal-400 shadow-md shadow-teal-500/30 animate-pulse" : "bg-slate-600"}`} />
              {midiStatus}
            </div>
          </div>

          {/* Active chord readout */}
          <div className="flex items-center justify-between bg-[#030014] p-4 rounded-xl border border-white/5 min-h-[56px]">
            <div className="text-xs text-slate-500">Notas presionadas: <span className="font-mono text-slate-300 font-semibold">{activeNotes.join(" - ") || "Ninguna"}</span></div>
            {activeChord && (
              <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded-lg text-sm font-extrabold tracking-wide flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                {activeChord}
              </div>
            )}
          </div>

          {/* Interactive virtual piano keyboard */}
          <div className="relative flex justify-center bg-[#030014] p-6 rounded-2xl border border-white/5 select-none overflow-x-auto min-w-full">
            <div className="flex relative h-60 min-w-[700px]">
              {/* White keys */}
              {Object.keys(NOTE_FREQS)
                .filter(note => !note.includes("#"))
                .map((note) => {
                  const isActive = activeNotes.includes(note);
                  return (
                    <div
                      key={note}
                      onMouseDown={() => handleNoteOn(note)}
                      onMouseUp={() => handleNoteOff(note)}
                      onMouseLeave={() => handleNoteOff(note)}
                      className={`relative w-12 border border-slate-700 rounded-b-lg cursor-pointer transition-all flex items-end justify-center pb-4 ${
                        isActive 
                          ? "bg-gradient-to-b from-teal-400 to-teal-600 border-teal-400 text-white shadow-lg scale-98" 
                          : "bg-white text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      <span className="font-mono text-[9px] font-bold tracking-tight">{note}</span>
                    </div>
                  );
                })}

              {/* Black keys overlaid precisely */}
              {/* Manual position offsets mapping keys inside octave */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex">
                {/* 1st Octave C#4 */}
                <div 
                  onMouseDown={() => handleNoteOn("C#4")}
                  onMouseUp={() => handleNoteOff("C#4")}
                  onMouseLeave={() => handleNoteOff("C#4")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("C#4") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "32px" }}
                />
                {/* D#4 */}
                <div 
                  onMouseDown={() => handleNoteOn("D#4")}
                  onMouseUp={() => handleNoteOff("D#4")}
                  onMouseLeave={() => handleNoteOff("D#4")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("D#4") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "78px" }}
                />
                {/* F#4 */}
                <div 
                  onMouseDown={() => handleNoteOn("F#4")}
                  onMouseUp={() => handleNoteOff("F#4")}
                  onMouseLeave={() => handleNoteOff("F#4")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("F#4") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "176px" }}
                />
                {/* G#4 */}
                <div 
                  onMouseDown={() => handleNoteOn("G#4")}
                  onMouseUp={() => handleNoteOff("G#4")}
                  onMouseLeave={() => handleNoteOff("G#4")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("G#4") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "224px" }}
                />
                {/* A#4 */}
                <div 
                  onMouseDown={() => handleNoteOn("A#4")}
                  onMouseUp={() => handleNoteOff("A#4")}
                  onMouseLeave={() => handleNoteOff("A#4")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("A#4") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "272px" }}
                />
                
                {/* 2nd Octave C#5 */}
                <div 
                  onMouseDown={() => handleNoteOn("C#5")}
                  onMouseUp={() => handleNoteOff("C#5")}
                  onMouseLeave={() => handleNoteOff("C#5")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("C#5") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "368px" }}
                />
                {/* D#5 */}
                <div 
                  onMouseDown={() => handleNoteOn("D#5")}
                  onMouseUp={() => handleNoteOff("D#5")}
                  onMouseLeave={() => handleNoteOff("D#5")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("D#5") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "416px" }}
                />
                {/* F#5 */}
                <div 
                  onMouseDown={() => handleNoteOn("F#5")}
                  onMouseUp={() => handleNoteOff("F#5")}
                  onMouseLeave={() => handleNoteOff("F#5")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("F#5") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "514px" }}
                />
                {/* G#5 */}
                <div 
                  onMouseDown={() => handleNoteOn("G#5")}
                  onMouseUp={() => handleNoteOff("G#5")}
                  onMouseLeave={() => handleNoteOff("G#5")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("G#5") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "562px" }}
                />
                {/* A#5 */}
                <div 
                  onMouseDown={() => handleNoteOn("A#5")}
                  onMouseUp={() => handleNoteOff("A#5")}
                  onMouseLeave={() => handleNoteOff("A#5")}
                  className={`absolute pointer-events-auto w-7 h-36 border border-slate-900 rounded-b bg-slate-950 hover:bg-slate-900 transition-all ${
                    activeNotes.includes("A#5") ? "bg-teal-500 border-teal-400 shadow-md h-[142px]" : ""
                  }`} 
                  style={{ left: "610px" }}
                />
              </div>
            </div>
          </div>

          {/* PC Keyboard key guide map */}
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-wrap items-center gap-2 justify-center text-xs text-slate-400">
            <span className="font-semibold mr-2 flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5 text-slate-500" /> Guía Teclas PC:</span>
            <span>C4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">A</kbd></span>
            <span>C#4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">W</kbd></span>
            <span>D4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">S</kbd></span>
            <span>E4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">D</kbd></span>
            <span>F4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">F</kbd></span>
            <span>G4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">G</kbd></span>
            <span>A4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">H</kbd></span>
            <span>B4 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">J</kbd></span>
            <span>C5 = <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">K</kbd></span>
          </div>
        </div>
      )}

      {/* NOTATION PRACTICE TAB */}
      {activeTab === "notation" && (
        <div className="border border-white/5 bg-[#07041c]/45 p-8 rounded-3xl backdrop-blur-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-white mb-1">Práctica de Lectura</h3>
              <p className="text-xs text-slate-400">Escucha la melodía y tócala en orden. Puedes hacer clic en las notas o tocar desde tu teclado.</p>
            </div>
            <button
              onClick={resetMelody}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar Melodía
            </button>
          </div>

          {/* Gamified readout */}
          <div className="flex items-center gap-3 p-4 bg-[#030014] border border-white/5 rounded-2xl min-h-[56px]">
            {isMelodyFinished ? (
              <CheckCircle className="w-5 h-5 text-teal-400 animate-bounce shrink-0" />
            ) : (
              <Volume2 className="w-5 h-5 text-violet-400 shrink-0 animate-pulse" />
            )}
            <p className="text-sm font-semibold text-slate-200">{scoreMessage}</p>
          </div>

          {/* Interactive SVG sheet music staff */}
          <div className="w-full bg-[#030014] p-8 rounded-2xl border border-white/5 overflow-x-auto">
            <svg 
              width="600" 
              height="180" 
              viewBox="0 0 600 180" 
              className="mx-auto select-none min-w-[550px]"
            >
              {/* Staff lines (5 lines, spaced 10px apart, starting at Y=60) */}
              {[60, 70, 80, 90, 100].map((y) => (
                <line 
                  key={y} 
                  x1="20" 
                  y1={y} 
                  x2="580" 
                  y2={y} 
                  stroke="#475569" 
                  strokeWidth="1.5" 
                />
              ))}

              {/* Bar lines */}
              <line x1="20" y1="60" x2="20" y2="100" stroke="#475569" strokeWidth="2.5" />
              <line x1="300" y1="60" x2="300" y2="100" stroke="#475569" strokeWidth="1.5" />
              <line x1="580" y1="60" x2="580" y2="100" stroke="#475569" strokeWidth="2.5" />

              {/* Treble Clef Symbol Mock */}
              <text x="30" y="105" fontSize="60" fontFamily="serif" fill="#8b5cf6" fontWeight="bold">𝄞</text>
              
              {/* Time signature mock */}
              <text x="75" y="80" fontSize="24" fontFamily="serif" fill="#94a3b8" fontWeight="bold">4</text>
              <text x="75" y="100" fontSize="24" fontFamily="serif" fill="#94a3b8" fontWeight="bold">4</text>

              {/* Draw Melody Notes */}
              {MELODY.map((note, index) => {
                const x = 130 + index * 60;
                const y = getNoteY(note);
                const isActive = index === melodyIndex && !isMelodyFinished;
                const isPassed = index < melodyIndex;
                
                // Color configuration
                let fill = "#cbd5e1"; // normal gray note
                let stroke = "none";
                
                if (isActive) {
                  fill = "#f43f5e"; // bright active rose
                  stroke = "#fecdd3";
                } else if (isPassed || isMelodyFinished) {
                  fill = "#10b981"; // success green
                }

                return (
                  <g 
                    key={index} 
                    className="cursor-pointer group"
                    onClick={() => handleNotationNoteClick(note, index)}
                  >
                    {/* Hover expand indicator */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="16" 
                      fill="transparent" 
                      className="group-hover:fill-white/5 transition-all"
                    />

                    {/* Ledger line for C4 note */}
                    {note === "C4" && (
                      <line 
                        x1={x - 12} 
                        y1={y} 
                        x2={x + 12} 
                        y2={y} 
                        stroke="#94a3b8" 
                        strokeWidth="2" 
                      />
                    )}

                    {/* Note Head Oval */}
                    <ellipse 
                      cx={x} 
                      cy={y} 
                      rx="8" 
                      ry="5.5" 
                      fill={fill} 
                      stroke={stroke}
                      strokeWidth={isActive ? "2" : "0"}
                      transform={`rotate(-20, ${x}, ${y})`}
                      className="transition-colors duration-150"
                    />
                    
                    {/* Note Stem line (pointing up or down depending on height) */}
                    <line 
                      x1={x + 7.5} 
                      y1={y - 1} 
                      x2={x + 7.5} 
                      y2={y - 30} 
                      stroke={fill} 
                      strokeWidth="1.8" 
                      className="transition-colors duration-150"
                    />

                    {/* Active pulse aura */}
                    {isActive && (
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="12" 
                        fill="none" 
                        stroke="#f43f5e" 
                        strokeWidth="1" 
                        className="animate-ping"
                      />
                    )}

                    {/* Note Label above staff */}
                    <text 
                      x={x} 
                      y="30" 
                      textAnchor="middle" 
                      className={`text-[9px] font-mono font-bold transition-colors ${
                        isActive ? "fill-rose-400 font-extrabold" : "fill-slate-500"
                      }`}
                    >
                      {note}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
