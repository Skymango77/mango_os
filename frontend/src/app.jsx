import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Grid } from 'lucide-react';

// --- CONFIGURATION ---
const NUM_STEPS = 8;
const DRUM_SOUNDS = [
  { name: 'Kick', note: 'C1', color: 'bg-red-500' },
  { name: 'Snare', note: 'E1', color: 'bg-green-500' },
  { name: 'Hi-Hat (Closed)', note: 'F#1', color: 'bg-blue-500' },
  { name: 'Clap', note: 'C#2', color: 'bg-yellow-500' },
];

const initialPattern = DRUM_SOUNDS.map(() => Array(NUM_STEPS).fill(false));

// --- TONE.JS SETUP ---
const synth = new Tone.PolySynth(Tone.Sampler, {
  urls: {
    C1: 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/samba/snare.mp3',
  },
  volume: -10,
}).toDestination();

const fallbackSynth = new Tone.MembraneSynth().toDestination();

const triggerSound = (rowIdx) => {
  const { note } = DRUM_SOUNDS[rowIdx];
  try {
    synth.triggerAttackRelease(note, '8n');
  } catch (e) {
    fallbackSynth.triggerAttackRelease(note, '8n', Tone.context.currentTime, 0.5);
  }
};

export default function App() {
  const [pattern, setPattern] = useState(initialPattern);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tempoBPM, setTempoBPM] = useState(120);
  const [isMuted, setIsMuted] = useState(false);

  const patternRef = useRef(pattern);
  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);

  const sequenceRef = useRef(null);

  const sequenceBeat = useCallback((time, step) => {
    if (isMuted) return;
    const newStep = step % NUM_STEPS;
    setCurrentStep(newStep);
    patternRef.current.forEach((row, rowIdx) => {
      if (row[newStep]) {
        triggerSound(rowIdx);
      }
    });
  }, [isMuted]);

  useEffect(() => {
    Tone.Transport.bpm.value = tempoBPM;
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = `${NUM_STEPS}n`;

    if (isPlaying) {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      const sequence = new Tone.Sequence(
        (time, step) => sequenceBeat(time, step),
        Array.from({ length: NUM_STEPS }, (_, i) => i),
        '8n'
      ).start(0);
      sequenceRef.current = sequence;
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
        sequenceRef.current = null;
      }
      setCurrentStep(0);
    }

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }
    };
  }, [isPlaying, tempoBPM, sequenceBeat]);

  const handleCellClick = (rowIdx, stepIdx) => {
    const newPattern = pattern.map((row, r) =>
      row.map((cell, s) => (r === rowIdx && s === stepIdx ? !cell : cell))
    );
    setPattern(newPattern);
  };

  const handleReset = () => {
    setPattern(initialPattern);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleTempoChange = (e) => {
    const newTempo = parseInt(e.target.value, 10);
    setTempoBPM(newTempo);
    Tone.Transport.bpm.value = newTempo;
  };

  const handleMuteToggle = () => setIsMuted((prev) => !prev);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 sm:p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 tracking-tighter flex items-center justify-center gap-3">
          <Grid className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />
          Mango Pattern Editor
        </h1>
        <p className="text-gray-400 mt-2 text-lg">8-Step Drum Sequencer (React + Tone.js)</p>
      </header>

      <div className="w-full max-w-4xl bg-gray-900/50 p-6 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-sm">
        <div className="grid gap-3">
          {pattern.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center group">
              <div
                className={`w-24 sm:w-32 py-2 px-3 mr-4 font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex items-center justify-center transition-all
                ${DRUM_SOUNDS[rowIdx].color.replace('500', '600')} text-white group-hover:scale-105`}
              >
                {DRUM_SOUNDS[rowIdx].name}
              </div>

              <div className="flex flex-1 gap-2">
                {row.map((isActive, stepIdx) => {
                  const isCurrent = stepIdx === currentStep && isPlaying;
                  const baseColor = DRUM_SOUNDS[rowIdx].color;

                  let cellClasses = 'w-full aspect-square rounded-lg transition-all duration-150 cursor-pointer border-2 shadow-inner';

                  if (isActive) {
                    cellClasses += ` ${baseColor} border-white/30`;
                    if (isCurrent) cellClasses += ` ring-4 ring-yellow-400 scale-110 z-10`;
                  } else {
                    cellClasses += ` bg-gray-800 border-gray-700 hover:border-gray-500`;
                    if (isCurrent) cellClasses += ` border-yellow-400 bg-gray-700`;
                  }

                  return (
                    <button
                      key={stepIdx}
                      className={cellClasses}
                      onClick={() => handleCellClick(rowIdx, stepIdx)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl">
        <div className="flex gap-4">
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className={`p-4 rounded-full shadow-xl transition-all active:scale-95 focus:outline-none ${
              isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-white text-white" />
            ) : (
              <Play className="w-7 h-7 fill-white text-white" />
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-4 bg-gray-700 rounded-full shadow-xl transition-all hover:bg-gray-600 active:scale-95"
          >
            <RotateCcw className="w-7 h-7 text-white" />
          </button>

          <button
            onClick={handleMuteToggle}
            className="p-4 bg-gray-800 rounded-full shadow-xl transition-all hover:bg-gray-700 active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="w-7 h-7 text-red-500" />
            ) : (
              <Volume2 className="w-7 h-7 text-yellow-500" />
            )}
          </button>
        </div>

        <div className="flex flex-col items-center w-full sm:w-auto bg-black/40 p-4 rounded-xl border border-gray-800">
          <label className="text-xs uppercase tracking-widest font-bold mb-2 text-gray-500">Tempo Control</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="60"
              max="200"
              value={tempoBPM}
              onChange={handleTempoChange}
              className="w-40 sm:w-56 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <span className="text-2xl font-black text-yellow-400 w-20 text-center font-mono">
              {tempoBPM}
            </span>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-600 text-xs tracking-widest uppercase">
        <p>© 2025 Mango Tech • Real-time Audio Sequencing</p>
      </footer>
    </div>
  );
}