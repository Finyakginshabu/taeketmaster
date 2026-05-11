import { useState, useEffect } from "react";
import { getAvailableSeat } from "../../api/eventDetails.api.js";
import "./SeatAvailableModal.css";

export default function SeatAvailableModal({ isOpen, onClose, eventId }) {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableSeats = async () => {
    if (!eventId) {
      setError("Event ID not provided");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAvailableSeat({ id: eventId });
      setSeats(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch available seats");
      console.error("Error fetching available seats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && eventId) {
      fetchAvailableSeats();
    }
  }, [isOpen, eventId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close-btn" onClick={onClose} aria-label="ปิด">
          ✕
        </button>

        <h2 className="modal-title">Seat Available</h2>

        {error && <div className="error-message">{error}</div>}

        <table className="seat-table">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="loading-message">Loading...</td>
              </tr>
            ) : seats.length === 0 ? (
              <tr>
                <td colSpan="2" className="no-data-message">No available seats</td>
              </tr>
            ) : (
              seats.map((row) => (
                <tr key={row.zone_name}>
                  <td>{row.zone_name}</td>
                  <td className="seat-count">{row.available_seats}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="reload-btn-wrapper">
          <button
            className="reload-btn"
            onClick={fetchAvailableSeats}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

      </div>
    </div>
  );
}