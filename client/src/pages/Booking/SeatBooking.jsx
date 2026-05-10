import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { Selected, Available, NotAvailable } from '../../components/Icons.jsx';
import { formatDateTime } from '../../utils.js';
import { mockEvents, getBookedSeatsFromMock } from "../../api/mockData.js";
import './ConcertPlan.css';

export default function SeatBooking() {
  const { id: event_id, zoneId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();

  const [event, setEvent] = useState(null);

  const [isLoadingSeats, setIsLoadingSeats] = useState(true);
  
  // รับ showtime ที่ผู้ใช้เลือกมาจากหน้า ZoneSelection
  const selectedShowtime = location.state?.selectedShowtime || "N/A";
  const currentZone = zoneId || 'A1';

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  const [seats, setSeats] = useState({});

  useEffect(() => {
    const found = mockEvents.find(e => String(e.event_id) === String(event_id)); 
    if (found) setEvent(found);
  }, [event_id]);

//   useEffect(() => {
//     const fetchSeatStatus = async () => {
//       setIsLoadingSeats(true);
//       try {
//         // ⚠️ อย่าลืมเปลี่ยน URL ตรงนี้ให้ตรงกับ Backend API ที่ใช้ดึงข้อมูลตั๋ว
//         // ตัวอย่าง: สมมติว่า showtime_id คือ 1
//         const response = await fetch(`http://localhost:5000/api/tickets?showtimeId=1&zoneId=${currentZone}`);
        
//         let bookedSeatIds = [];
        
//         if (response.ok) {
//           const result = await response.json();
//           // คัดเอาเฉพาะ seat_id จากตั๋วแต่ละใบที่โหลดมาได้
//           if (result.success && result.data) {
//             bookedSeatIds = result.data.map(ticket => {
//               // 💡 เช็ค format ของข้อมูล ถ้า DB เก็บเป็น "A1-A18" ให้ตัดเอาเฉพาะ "A18" มาใช้
//               const parts = ticket.seat_id.split('-');
//               return parts.length > 1 ? parts[1] : ticket.seat_id;
//             });
//           }
//         }

//         const initial = {};
//         rows.forEach(r => {
//           cols.forEach(c => {
//             const seatId = `${r}${c}`;
            
//             // ฮาร์ดโค้ดจุดที่เป็นทางเดินหรือจุดอับ (ตามโค้ดเดิมของคุณ)
//             if (['A18', 'A19', 'A20', 'B18', 'B19', 'C18', 'C19', 'D20', 'E19', 'G18'].includes(seatId) || 
//                 ['D7', 'D8', 'D10', 'E14'].includes(seatId)) {
//               initial[seatId] = 2; // Sold out (ฮาร์ดโค้ดพื้นที่อับ)
//             } 
//             // เช็คว่าที่นั่งนี้ถูกจองไปหรือยัง (มีอยู่ใน Array ตั๋วที่ดึงมาไหม)
//             else if (bookedSeatIds.includes(seatId)) {
//               initial[seatId] = 2; // Sold out (มีคนจองแล้วจาก DB)
//             } 
//             else {
//               initial[seatId] = 0; // Available
//             }
//           });
//         });

//         setSeats(initial);

//       } catch (error) {
//         console.error("Failed to fetch seat status:", error);
//       } finally {
//         setIsLoadingSeats(false); // ปิดสถานะโหลดไม่ว่าจะสำเร็จหรือ Error
//       }
//     };

//     fetchSeatStatus();
//   }, [selectedShowtime, currentZone]);

// 3. ดึงข้อมูลตั๋วมาเพื่อเช็คที่นั่งว่าง (ใช้ข้อมูล Mock แทน API ชั่วคราว)
  useEffect(() => {
    const fetchSeatStatus = async () => {
      setIsLoadingSeats(true);
      try {
        // สมมติว่า showtime_id ของรอบนี้คือ 1 (เดี๋ยวค่อยผูกกับ ID จริงทีหลัง)
        const currentShowtimeId = 1; 

        // 💡 เรียกใช้ฟังก์ชันดึงข้อมูลจำลองแทนคำสั่ง fetch()
        const bookedSeatIds = getBookedSeatsFromMock(event_id, currentShowtimeId, currentZone);

        const initial = {};
        rows.forEach(r => {
          cols.forEach(c => {
            const seatId = `${r}${c}`;
            
            // เช็คจุดที่เป็นทางเดินหรือพื้นที่อับ
            if (['A18', 'A19', 'A20', 'B18', 'B19', 'C18', 'C19', 'D20', 'E19', 'G18'].includes(seatId) || 
                ['D7', 'D8', 'D10', 'E14'].includes(seatId)) {
              initial[seatId] = 2; // Sold out (ฮาร์ดโค้ด)
            } 
            // 💡 เช็คว่าที่นั่งตรงกับข้อมูลจำลองที่ถูกจองไปหรือยัง
            else if (bookedSeatIds.includes(seatId)) {
              initial[seatId] = 2; // Sold out (มีคนจองแล้ว)
            } 
            else {
              initial[seatId] = 0; // Available
            }
          });
        });

        // จำลองการดีเลย์นิดหน่อยให้ดูเหมือนกำลังโหลดข้อมูลจาก Server จริงๆ (ถ้าไม่อยากให้ดีเลย์ลบออกได้ครับ)
        setTimeout(() => {
          setSeats(initial);
          setIsLoadingSeats(false);
        }, 500);

      } catch (error) {
        console.error("Failed to fetch seat status:", error);
        setIsLoadingSeats(false);
      }
    };

    fetchSeatStatus();
  }, [selectedShowtime, currentZone, event_id]);

  const handleSeatClick = (seatId) => {
    setSeats(prev => {
      const current = prev[seatId];
      if (current === 2) return prev; 
      return { ...prev, [seatId]: current === 1 ? 0 : 1 };
    });
  };

  const selectedSeats = Object.keys(seats).filter(seatId => seats[seatId] === 1);
  const pricePerSeat = currentZone.startsWith('A') ? 5900 : 3500;
  const totalPrice = selectedSeats.length * pricePerSeat;

  const handleReserve = () => {
    selectedSeats.forEach(seatId => {
      addItem({
        showtime_id: 1,
        event_title: event?.title || "Concert",
        venue_name: event?.venue_name || "Impact Arena",
        show_at: selectedShowtime,
        seat_id: `${currentZone}-${seatId}`,
        seat_number: seatId,
        zone_name: currentZone,
        price: pricePerSeat
      });
    });
    navigate(`/cart/${event_id}`);
  };

  if (!event) return null;

  return (
    <div className="sbp-root" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F4F5F0', paddingBottom: '40px' }}>
      
      <div className="sbp-title-container" style={{ marginTop: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <div className="concert-title" style={{ fontSize: '40px', fontWeight: 'bold' }}>{event.title}</div>
      </div>

      <div className="sbp-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', width: '100%', maxWidth: '1100px', margin: '20px auto 0 auto' }}>
        
        <div className="sbp-grid-container">
          <div className="sbp-legend">
            <div className="sbp-legend-item">
              <Selected /> <span className="sbp-legend-text">Selected</span>
            </div>
            <div className="sbp-legend-item">
              <Available /> <span className="sbp-legend-text">Available</span>
            </div>
            <div className="sbp-legend-item">
              <NotAvailable /> <span className="sbp-legend-text">Sold Out</span>
            </div>
          </div>

          <div className="sbp-grid">
            {/* แสดงข้อความโหลดถ้ารอ API อยู่ ถ้าโหลดเสร็จค่อยโชว์ที่นั่ง */}
            {isLoadingSeats ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                Loading seat...
              </div>
            ) : (
              <>
                <div className="sbp-row-labels">
                  {rows.map(r => <div key={`label-${r}`} className="sbp-row-label">{r}</div>)}
                </div>
                <div className="sbp-seats-area">
                  <div className="sbp-col-labels">
                    {cols.map(c => <div key={`col-${c}`} className="sbp-col-label">{c}</div>)}
                  </div>
                  <div className="sbp-seats-matrix">
                    {rows.map(r => (
                      <div key={`row-${r}`} className="sbp-seat-row">
                        {cols.map(c => {
                          const seatId = `${r}${c}`;
                          const status = seats[seatId];
                          
                          let IconComponent = Available;
                          let btnClass = 'sbp-seat available';

                          if (status === 1) {
                            IconComponent = Selected;
                            btnClass = 'sbp-seat selected';
                          } else if (status === 2) {
                            IconComponent = NotAvailable;
                            btnClass = 'sbp-seat soldout';
                          }
                          
                          return (
                            <button 
                              key={seatId} 
                              onClick={() => handleSeatClick(seatId)} 
                              className={btnClass} 
                              disabled={status === 2}
                              style={{ 
                                background: 'transparent', 
                                border: 'none', 
                                padding: 0, 
                                cursor: status === 2 ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <IconComponent />
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
            <h2 className="sbp-detail-title">Booking Detail</h2>
            <div className="sbp-detail" style={{ minWidth: '300px' }}>
            
            <div className="sbp-detail-info">
                <div className="sbp-detail-row">
                <span className="sbp-detail-label">Showtime</span>
                <span className="sbp-detail-value">{formatDateTime(selectedShowtime, true)}</span>
                </div>
                <div className="sbp-detail-row">
                <span className="sbp-detail-label">Zone</span>
                <span className="sbp-detail-value">{currentZone}</span>
                </div>
                <div className="sbp-detail-row">
                <span className="sbp-detail-label">Price</span>
                <span className="sbp-detail-value">{pricePerSeat.toLocaleString()} THB</span>
                </div>
                <div className="sbp-detail-row">
                <span className="sbp-detail-label">Amount</span>
                <span className="sbp-detail-value">{selectedSeats.length}</span>
                </div>
                <div className="sbp-detail-row">
                <span className="sbp-detail-label">Seat No.</span>
                <span className="sbp-detail-value highlight">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
                </span>
                </div>
            </div>

            <div className="sbp-detail-total">
                <span className="sbp-total-label">Total Price</span>
                <span className="sbp-total-value">{totalPrice.toLocaleString()} THB</span>
            </div>

            <div className="sbp-detail-actions">
                <button onClick={() => navigate(`/event-booking/${event_id}`)} className="sbp-btn back">Back</button>
                <button className="sbp-btn reserve" disabled={selectedSeats.length === 0} onClick={handleReserve} style={{ cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer' }}>Reserve</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}