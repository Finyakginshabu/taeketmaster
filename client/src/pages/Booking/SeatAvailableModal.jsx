import { useState } from "react";
import "./SeatAvailableModal.css";

const seatData = [
  { zone: "A1", available: 242 },
  { zone: "A2", available: 275 },
  { zone: "B1", available: 257 },
  { zone: "B2", available: 267 },
];

export default function SeatAvailableModal({ isOpen, onClose, showtime }) {
  const [seats, setSeats] = useState(seatData);
  const [loading, setLoading] = useState(false);

  const handleReload = () => {
    setLoading(true);
    setTimeout(() => {
      setSeats(
        seatData.map((s) => ({
          ...s,
          available: Math.floor(Math.random() * 100) + 200,
        }))
      );
      setLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close-btn" onClick={onClose} aria-label="ปิด">
          ✕
        </button>

        <h2 className="modal-title">Seat Available</h2>

        <table className="seat-table">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {seats.map((row) => (
              <tr key={row.zone}>
                <td>{row.zone}</td>
                <td className="seat-count">
                  {loading ? "..." : row.available}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="reload-btn-wrapper">
          <button
            className="reload-btn"
            onClick={handleReload}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

      </div>
    </div>
  );
}