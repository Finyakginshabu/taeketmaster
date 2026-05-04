import {useState} from 'react';
import {days, months} from '../utils.js';

export default function CalendarPicker({ value, onChange, onClose }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value || today);
  const [view, setView] = useState('day');

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (d) =>
    value && value.getDate() === d &&
    value.getMonth() === month && value.getFullYear() === year;
  const isToday = (d) =>
    today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

  const select = (d) => { onChange(new Date(year, month, d)); onClose(); };

  const yearBase = year - 6;
  const yearRange = Array.from({ length: 18 }, (_, i) => yearBase + i);

  if (view === 'month') return (
    <div style={styles.calendarBox}>
      <div style={styles.calHeader}>
        <button style={styles.navBtn} onClick={() => setViewDate(new Date(year - 1, month, 1))}>‹</button>
        <button style={styles.titleBtn} onClick={() => setView('year')}>{year}</button>
        <button style={styles.navBtn} onClick={() => setViewDate(new Date(year + 1, month, 1))}>›</button>
      </div>
      <div style={styles.monthGrid}>
        {months.map((m, i) => (
          <button key={m} style={{ ...styles.monthCell, ...(month === i ? styles.cellSelected : {}) }}
            onClick={() => { setViewDate(new Date(year, i, 1)); setView('day'); }}>
            {m.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );

  if (view === 'year') return (
    <div style={styles.calendarBox}>
      <div style={styles.calHeader}>
        <button style={styles.navBtn} onClick={() => setViewDate(new Date(year - 18, month, 1))}>‹</button>
        <span style={styles.calTitle}>{yearRange[0]}–{yearRange[yearRange.length - 1]}</span>
        <button style={styles.navBtn} onClick={() => setViewDate(new Date(year + 18, month, 1))}>›</button>
      </div>
      <div style={styles.yearGrid}>
        {yearRange.map((y) => (
          <button key={y} style={{ ...styles.yearCell, ...(year === y ? styles.cellSelected : {}) }}
            onClick={() => { setViewDate(new Date(y, month, 1)); setView('month'); }}>
            {y}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.calendarBox}>
      <div style={styles.calHeader}>
        <button style={styles.navBtn} onClick={() => setViewDate(new Date(year, month - 1, 1))}>‹</button>
        <button style={styles.titleBtn} onClick={() => setView('month')}>
          {months[month]} {year}
        </button>
        <button style={styles.navBtn} onClick={() => setViewDate(new Date(year, month + 1, 1))}>›</button>
      </div>
      <div style={styles.calGrid}>
        {days.map((d) => <div key={d} style={styles.dayLabel}>{d}</div>)}
        {cells.map((d, i) => d === null ? <div key={`e-${i}`} /> : (
          <button key={d} onClick={() => select(d)} style={{
            ...styles.dayCell,
            ...(isSelected(d) ? styles.dayCellSelected : {}),
            ...(isToday(d) && !isSelected(d) ? styles.dayCellToday : {}),
          }}>{d}</button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  calendarBox: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: 0,
    background: "#f5f3e8",
    border: "1px solid #c8c6a0",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    zIndex: 100,
    padding: "14px 16px 16px",
    width: 270,
  },
  calHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  navBtn: {
    background: "none", border: "none",
    cursor: "pointer", fontSize: 20,
    color: "#3d4418", padding: "0 6px",
  },
  calTitle: {
    fontWeight: 600, fontSize: 14, color: "#2a2f0f",
  },
  calGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 2,
  },
  dayLabel: {
    textAlign: "center", fontSize: 11,
    color: "#7a7d50", fontWeight: 600,
    padding: "2px 0 4px",
  },
  dayCell: {
    background: "none", border: "none",
    borderRadius: 8, padding: "5px 0",
    fontSize: 13, cursor: "pointer",
    textAlign: "center", color: "#2a2f0f",
    fontFamily: "inherit",
  },
  dayCellSelected: {
    background: "#4a5228", color: "#f5f3e8",
    fontWeight: 700, borderRadius: 8,
  },
  dayCellToday: {
    border: "1.5px solid #4a5228",
    borderRadius: 8, fontWeight: 600,
  },
    titleBtn: {
    background: "none", border: "none", cursor: "pointer",
    fontWeight: 600, fontSize: 14, color: "#2a2f0f",
    padding: "4px 8px", borderRadius: 8,
    fontFamily: "inherit",
  },
  monthGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 4,
  },
  monthCell: {
    background: "none", border: "none", borderRadius: 8,
    padding: "8px 4px", fontSize: 13, cursor: "pointer",
    textAlign: "center", color: "#2a2f0f", fontFamily: "inherit",
  },
  yearGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 4,
  },
  yearCell: {
    background: "none", border: "none", borderRadius: 8,
    padding: "8px 4px", fontSize: 13, cursor: "pointer",
    textAlign: "center", color: "#2a2f0f", fontFamily: "inherit",
  },
  cellSelected: {
    background: "#4a5228", color: "#f5f3e8", fontWeight: 700, borderRadius: 8,
  },
};