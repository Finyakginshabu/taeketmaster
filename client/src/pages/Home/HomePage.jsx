import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import SearchBar from './SearchBar.jsx';
import { mockEvents } from "../../api/mockData.js";

export default function HomePage({whiteLogoUrl, homeUrl, posterUrl, cartUrl, userUrl, mapUrl, calendarUrl, searchUrl}){

    const [events, setEvents] = useState([]);
    const [hideSoldOut, setHideSoldOut] = useState(false);
    const [hideComingSoon, setHideComingSoon] = useState(false);
    const [search, setSearch] = useState("");

    const filteredEvents = events.filter((event) => {
        const today = new Date();
        if (today > new Date(event.endDate) && event.isAvailable) return false;
        if (hideSoldOut && !event.isAvailable) return false;
        if (hideComingSoon && today < new Date(event.startDate)) return false;
        if (search && !event.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    useEffect(() => {
        // fetch("/api/events.api.js")
        //     .then(res => res.json())
        //     .then(data => setEvents(data));
            setEvents(mockEvents);
    }, []);

    return( <>
            <div className="nav-bar">
                <img className="logo-user" src={whiteLogoUrl}/>

                <div className="nav-bar-content">
                    <div className="back-to-home">
                        <img className="nav-bar-icon" src={homeUrl}/>
                        <h3>Home</h3>
                    </div>
                    
                    <div className="search-bar">
                        <SearchBar mapUrl={mapUrl} calendarUrl={calendarUrl} searchUrl={searchUrl} onSearch={setSearch}/>
                    </div>

                    <Link to="/cart">
                        <img className="nav-bar-icon" src={cartUrl}/>
                    </Link>

                    <div className="user-log-in">
                        <img className="nav-bar-icon" src={userUrl}/>
                        <Link to="/signin" className="sign-in">Sign in</Link>
                    </div>
                </div>
            </div>

            <div className="wrapper">
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
            </>);
            
}