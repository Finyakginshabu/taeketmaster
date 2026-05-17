import React, { useState, useRef, useEffect } from 'react';  
import { provinces } from "../utils.js";
import CalendarRangePicker from "./CalendarRangePicker.jsx";  
import { MapPin, Calendar, Search } from '../components/Icons.jsx';

export default function SearchBar({ onProvince, onDate, onSearch }){
  const [province, setProvince] = useState("");
  const [date, setDate] = useState({ start: null, end: null });  
  const [showProvince, setShowProvince] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [query, setQuery] = useState("");

  const provinceRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if(provinceRef.current && !provinceRef.current.contains(e.target))
        setShowProvince(false);
      if(calendarRef.current && !calendarRef.current.contains(e.target))
        setShowCalendar(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredProvinces = provinces.filter((p) => p.includes(query));

  
  const formatDisplay = (d) => {
    if(!d) return null;
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

  
  const formatAPI = (d) => {
    if(!d) return null;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const dateLabel = date.start && date.end
    ? `${formatDisplay(date.start)} – ${formatDisplay(date.end)}`
    : date.start
    ? `${formatDisplay(date.start)} – ?`
    : "Dates";

  const handleProvince = (p) => {
    setProvince(p);
    setShowProvince(false);
    setQuery("");
    onProvince?.(p);
  };

  const handleDate = (range) => {
    setDate(range);
    
    onDate?.({
      start: formatAPI(range.start),   
      end: formatAPI(range.end),        
    });
  };

  const handleClearDate = (e) => {
    e.stopPropagation();
    const cleared = { start: null, end: null };
    setDate(cleared);
    onDate?.({ start: null, end: null });
  };

  return (
    <div className="search-bar-wrap">
      <div className="section" ref={provinceRef} style={{ position: "relative" }}>
        <button className="section-btn"
          onClick={() => { setShowProvince((v) => !v); setShowCalendar(false); }}>
          <MapPin style={{ width: 22 }} />
          {province || "Province"}
        </button>

        {showProvince && (
          <div className="province-dropdown">
            <input autoFocus placeholder="" value={query}
              onChange={(e) => setQuery(e.target.value)} className="province-search" />
            <div className="province-list">
              <button onClick={() => handleProvince("")}>All Provinces</button>
              {filteredProvinces.map((p) => (
                <button key={p} onClick={() => handleProvince(p)}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="divider" />

      <div className="section" ref={calendarRef} style={{ position: "relative" }}>
        <button className="section-btn"
          onClick={() => { setShowCalendar((v) => !v); setShowProvince(false); }}>
          <Calendar style={{ width: 24 }} />
          <span>{dateLabel}</span>
          {(date.start || date.end) && (
            <button className="clear-btn" onClick={handleClearDate}>×</button>
          )}
        </button>

        {showCalendar && (
          <CalendarRangePicker           
            value={date}
            onChange={handleDate}
            onClose={() => setShowCalendar(false)}
          />
        )}
      </div>

      <div className="divider" />

      <Search style={{ width: 24 }} />
      <input placeholder="Search Artist, Event..."
        onChange={(e) => onSearch?.(e.target.value)}
        className="search-input" />
    </div>
  );
}