import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import NavBar from '../../components/NavBar';
import { mockEvents } from "../../api/mockData.js";

export default function HomePage({whiteLogoUrl, homeUrl, posterUrl, cartUrl, userUrl, mapUrl, calendarUrl, searchUrl}){

    const [events, setEvents] = useState([]);
    const [hideSoldOut, setHideSoldOut] = useState(false);
    const [hideComingSoon, setHideComingSoon] = useState(false);
    const [date, setDate] = useState(null);
    const [search, setSearch] = useState("");
    const [province, setProvince] = useState("");

    const filteredEvents = events.filter((event) => {
        const today = new Date();
        if (today > new Date(event.endDate) && event.isAvailable) return false;
        if (hideSoldOut && !event.isAvailable) return false;
        if (hideComingSoon && today < new Date(event.startDate)) return false;

        return true;
    });

    useEffect(() => {
        // fetch("/api/events.api.js")
        //     .then(res => res.json())
        //     .then(data => setEvents(data));
            setEvents(mockEvents);
    }, []);

    return( <div className="wrapper">
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
                            key={event.id}
                            title={event.title}
                            date={event.showDate}
                            startDate={event.startDate}
                            endDate={event.endDate}
                            isAvailable={event.isAvailable} 
                            image={event.imageUrl}
                        />
                    ))}
                </div>
            </div>
        );
            
}