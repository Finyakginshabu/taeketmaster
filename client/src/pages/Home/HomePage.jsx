import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from './EventCard.jsx';
import { getImageUrl, http } from '../../api/http';

export default function HomePage(){
    const [events, setEvents] = useState([]);
    const [hideSoldOut, setHideSoldOut] = useState(true);
    const [hideComingSoon, setHideComingSoon] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const data = await http(`/api/home?${searchParams.toString()}`);
                setEvents(data?.data || []);
            } catch (error){
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [searchParams]);

    const filteredEvents = events.filter((event) => {
        if(hideSoldOut && event.status === 2) return false;
        if(hideComingSoon && event.status === 0) return false;
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
                            image={getImageUrl(event.img_path)}
                        />
                    ))
                ) : (
                    <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#888' }}>
                        Not found lol
                    </div>
                )}
            </div>
        </div>
    );
}