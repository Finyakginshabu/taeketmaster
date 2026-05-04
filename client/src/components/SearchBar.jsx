import React, {useState, useRef, useEffect, useCon} from 'react';
import {provinces, days, months} from "../utils.js";
import CalendarPicker from "./CalendarPicker.jsx";

export default function SearchBar({mapUrl, calendarUrl, searchUrl, onSearch}){
    const [province, setProvince] = useState("");
    const [date, setDate] = useState(null);
    const [search, setSearch] = useState("");

    const [showProvince, setShowProvince] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [query, setQuery] = useState("");

    const provinceRef = useRef(null);
    const calendarRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
        if (provinceRef.current && !provinceRef.current.contains(e.target))
            setShowProvince(false);
        if (calendarRef.current && !calendarRef.current.contains(e.target))
            setShowCalendar(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filteredProvinces = provinces.filter((p) => p.includes(query));

    const formatDate = (d) => {
        if (!d) return null;
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        return `${dd}/${mm}/${d.getFullYear()}`;
    };

    return (
        <div className="search-bar-wrap">
            <div className="section" ref={provinceRef} style={{position: 'relative'}}>
                <button className="section-btn" 
                    onClick={() => { setShowProvince((v) => !v); setShowCalendar(false); }}>
                    <img style={{width:22}} src={mapUrl}/>
                    {province || "Province"}
                </button>

                {showProvince && (
                    <div className="province-dropdown">
                        <input autoFocus placeholder=""
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="province-search"
                        />
                        <div className="province-list">
                        <button onClick={() => { setProvince(""); setShowProvince(false); setQuery(""); }}>
                            All Provinces
                        </button>
                        {filteredProvinces.map((p) => (
                            <button key={p} onClick={() => { setProvince(p); setShowProvince(false); setQuery(""); }}>
                            {p}
                            </button>
                        ))}
                        </div>
                    </div>
                    )}
            </div>

            <div className="divider" />

            <div className="section" ref={calendarRef}>
                <button className="section-btn" onClick={() => {
                    setShowCalendar((v) => !v);
                    setShowProvince(false);}}>
                    <img style={{width:24}} src={calendarUrl} />
                    <span>
                    {formatDate(date) || "Dates"}
                    </span>
                    {date ? (
                    <button className="clear-btn"
                        onClick={(e) => { e.stopPropagation(); setDate(null); }}>
                        ×
                    </button>
                    ) : ""}
                </button>

                {showCalendar && (
                    <CalendarPicker
                    value={date}
                    onChange={setDate}
                    onClose={() => setShowCalendar(false)}
                    />
                )}
            </div>

            <div className="divider" />
            
            <img style={{width:24}} src={searchUrl} />
            <input placeholder="Search Artist, Event..."
                onChange={(e) => onSearch(e.target.value)}
                className="search-input" />
        </div>
    );
}