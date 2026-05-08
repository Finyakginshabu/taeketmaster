import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeatBookingPage() {
  const { zoneId } = useParams();
  const navigate = useNavigate();

  // Mock data for seats (10 rows, 20 columns)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  // Initialize a mock seat map
  // 0: Available, 1: Selected, 2: Sold Out
  const [seats, setSeats] = useState(() => {
    const initial = {};
    rows.forEach(r => {
      cols.forEach(c => {
        const seatId = `${r}${c}`;
        // Make some random seats sold out
        if (['A18', 'A19', 'A20', 'B18', 'B19', 'C18', 'C19', 'D20', 'E19', 'G18'].includes(seatId)) {
          initial[seatId] = 2; // Sold out
        } else if (['D7', 'D8', 'D10', 'E14'].includes(seatId)) {
           initial[seatId] = 2; // Sold out
        } else {
          initial[seatId] = 0; // Available
        }
      });
    });
    return initial;
  });

  const handleSeatClick = (seatId) => {
    setSeats(prev => {
      const current = prev[seatId];
      if (current === 2) return prev; // Cannot click sold out
      
      // Toggle between 0 (Available) and 1 (Selected)
      return {
        ...prev,
        [seatId]: current === 0 ? 1 : 0
      };
    });
  };

  const selectedSeats = Object.keys(seats).filter(id => seats[id] === 1);
  const pricePerSeat = zoneId?.startsWith('A') ? 5900 : 3500;
  const totalPrice = selectedSeats.length * pricePerSeat;

  return (
    <div className="min-h-screen bg-[#F9F9F4] font-sans pb-16">
      <div className="max-w-6xl mx-auto pt-8 pb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Zone {zoneId || 'A1'} - Select Your Seat
        </h1>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-12 px-4">
        
        {/* Left: Seat Grid */}
        <div className="bg-[#EAEBDB] rounded-3xl p-8 flex flex-col shadow-sm">
          
          {/* Legend */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#6B7E54]"></div>
              <span className="text-sm font-semibold text-gray-700">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#A3B18A]"></div>
              <span className="text-sm font-semibold text-gray-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs font-bold">×</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">Sold Out</span>
            </div>
          </div>

          {/* Grid Container */}
          <div className="flex">
            {/* Row Labels */}
            <div className="flex flex-col gap-2 mr-4 mt-6">
              {rows.map(r => (
                <div key={`label-${r}`} className="h-6 flex items-center justify-center text-sm font-bold text-gray-600">
                  {r}
                </div>
              ))}
            </div>

            {/* Seats */}
            <div>
              {/* Column Labels */}
              <div className="flex gap-2 mb-2">
                {cols.map(c => (
                  <div key={`col-${c}`} className="w-6 flex justify-center text-xs font-bold text-gray-500">
                    {c}
                  </div>
                ))}
              </div>

              {/* Matrix */}
              <div className="flex flex-col gap-2">
                {rows.map(r => (
                  <div key={`row-${r}`} className="flex gap-2">
                    {cols.map(c => {
                      const seatId = `${r}${c}`;
                      const status = seats[seatId];
                      
                      let bgColor = 'bg-[#A3B18A] hover:bg-[#8e9c75]'; // Available
                      let cursor = 'cursor-pointer';
                      let content = null;

                      if (status === 1) {
                        bgColor = 'bg-[#6B7E54]'; // Selected
                      } else if (status === 2) {
                        bgColor = 'bg-gray-300'; // Sold Out
                        cursor = 'cursor-not-allowed';
                        content = <span className="text-gray-400 text-xs font-bold">×</span>;
                      }

                      return (
                        <div 
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${bgColor} ${cursor}`}
                        >
                          {content}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>

        {/* Right: Booking Detail */}
        <div className="w-full lg:w-80 bg-[#EAEBDB] rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-6 border-b border-[#C4C8B8] pb-4">
            Booking Detail
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">Showtime</span>
              <span className="font-medium text-gray-900 text-right w-32">Sat 27 Jun 2067 18:00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">Zone</span>
              <span className="font-bold text-gray-900">{zoneId || 'A1'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">Price</span>
              <span className="font-medium text-gray-900">{pricePerSeat.toLocaleString()} THB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">Amount</span>
              <span className="font-medium text-gray-900">{selectedSeats.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">Seat No.</span>
              <span className="font-bold text-[#6B7E54] truncate w-40 text-right">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8 pt-4 border-t border-[#C4C8B8]">
            <span className="font-bold text-gray-800">Total Price</span>
            <span className="font-bold text-xl text-gray-900">{totalPrice.toLocaleString()} THB</span>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-1/2"
            >
              Back
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-semibold text-white transition-colors w-1/2 ${
                selectedSeats.length > 0 
                  ? 'bg-[#6B7E54] hover:bg-[#5a6d45] cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={selectedSeats.length === 0}
            >
              Reserve
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
