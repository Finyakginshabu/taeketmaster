import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from './EventCard.jsx';

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [hideSoldOut, setHideSoldOut] = useState(false);
    const [hideComingSoon, setHideComingSoon] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    // useEffect เดียว อ่านจาก URL ที่ NavBar อัปเดตให้
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:6700/api/home?${searchParams.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [searchParams]);

    const filteredEvents = events.filter((event) => {
        if (hideSoldOut && event.status === 2) return false;
        if (hideComingSoon && event.status === 0) return false;
        return true;
    });

    return (
        <div className="wrapper">
            <div className="filter">
                <button
                    className={hideSoldOut ? "hide-sold-out" : "filter-btn"}
                    onClick={() => setHideSoldOut((v) => !v)}
                >
                    Hide Sold out
                </button>
                <button
                    className={hideComingSoon ? "hide-coming-soon" : "filter-btn"}
                    onClick={() => setHideComingSoon((v) => !v)}
                >
                    Hide Coming Soon
                </button>
            </div>

            <div className="event-card">
                {isLoading ? (
                    <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#888' }}>
                        Loading events...
                    </div>
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <EventCard
                            key={event.event_id}
                            id={event.event_id}
                            title={event.title}
                            date={event.showdate}
                            statusCode={event.status}
                            image={event.img_path}
                        />
                    ))
                ) : (
                    <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#888' }}>
                        ไม่พบงานแสดงที่ตรงกับเงื่อนไขการค้นหา
                    </div>
                )}
            </div>
        </div>
    );
}