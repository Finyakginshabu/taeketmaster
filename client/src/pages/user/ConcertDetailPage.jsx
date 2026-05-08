import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Image as ImageIcon, X } from 'lucide-react';

export default function ConcertDetailPage() {
  const navigate = useNavigate();

  // Mock data
  const showtimes = [
    { id: 1, label: 'Sat 27 Jun 2067 18:00' },
    { id: 2, label: 'Sun 28 Jun 2067 10:00' }
  ];
  const [selectedShowtime, setSelectedShowtime] = useState(showtimes[0].id);
  const [showAvailableModal, setShowAvailableModal] = useState(false);

  const handleZoneClick = (zoneId) => {
    navigate(`/seat-booking/${zoneId}`);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F4] font-sans pb-16">
      {/* Title */}
      <div className="max-w-6xl mx-auto pt-8 pb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Bodyslim The experience 1st Tour
        </h1>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-start gap-12 px-4">
        
        {/* Left: Concert Map (Fixed 732x732 aspect ratio via explicit size or padding) */}
        <div 
          className="bg-[#EAEBDB] rounded-3xl flex flex-col items-center justify-center relative p-8 shadow-sm"
          style={{ width: '732px', height: '732px' }}
        >
          {/* STAGE */}
          <div className="bg-black text-white w-96 h-20 flex items-center justify-center text-3xl font-black tracking-widest relative mb-12">
            STAGE
            <div className="absolute w-8 h-8 bg-black -left-8 top-6"></div>
            <div className="absolute w-8 h-8 bg-black -right-8 top-6"></div>
          </div>

          {/* Zones Row 1 (A1, A2) */}
          <div className="flex gap-6 mb-6">
            <button 
              onClick={() => handleZoneClick('A1')}
              className="w-56 h-40 bg-[#E8B98B] rounded-xl flex flex-col items-center justify-center text-4xl font-bold text-white shadow-md hover:scale-105 transition-transform"
              style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)' }} // Example shape modification
            >
              A1
            </button>
            <button 
              onClick={() => handleZoneClick('A2')}
              className="w-56 h-40 bg-[#E8B98B] rounded-xl flex flex-col items-center justify-center text-4xl font-bold text-white shadow-md hover:scale-105 transition-transform"
              style={{ clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 0 100%)' }}
            >
              A2
            </button>
          </div>

          {/* Zones Row 2 (B1, B2) */}
          <div className="flex gap-6 mb-6">
            <button 
              onClick={() => handleZoneClick('B1')}
              className="w-56 h-40 bg-[#C46A3D] rounded-xl flex flex-col items-center justify-center text-4xl font-bold text-white shadow-md hover:scale-105 transition-transform"
            >
              B1
            </button>
            <button 
              onClick={() => handleZoneClick('B2')}
              className="w-56 h-40 bg-[#C46A3D] rounded-xl flex flex-col items-center justify-center text-4xl font-bold text-white shadow-md hover:scale-105 transition-transform"
            >
              B2
            </button>
          </div>

          {/* FOH */}
          <div className="bg-[#D1D5DB] w-32 h-10 flex items-center justify-center text-sm font-bold text-gray-600 rounded mt-4">
            FOH
          </div>
        </div>

        {/* Right: Controls & Pricing */}
        <div className="flex flex-col w-72 relative">
          
          <h3 className="text-center font-bold text-lg mb-4 text-gray-900">Showtime</h3>
          
          {/* Showtime Selectors */}
          <div className="flex flex-col gap-3 mb-8">
            {showtimes.map(st => (
              <button 
                key={st.id}
                onClick={() => setSelectedShowtime(st.id)}
                className={`flex justify-between items-center w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  selectedShowtime === st.id 
                    ? 'bg-[#6B7E54] text-white' 
                    : 'bg-[#EAEBDB] text-gray-600 hover:bg-[#d8d9c7]'
                }`}
              >
                <span>{st.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Seat Available Button */}
          <div className="relative flex justify-center mb-8">
            <button 
              onClick={() => setShowAvailableModal(!showAvailableModal)}
              className="bg-white border-2 border-[#6B7E54] text-[#6B7E54] px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#f4f5f0] transition-colors"
            >
              Seat Available
            </button>

            {/* Modal / Popover for Seat Available */}
            {showAvailableModal && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-900">Zone A1 - Available Seats</h4>
                  <button onClick={() => setShowAvailableModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex text-sm">
                    <span className="font-semibold w-16 text-gray-700">Row A:</span>
                    <span className="text-gray-600">A3, A4, A7, A12, A19</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="font-semibold w-16 text-gray-700">Row B:</span>
                    <span className="text-gray-600">B1, B2, B15</span>
                  </div>
                  <div className="flex text-sm bg-gray-50 p-1 rounded">
                    <span className="font-semibold w-16 text-gray-700">Row C:</span>
                    <span className="text-gray-600">C5, C10, C18</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="font-semibold w-16 text-gray-700">Row D:</span>
                    <span className="text-gray-600">D9, D14, D20</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setShowAvailableModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => handleZoneClick('A1')}
                    className="px-4 py-2 bg-[#6B7E54] text-white rounded-lg text-sm font-medium hover:bg-[#5a6d45]"
                  >
                    View Map
                  </button>
                </div>
                {/* Tooltip triangle */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
              </div>
            )}
          </div>

          {/* Pricing Card */}
          <div className="bg-[#EAEBDB] rounded-2xl p-6 flex flex-col items-center">
            {/* Image Placeholder */}
            <div className="w-24 h-24 bg-[#F2F2E9] border-2 border-[#D1D5DB] border-dashed rounded-xl flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-gray-400" />
            </div>

            <div className="text-sm font-bold tracking-widest text-gray-800 mb-6">
              PRICING
            </div>

            {/* Price Legends */}
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="w-8 h-6 bg-[#E8B98B] rounded"></div>
                <span className="font-bold text-gray-800">5,900 THB</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-6 bg-[#C46A3D] rounded"></div>
                <span className="font-bold text-gray-800">3,500 THB</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}