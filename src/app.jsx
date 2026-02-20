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

// Initial pattern state (4 rows x 8 steps, all false/off)
const initialPattern = DRUM_SOUNDS.map(() =>
  Array(NUM_STEPS).fill(false)
);

// --- TONE.JS SETUP ---

// Use a simple, fast PolySynth for all drum sounds for demonstration
const synth = new Tone.PolySynth(Tone.Sampler, {
  urls: {
    C1: 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/samba/snare.mp3', // Using snare for simplicity, can be any sample
  },
  // Since we are using a PolySynth, we will map different notes to our drum sounds
  volume: -10,
}).toDestination();

// Fallback logic for basic tone synthesis if samples fail/are slow
const fallbackSynth = new Tone.MembraneSynth().toDestination();

/**
 * Plays the specified sound
 * @param {number} rowIdx - The index of the sound to play (0-3)
 */
const triggerSound = (rowIdx) => {
  const { note } = DRUM_SOUNDS[rowIdx];
  
  // Try to use the Sampler/PolySynth first
  try {
    synth.triggerAttackRelease(note, '8n');
  } catch (e) {
    // Fallback if PolySynth is unavailable or errors
    fallbackSynth.triggerAttackRelease(note, '8n', Tone.context.currentTime, 0.5);
  }
};


