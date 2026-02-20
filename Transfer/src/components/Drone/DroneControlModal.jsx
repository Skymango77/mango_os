import React, { useState } from 'react';
import * as Lucide from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Lucide[name];
  return LucideIcon ? <LucideIcon {...props} /> : <Lucide.HelpCircle {...props} />;
};

export default function DroneControlModal({ drone, onClose }) {
  const [altitude, setAltitude] = useState(120);

  if (!drone) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl h-[85vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl">
              <Icon name="Navigation" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">{drone.name} - Remote Control</h3>
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Live Stream Active</p>
            </div>
          </div>
          <button onClick={onClose} className="p-4 bg-slate-100 rounded-2xl text-slate-400 hover:text-red-500 transition-colors">
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Control Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Viewport (Camera Feed Placeholder) */}
          <div className="flex-1 bg-slate-800 relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="VideoOff" className="text-slate-700" size={64} />
              <p className="absolute mt-24 text-slate-500 font-black text-xs uppercase tracking-widest">Connecting High-Latency Stream...</p>
            </div>
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
                  <p className="text-[10px] font-black opacity-60 uppercase">GPS Coord</p>
                  <p className="text-sm font-mono">{drone.lat.toFixed(4)}, {drone.lng.toFixed(4)}</p>
                </div>
                <div className="bg-red-500 p-4 rounded-2xl text-white animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-xs font-black uppercase tracking-tighter">REC 00:12:45</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="h-20 w-px bg-white/40 relative">
                  <div className="absolute top-1/2 -left-2 -right-2 h-px bg-emerald-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Control Sidebar */}
          <div className="w-80 border-l border-slate-100 p-8 flex flex-col gap-8 overflow-y-auto">
            
            {/* Telemetry Section */}
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Flight Telemetry</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <Icon name="ArrowUp" size={16} className="text-indigo-600 mb-2" />
                  <p className="text-2xl font-black text-slate-900">{altitude}m</p>
                  <p className="text-[10px] font-bold text-slate-400">Altitude</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <Icon name="Zap" size={16} className="text-orange-500 mb-2" />
                  <p className="text-2xl font-black text-slate-900">{Math.round(drone.battery)}%</p>
                  <p className="text-[10px] font-bold text-slate-400">Power</p>
                </div>
              </div>
            </div>

            {/* Manual Controls */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manual Override</h4>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">
                Take Off
              </button>
              <button className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                Return to Home
              </button>
              <button className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                Emergency Landing
              </button>
            </div>

            {/* Camera Settings */}
            <div className="mt-auto">
              <div className="p-4 bg-indigo-50 rounded-3xl flex items-center gap-4">
                <div className="p-2 bg-indigo-600 text-white rounded-xl">
                  <Icon name="Wifi" size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase">Link Quality</p>
                  <p className="text-sm font-black text-indigo-900 tracking-tighter">98.2 Mbps / 4k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}