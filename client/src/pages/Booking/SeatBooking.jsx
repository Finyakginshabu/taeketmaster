import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Cart/CartContext.jsx';
import { Selected, Available, NotAvailable } from '../../components/Icons.jsx';
import { formatDateTime } from '../../utils.js';
import { getSeatLayout, getEventDetailTwo, getZoneLayout } from '../../api/eventDetails.api.js';
import { reserveTicket } from '../../api/bookings.api.js';
import './ConcertPlan.css';

export default function SeatBooking(){
  const { id: event_id, zoneId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();

  const [event, setEvent] = useState(null);
  const [isLoadingSeats, setIsLoadingSeats] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(location.state?.selectedShowtime || null);
  
  let zones = location.state?.zones || [];
  const [fetchedZones, setFetchedZones] = useState([]);

  const [seats, setSeats] = useState([]);
  const [zoneData, setZoneData] = useState(null);
  const [seatStates, setSeatStates] = useState({});

  
  const searchParams = new URLSearchParams(location.search);
  const showtimeIdFromUrl = searchParams.get('showtime');

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await getEventDetailTwo(event_id);
        setEvent(eventData);
        
        
        if (!selectedShowtime && showtimeIdFromUrl && eventData?.showtimes?.length > 0) {
          const foundShowtime = eventData.showtimes.find(st => st.showtime_id === parseInt(showtimeIdFromUrl));
          if (foundShowtime) {
            setSelectedShowtime(foundShowtime);
          }
        } 
        
        else if (!selectedShowtime && eventData?.showtimes?.length > 0) {
          setSelectedShowtime(eventData.showtimes[0]);
        }
      } catch (err){
        console.error("Error fetching event:", err);
        setError(err.message);
      }
    };
    
    fetchEventData();
  }, [event_id]);

  
  useEffect(() => {
    if (zones.length === 0) {
      const fetchZones = async () => {
        try {
          const zonesData = await getZoneLayout({ id: event_id });
          setFetchedZones(zonesData);
        } catch (err) {
          console.error("Error fetching zones:", err);
          setError(err.message);
        }
      };
      fetchZones();
    }
  }, [event_id]);

  
  if (zones.length === 0 && fetchedZones.length > 0) {
    zones = fetchedZones;
  }

  useEffect(() => {
    if(!zones || zones.length === 0) return;
    
    const fetchSeatStatus = async () => {
      setIsLoadingSeats(true);
      try {
        
        const zoneIdInt = parseInt(zoneId);
        const matchingZone = zones.find(z => z.zone_id === zoneIdInt);
        if(!matchingZone){
          throw new Error(`Zone ${zoneId} not found`);
        }

        
        const showtimeId = selectedShowtime?.showtime_id;
        if(!showtimeId){
          throw new Error("Showtime ID not found. Please select a valid showtime.");
        }

        const seatData = await getSeatLayout({
          zone_id: matchingZone.zone_id,
          showtime_id: showtimeId
        });

        
        const initialStates = {};
        if(seatData && Array.isArray(seatData)){
          seatData.forEach(seat => {
            
            initialStates[seat.seat_id] = seat.is_booked ? 2 : 0;
          });
        }

        setSeats(seatData || []);
        setSeatStates(initialStates);
        setZoneData(matchingZone);
      } catch (err){
        console.error("Error fetching seat status:", err);
        setError(err.message);
      } finally {
        setIsLoadingSeats(false);
      }
    };

    fetchSeatStatus();
  }, [zones, zoneId, selectedShowtime])

  
  const currentZone = zoneData?.zone_name || 'Unknown';

  const handleSeatClick = (seatId) => {
    setSeatStates(prev => {
      const current = prev[seatId] || 0;
      if(current === 2) return prev; 
      return { ...prev, [seatId]: current === 1 ? 0 : 1 }; 
    });
  };

  const selectedSeats = Object.keys(seatStates).filter(seatId => seatStates[seatId] === 1);
  
  
  const zonePrice = event?.ticket_prices?.[currentZone] || 5900;
  const pricePerSeat = typeof zonePrice === 'number' ? zonePrice : 5900;
  const totalPrice = selectedSeats.length * pricePerSeat;

  const handleReserve = async () => {
    try {
      
      const token = localStorage.getItem('token');
      if(!token){
        setError('Please log in to reserve tickets');
        return;
      }

      
      const showtimeId = selectedShowtime?.showtime_id;
      if(!showtimeId){
        setError('Showtime ID not found. Please select a valid showtime.');
        return;
      }

      
      const reservationData = selectedSeats.map(seatId => ({
        showtime_id: showtimeId,
        seat_id: seatId
      }));

      
      for (const data of reservationData) {
        await reserveTicket(data, token);
      }

      
      selectedSeats.forEach(seatId => {
        const seat = seats.find(s => s.seat_id === seatId);
        addItem({
          event_id: event_id,
          showtime_id: showtimeId,
          event_title: event?.title || "Concert",
          venue_name: "Impact Arena",
          show_at: selectedShowtime.show_at,
          seat_id: seatId,
          seat_number: seat?.number || seatId,
          zone_name: currentZone,
          price: pricePerSeat
        });
      });

      navigate(`/cart/${event_id}`);
    } catch (err) {
      console.error("Error reserving tickets:", err);
      setError(err.message);
    }
  };

  if(error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  if(!event) return <div style={{ padding: '40px', textAlign: 'center' }}>Event not found</div>;

  return (
    <div className="sbp-root" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F4F5F0', paddingBottom: '40px' }}>
      
      <div className="sbp-title-container" style={{ marginTop: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <div className="concert-title" style={{ fontSize: '40px', fontWeight: 'bold' }}>{event.title}</div>
      </div>

      <div className="sbp-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', width: '100%', maxWidth: '2000px', margin: '20px auto 0 auto' }}>
        
        <div className="sbp-grid-container" style={{ width: '913px', height: '732px', flexShrink: 0, border: '1px solid #ddd', position: 'relative', overflow: 'hidden' }}>
          {isLoadingSeats && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading seats...</div>
          )}
          {!isLoadingSeats && seats.length > 0 && (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '40px',
                zIndex: 20
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Selected />
                  </div>
                  <span style={{ fontSize: '20px', fontWeight: '500' }}>Selected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Available />
                  </div>
                  <span style={{ fontSize: '20px', fontWeight: '500' }}>Available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <NotAvailable />
                  </div>
                  <span style={{ fontSize: '20px', fontWeight: '500' }}>Not Available</span>
                </div>
              </div>

              {seats.map(seat => {
                const state = seatStates[seat.seat_id] || 0; 
                let IconComponent = Available;
                let clickable = true;

                if(state === 1){
                  IconComponent = Selected;
                } else if(state === 2){
                  IconComponent = NotAvailable;
                  clickable = false;
                }

                return (
                  <button
                    key={seat.seat_id}
                    onClick={() => clickable && handleSeatClick(seat.seat_id)}
                    disabled={!clickable}
                    style={{
                      position: 'absolute',
                      left: `${seat.x_pos}px`,
                      top: `calc(${seat.y_pos}px + 36px)`,
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: clickable ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '36px',
                      height: '36px',
                      zIndex: 10
                    }}
                  >
                    <IconComponent />
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div>
            <h2 className="sbp-detail-title">Booking Detail</h2>
            <div className="sbp-detail" style={{ minWidth: '300px' }}>
            
            <div className="sbp-detail-info">
                <div className="sbp-detail-row">
                <span className="sbp-detail-label">Showtime</span>
                <span className="sbp-detail-value">{selectedShowtime?.show_at || 'Loading...'}</span>
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