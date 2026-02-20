import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Star, 
  Navigation, 
  Bed, 
  Music, 
  Languages, 
  Heart, 
  ChevronLeft, 
  Calendar,
  Users,
  Compass,
  Play
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedStay, setSelectedStay] = useState(null);

  // Mock Data: Stays (Airbnb style)
  const stays = [
    {
      id: 1,
      name: "Modern Forest Cabin",
      location: "Vancouver, Canada",
      price: "₩185,000",
      rating: 4.92,
      reviews: 124,
      coords: { top: '30%', left: '45%' },
      image: "https://images.unsplash.com/photo-1449156001437-37c645dca501?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Luxury Seaside Villa",
      location: "Jeju, Korea",
      price: "₩320,000",
      rating: 4.88,
      reviews: 89,
      coords: { top: '60%', left: '70%' },
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-slate-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-sm border-b border-gray-100 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
            <Compass className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-rose-500">MangoTravel</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Smart Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-gray-100 p-1 rounded-full border border-gray-200">
            <button className="px-4 py-1.5 text-sm font-semibold rounded-full bg-white shadow-sm">Stays</button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500">Experiences</button>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="profile" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Listing & Search */}
        <div className="w-full md:w-[450px] flex flex-col border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Where are you going?"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['Beachfront', 'Cabins', 'Design', 'Luxe', 'Trending'].map(cat => (
                <button key={cat} className="px-4 py-2 bg-gray-100 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-gray-200 transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 space-y-6 pb-24">
            <h2 className="text-lg font-bold">Featured Destinations</h2>
            {stays.map(stay => (
              <div 
                key={stay.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedStay(stay)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                  <img src={stay.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={stay.name} />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:text-rose-500 transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{stay.name}</h3>
                    <p className="text-sm text-gray-500">{stay.location}</p>
                    <p className="mt-1 font-semibold text-rose-600">{stay.price} <span className="text-gray-400 font-normal text-xs">/ night</span></p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-rose-500 text-rose-500" />
                    <span className="text-sm font-bold">{stay.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Map (Google Maps Integration Mockup) */}
        <div className="hidden md:block flex-1 relative bg-gray-200">
          {/* Map Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[#e5e7eb]" 
               style={{backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)', backgroundSize: '30px 30px'}}>
            
            {/* Map Markers */}
            {stays.map(stay => (
              <div 
                key={stay.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                style={{ top: stay.coords.top, left: stay.coords.left }}
                onClick={() => setSelectedStay(stay)}
              >
                <div className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-xl border-2 border-white transition-colors ${selectedStay?.id === stay.id ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  {stay.price}
                </div>
                <div className="w-0.5 h-2 bg-white mx-auto"></div>
              </div>
            ))}

            {/* Current Position Marker */}
            <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
            </div>
          </div>

          {/* Floating Map Controls */}
          <div className="absolute bottom-10 right-10 flex flex-col gap-2">
            <button className="p-3 bg-white rounded-xl shadow-lg text-gray-600 hover:text-black transition-colors"><Navigation size={20} /></button>
            <button className="p-3 bg-white rounded-xl shadow-lg text-gray-600 hover:text-black transition-colors"><Search size={20} /></button>
          </div>

          {/* Quick Preview Card on Map */}
          {selectedStay && (
            <div className="absolute bottom-10 left-10 right-10 md:right-auto md:w-80 bg-white rounded-2xl shadow-2xl p-4 flex gap-4 animate-in slide-in-from-bottom-5">
              <img src={selectedStay.image} className="w-24 h-24 rounded-xl object-cover" alt="preview" />
              <div className="flex-1">
                <h4 className="font-bold text-sm">{selectedStay.name}</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Star size={12} className="text-rose-500 fill-rose-500" />
                  <span>{selectedStay.rating} ({selectedStay.reviews})</span>
                </div>
                <button className="mt-3 w-full py-2 bg-rose-500 text-white text-xs font-bold rounded-lg hover:bg-rose-600 transition-colors">
                  View Booking
                </button>
              </div>
              <button onClick={() => setSelectedStay(null)} className="text-gray-400 hover:text-black">✕</button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Floating Dashboard (Travel Tools) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl p-3 flex items-center justify-between shadow-2xl z-50">
        <div className="flex items-center gap-1 md:gap-4 px-2">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'explore' ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Bed size={22} />
          </button>
          <button 
            onClick={() => setActiveTab('map')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'map' ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <MapPin size={22} />
          </button>
          <button 
            onClick={() => setActiveTab('translate')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'translate' ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Languages size={22} />
          </button>
          <button 
            onClick={() => setActiveTab('music')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'music' ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Music size={22} />
          </button>
        </div>

        {/* Contextual Widget Based on Tab */}
        <div className="flex-1 mx-4 h-12 bg-white/5 rounded-2xl flex items-center px-4 overflow-hidden border border-white/5">
          {activeTab === 'music' ? (
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center animate-pulse"><Play size={14} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Playing Now</p>
                <p className="text-xs font-semibold truncate text-white">Lo-fi Travel Beats - Study Session</p>
              </div>
            </div>
          ) : activeTab === 'translate' ? (
            <div className="flex items-center gap-3 w-full justify-between">
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">KOR</span>
              <div className="h-4 w-px bg-white/20"></div>
              <p className="text-xs text-white/80 italic flex-1 px-2 truncate">어디가 가장 맛있나요?</p>
              <span className="text-[10px] bg-rose-500 px-2 py-0.5 rounded text-white font-bold">ENG</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-xs font-semibold text-white/90">Find your next adventure...</p>
            </div>
          )}
        </div>

        <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg">
          Book
        </button>
      </div>
    </div>
  );
};

export default App;