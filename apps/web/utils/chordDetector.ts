// Pitch class value lookup
const NOTE_VALUES: Record<string, number> = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11
};

const VALUE_TO_NOTE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const CHORD_PROFILES: Array<{ name: string; intervals: number[] }> = [
  { name: "", intervals: [0, 4, 7] },            // Major (C)
  { name: "m", intervals: [0, 3, 7] },           // Minor (Cm)
  { name: "dim", intervals: [0, 3, 6] },         // Diminished (Cdim)
  { name: "aug", intervals: [0, 4, 8] },         // Augmented (Caug)
  { name: "7", intervals: [0, 4, 7, 10] },       // Dominant 7th (C7)
  { name: "maj7", intervals: [0, 4, 7, 11] },    // Major 7th (Cmaj7)
  { name: "m7", intervals: [0, 3, 7, 10] },      // Minor 7th (Cm7)
  { name: "sus4", intervals: [0, 5, 7] },        // Suspended 4th (Csus4)
  { name: "sus2", intervals: [0, 2, 7] },        // Suspended 2nd (Csus2)
  { name: "m7b5", intervals: [0, 3, 6, 10] },    // Half-diminished 7th (Cm7b5)
  { name: "dim7", intervals: [0, 3, 6, 9] },     // Diminished 7th (Cdim7)
];

export function detectChord(noteNames: string[]): string {
  if (noteNames.length < 3) return "";

  // Extract base note names (C4 -> C, C#4 -> C#)
  const baseNotes = noteNames.map(note => note.replace(/[0-9]/g, ""));
  
  // Map base notes to pitch classes (0-11)
  const pitchClasses = Array.from(new Set(baseNotes.map(n => NOTE_VALUES[n] ?? 0))).sort((a, b) => a - b);
  
  if (pitchClasses.length < 3) return "";

  // Try each note in the set as the root to find a matching shape
  for (const root of pitchClasses) {
    // Calculate intervals relative to this root
    const intervals = pitchClasses
      .map(note => (note - root + 12) % 12)
      .sort((a, b) => a - b);
    
    // Check chord profiles
    for (const profile of CHORD_PROFILES) {
      if (intervals.length === profile.intervals.length &&
          intervals.every((v, i) => v === profile.intervals[i])) {
        return VALUE_TO_NOTE[root] + profile.name;
      }
    }
  }

  return "Acorde Desconocido";
}
