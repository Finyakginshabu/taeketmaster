import React, { useState, useEffect } from 'react';
import EventCard from './EventCard.jsx';
import NavBar from '../../components/NavBar.jsx';
import { getEventFeed } from '../../api/home.api.js';
import { mockEvents } from "../../api/mockData.js";

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [hideSoldOut, setHideSoldOut] = useState(false);
    const [hideComingSoon, setHideComingSoon] = useState(false);
    
    const [date, setDate] = useState(null);
    const [search, setSearch] = useState("");
    const [province, setProvince] = useState("");

    // useEffect(() => {
    //     getEventFeed()
    //         .then(result => {
    //             setEvents(result.data || []);
    //         })
    //         .catch(error => console.error("Error fetching events:", error));
    // }, []);

    useEffect(() => {
            setEvents(mockEvents);
    }, []);

    // กรองข้อมูลตามปุ่ม Hide Sold out / Hide Coming Soon
    const filteredEvents = events.filter((event) => {
        // Backend status: 0 = Coming Soon, 1 = Buy Now, 2 = Sold Out
        if (hideSoldOut && event.status === 2) return false;
        if (hideComingSoon && event.status === 0) return false;
        return true;
    });

    return (<div className="wrapper">
                <div className="filter">
                    <button className={hideSoldOut ? "hide-sold-out" : "filter-btn"}
                        onClick={() => setHideSoldOut((v) => !v)}>
                        Hide Sold out</button>
                    <button className={hideComingSoon ? "hide-coming-soon" : "filter-btn"}
                        onClick={() => setHideComingSoon((v) => !v)}>
                        Hide Coming Soon</button>
                </div>
                <div className="event-card">
                    {filteredEvents.map(event => (
                        <EventCard
                            key={event.event_id}
                            id={event.event_id}          
                            title={event.title}
                            date={event.showdate}        
                            statusCode={event.status}    /* ส่งเลข 0,1,2 ไปให้การ์ด */
                            image={event.img_path}       
                        />
                    ))}
                </div>
            </div>

    );
}