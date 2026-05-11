import { useState } from "react";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function isSameDay(a, b){
  if(!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function inRange(d, start, end){
  if(!start || !end) return false;
  const t = d.getTime();
  const s = start.getTime();
  const e = end.getTime();
  return t > Math.min(s, e) && t < Math.max(s, e);
}

function CalendarMonth({ year, month, start, end, hovered, onSelect, onHover, view, setView, setViewDate }){
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const rangeEnd = hovered || end;
  const rangeStart = start;

  const getStyle = (d) => {
    const date = new Date(year, month, d);
    const isStart = isSameDay(date, rangeStart);
    const isEnd = rangeEnd && isSameDay(date, rangeEnd);
    const isIn = inRange(date, rangeStart, rangeEnd);
    const isToday = isSameDay(date, today);

    let bg = "transparent";
    let color = "var(--color-text-primary)";
    let borderRadius = "8px";
    let fontWeight = isToday ? 600 : 400;
    let border = isToday && !isStart && !isEnd ? "1.5px solid #4a5228" : "1.5px solid transparent";

    if(isStart || isEnd){
      bg = "#4a5228";
      color = "#f5f3e8";
      fontWeight = 700;
      border = "1.5px solid transparent";
    } else if(isIn){
      bg = "rgba(74,82,40,0.13)";
      borderRadius = "0";
    }

    const effectiveStart = rangeStart && rangeEnd
      ? (rangeStart.getTime() <= rangeEnd.getTime() ? rangeStart : rangeEnd)
      : rangeStart;
    const effectiveEnd = rangeStart && rangeEnd
      ? (rangeStart.getTime() <= rangeEnd.getTime() ? rangeEnd : rangeStart)
      : rangeEnd;

    if(isIn){
      const isStartOfRange = effectiveStart && isSameDay(date, effectiveStart);
      const isEndOfRange = effectiveEnd && isSameDay(date, effectiveEnd);
      if(!isStartOfRange && !isEndOfRange){
        borderRadius = "0";
      }
    }

    if(isStart && effectiveEnd && !isSameDay(effectiveStart, effectiveEnd)){
      borderRadius = effectiveStart && isSameDay(date, effectiveStart) ? "8px 0 0 8px" : "0 8px 8px 0";
    }
    if(isEnd && effectiveStart && !isSameDay(effectiveStart, effectiveEnd)){
      borderRadius = effectiveEnd && isSameDay(date, effectiveEnd) ? "0 8px 8px 0" : "8px 0 0 8px";
    }

    return { bg, color, borderRadius, fontWeight, border };
  };

  if(view === "month"){
    const yearBase = year - 6;
    const yearRange = Array.from({ length: 18 }, (_, i) => yearBase + i);
    return (
      <div style={s.calBox}>
        <div style={s.header}>
          <button style={s.navBtn} onClick={() => setViewDate(new Date(year - 1, month, 1))}>‹</button>
          <button style={s.titleBtn} onClick={() => setView("year")}>{year}</button>
          <button style={s.navBtn} onClick={() => setViewDate(new Date(year + 1, month, 1))}>›</button>
        </div>
        <div style={s.monthGrid}>
          {months.map((m, i) => (
            <button key={m}
              style={{ ...s.monthCell, ...(month === i ? s.cellSel : {}) }}
              onClick={() => { setViewDate(new Date(year, i, 1)); setView("day"); }}>
              {m.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if(view === "year"){
    const yearBase = year - 6;
    const yearRange = Array.from({ length: 18 }, (_, i) => yearBase + i);
    return (
      <div style={s.calBox}>
        <div style={s.header}>
          <button style={s.navBtn} onClick={() => setViewDate(new Date(year - 18, month, 1))}>‹</button>
          <span style={s.titleStatic}>{yearRange[0]}–{yearRange[yearRange.length - 1]}</span>
          <button style={s.navBtn} onClick={() => setViewDate(new Date(year + 18, month, 1))}>›</button>
        </div>
        <div style={s.yearGrid}>
          {yearRange.map((y) => (
            <button key={y}
              style={{ ...s.yearCell, ...(year === y ? s.cellSel : {}) }}
              onClick={() => { setViewDate(new Date(y, month, 1)); setView("month"); }}>
              {y}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={s.calBox}>
      <div style={s.header}>
        <button style={s.navBtn} onClick={() => setViewDate(new Date(year, month - 1, 1))}>‹</button>
        <button style={s.titleBtn} onClick={() => setView("month")}>
          {months[month]} {year}
        </button>
        <button style={s.navBtn} onClick={() => setViewDate(new Date(year, month + 1, 1))}>›</button>
      </div>
      <div style={s.calGrid}>
        {days.map((d) => <div key={d} style={s.dayLabel}>{d}</div>)}
        {cells.map((d, i) =>
          d === null ? <div key={`e-${i}`} /> : (() => {
            const { bg, color, borderRadius, fontWeight, border } = getStyle(d);
            return (
              <button
                key={d}
                onClick={() => onSelect(new Date(year, month, d))}
                onMouseEnter={() => onHover(new Date(year, month, d))}
                onMouseLeave={() => onHover(null)}
                style={{
                  ...s.dayCell,
                  background: bg,
                  color,
                  borderRadius,
                  fontWeight,
                  border,
                }}
              >{d}</button>
            );
          })()
        )}
      </div>
    </div>
  );
}

export default function CalendarRangePicker({ value, onChange, onClose }){
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const [view, setView] = useState("day");
  const [hovered, setHovered] = useState(null);
  const [selecting, setSelecting] = useState(false);

  const start = value?.start || null;
  const end = value?.end || null;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handleSelect = (date) => {
    if(!selecting || !start){
      onChange({ start: date, end: null });
      setSelecting(true);
    } else {
      const newStart = date < start ? date : start;
      const newEnd = date < start ? start : date;
      onChange({ start: newStart, end: newEnd });
      setSelecting(false);
      if(onClose) onClose();
    }
  };

  const handleClear = () => {
    onChange({ start: null, end: null });
    setSelecting(false);
  };

  const formatDate = (d) => d
    ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  const rangeLabel = start && end
    ? `${formatDate(start)} → ${formatDate(end)}`
    : start
    ? `${formatDate(start)} → pick end date`
    : "Pick a start date";

  return (
    <div style={s.wrapper}>
      <h2 style={{
        position: "absolute", width: 1, height: 1,
        padding: 0, margin: -1, overflow: "hidden",
        clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0
        }}>Date range picker</h2>

      <div style={s.statusRow}>
        <span style={{ ...s.statusText, color: start ? "#2a2f0f" : "#7a7d50" }}>
          {rangeLabel}
        </span>
        {(start || end) && (
          <button style={s.clearBtn} onClick={handleClear}>✕ Clear</button>
        )}
      </div>

      <CalendarMonth
        year={year} month={month}
        start={start} end={end}
        hovered={selecting ? hovered : null}
        onSelect={handleSelect}
        onHover={selecting ? setHovered : () => {}}
        view={view} setView={setView}
        setViewDate={setViewDate}
      />

      {(start || end) && !selecting && (
        <div style={s.summaryRow}>
          <div style={s.summaryChip}>
            <span style={s.chipLabel}>From</span>
            <span style={s.chipVal}>{formatDate(start)}</span>
          </div>
          <span style={s.arrow}>→</span>
          <div style={s.summaryChip}>
            <span style={s.chipLabel}>To</span>
            <span style={s.chipVal}>{formatDate(end)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  wrapper: {
    position: "absolute",  
    top: "calc(100% + 8px)", 
    left: 0,                 
    zIndex: 100,               
    display: "inline-block",
    background: "#f5f3e8",
    border: "1px solid #c8c6a0",
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    padding: "18px 20px 20px",
    minWidth: 290,
    fontFamily: "inherit",
  },
  statusRow: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  statusText: {
    fontSize: 13, fontWeight: 500,
    letterSpacing: 0.1,
  },
  clearBtn: {
    background: "none", border: "none",
    cursor: "pointer", fontSize: 11,
    color: "#7a7d50", padding: "2px 6px",
    borderRadius: 6, fontFamily: "inherit",
  },
  calBox: {
    background: "transparent",
  },
  header: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  navBtn: {
    background: "none", border: "none",
    cursor: "pointer", fontSize: 20,
    color: "#3d4418", padding: "0 6px",
    fontFamily: "inherit",
  },
  titleBtn: {
    background: "none", border: "none",
    cursor: "pointer", fontWeight: 600,
    fontSize: 14, color: "#2a2f0f",
    padding: "4px 8px", borderRadius: 8,
    fontFamily: "inherit",
  },
  titleStatic: {
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
    border: "1.5px solid transparent",
    padding: "5px 0", fontSize: 13,
    cursor: "pointer", textAlign: "center",
    color: "#2a2f0f", fontFamily: "inherit",
    transition: "background 0.1s, color 0.1s",
  },
  monthGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6, marginTop: 4,
  },
  monthCell: {
    background: "none", border: "none", borderRadius: 8,
    padding: "8px 4px", fontSize: 13, cursor: "pointer",
    textAlign: "center", color: "#2a2f0f", fontFamily: "inherit",
  },
  yearGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6, marginTop: 4,
  },
  yearCell: {
    background: "none", border: "none", borderRadius: 8,
    padding: "8px 4px", fontSize: 13, cursor: "pointer",
    textAlign: "center", color: "#2a2f0f", fontFamily: "inherit",
  },
  cellSel: {
    background: "#4a5228", color: "#f5f3e8",
    fontWeight: 700, borderRadius: 8,
  },
  summaryRow: {
    display: "flex", alignItems: "center", gap: 8,
    marginTop: 14, paddingTop: 12,
    borderTop: "1px solid #c8c6a0",
    justifyContent: "center",
  },
  summaryChip: {
    background: "rgba(74,82,40,0.10)",
    borderRadius: 10, padding: "5px 10px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 1,
  },
  chipLabel: {
    fontSize: 10, color: "#7a7d50", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: 0.5,
  },
  chipVal: {
    fontSize: 12, color: "#2a2f0f", fontWeight: 600,
  },
  arrow: {
    fontSize: 14, color: "#7a7d50",
  },
};