// --- REACT COMPONENT ---
export default function App() {
  const [pattern, setPattern] = useState(initialPattern);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tempoBPM, setTempoBPM] = useState(120);
  const [isMuted, setIsMuted] = useState(false);

  // Use a ref to hold the pattern state inside the sequencer loop
  const patternRef = useRef(pattern);
  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);

  // Use a ref to hold the current step sequence ID
  const sequenceRef = useRef(null);

  // Function to handle the pattern logic and sound triggering
  const sequenceBeat = useCallback((time, step) => {
    if (isMuted) return; // Stop sound if muted

    const newStep = step % NUM_STEPS;
    setCurrentStep(newStep);

    // Iterate through all drum rows at the current step
    patternRef.current.forEach((row, rowIdx) => {
      if (row[newStep]) {
        triggerSound(rowIdx);
      }
    });

  }, [isMuted]); // Dependency on isMuted

  // --- START/STOP LOGIC ---
  useEffect(() => {
    // 1. Set global transport settings
    Tone.Transport.bpm.value = tempoBPM;
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = `${NUM_STEPS}n`; // Loop for 8 steps (1 measure at 4/4)

    if (isPlaying) {
      // 2. Start Tone Context (required on user action)
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      
      // 3. Create the sequence
      // The sequence calls sequenceBeat every 8th note
      const sequence = new Tone.Sequence(sequenceBeat, Array.from({ length: NUM_STEPS }, (_, i) => i), '8n').start(0);
      sequenceRef.current = sequence;
      
      // 4. Start the transport
      Tone.Transport.start();

    } else {
      // Stop logic
      Tone.Transport.stop();
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
        sequenceRef.current = null;
      }
      setCurrentStep(0);
    }

    // Cleanup function
    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }
    };
  }, [isPlaying, tempoBPM, sequenceBeat]); // Re-run effect when playing state or tempo changes


  // --- HANDLERS ---
  
  const handleCellClick = (rowIdx, stepIdx) => {
    const newPattern = pattern.map((row, r) =>
      row.map((cell, s) => {
        if (r === rowIdx && s === stepIdx) {
          return !cell; // Toggle the state
        }
        return cell;
      })
    );
    setPattern(newPattern);
  };

  const handleReset = () => {
    setPattern(initialPattern);
    setCurrentStep(0);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };
  
  const handleTempoChange = (e) => {
    const newTempo = parseInt(e.target.value, 10);
    setTempoBPM(newTempo);
    Tone.Transport.bpm.value = newTempo;
  };

  const handleMuteToggle = () => {
    setIsMuted(prev => !prev);
  }

  // --- RENDERING ---

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-400 tracking-tighter flex items-center justify-center gap-3">
          <Grid className="w-8 h-8 sm:w-10 sm:h-10"/> 
          Mango Pattern Editor
        </h1>
        <p className="text-gray-400 mt-2 text-lg">8-Step Drum Sequencer (React + Tone.js)</p>
      </header>

      {/* Sequencer Grid */}
      <div className="w-full max-w-4xl bg-gray-800 p-4 rounded-xl shadow-2xl">
        
        {/* Row Headers and Grid */}
        <div className="grid gap-2">
          {pattern.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center">
              
              {/* Instrument Label */}
              <div 
                className={`w-24 sm:w-32 py-2 px-3 mr-2 font-semibold text-sm rounded-lg shadow-inner flex items-center justify-center transition-colors 
                ${DRUM_SOUNDS[rowIdx].color.replace('500', '700')} text-white/90`}
              >
                {DRUM_SOUNDS[rowIdx].name}
              </div>

              {/* Step Buttons */}
              <div className="flex flex-1 gap-1">
                {row.map((isActive, stepIdx) => {
                  const isCurrent = stepIdx === currentStep && isPlaying;
                  const baseColor = DRUM_SOUNDS[rowIdx].color; // e.g., 'bg-red-500'
                  
                  let cellClasses = 'w-full aspect-square rounded-md transition-all duration-100 ease-in-out cursor-pointer border-2 shadow-md';
                  
                  if (isActive) {
                    // Active Cell
                    cellClasses += ` ${baseColor.replace('500', '400')} border-white/50`;
                    if (isCurrent) {
                       // Active & Playing Step
                      cellClasses += ` ring-4 ring-offset-2 ring-offset-gray-800 ring-yellow-300 transform scale-105`;
                    }
                  } else {
                    // Inactive Cell
                    cellClasses += ` bg-gray-700 border-gray-600 hover:bg-gray-600`;
                    if (isCurrent) {
                       // Inactive & Playing Step
                      cellClasses += ` border-yellow-300 bg-gray-600`;
                    }
                  }

                  return (
                    <button
                      key={stepIdx}
                      className={cellClasses}
                      onClick={() => handleCellClick(rowIdx, stepIdx)}
                      aria-label={`${DRUM_SOUNDS[rowIdx].name} Step ${stepIdx + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Controls Section */}
      <div className="w-full max-w-4xl mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-4 bg-gray-800 rounded-xl shadow-2xl">
        
        {/* Playback Controls */}
        <div className="flex gap-4">
          <button 
            onClick={() => setIsPlaying(prev => !prev)}
            className={`p-3 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 ${isPlaying ? 'bg-red-500 hover:bg-red-600 ring-red-300' : 'bg-green-500 hover:bg-green-600 ring-green-300'}`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
          </button>
          
          <button 
            onClick={handleReset}
            className="p-3 bg-indigo-500 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-600 focus:outline-none focus:ring-4 ring-indigo-300"
            aria-label="Reset Pattern and Stop"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </button>
          
          <button 
            onClick={handleMuteToggle}
            className="p-3 bg-gray-700 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-4 ring-gray-500"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-6 h-6 text-red-400" /> : <Volume2 className="w-6 h-6 text-green-400" />}
          </button>
        </div>

        {/* Tempo Control */}
        <div className="flex flex-col items-center w-full sm:w-auto">
          <label htmlFor="tempo" className="text-sm font-medium mb-1 text-gray-400">Tempo (BPM)</label>
          <input
            id="tempo"
            type="range"
            min="60"
            max="200"
            step="1"
            value={tempoBPM}
            onChange={handleTempoChange}
            className="w-full sm:w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
          />
          <span className="mt-1 text-xl font-bold text-indigo-300">{tempoBPM} BPM</span>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Uses React, Tailwind CSS, and Tone.js for real-time audio sequencing.</p>
        <p>Click Play to start the loop, then click on cells to build your beat!</p>
      </footer>
    </div>
  );
}