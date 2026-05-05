import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { mockEvents } from "../../api/mockData.js"; 

export default function ConcertPlan({whiteLogoUrl, homeUrl, cartUrl, userUrl, mapUrl, calendarUrl, searchUrl, downUrl}){
    
    const {id} = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [event, setEvent] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
        if(ref.current && !ref.current.contains(e.target)){
            setIsOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
            const found = mockEvents.find(e => e.id === Number(id));
            if(found){
                setEvent(found);
                setSelected(found.showDate[0]);
            }
    }, [id]);

    function handleSelect(option){
        setSelected(option);
        setIsOpen(false);
    };
    
    if(!event) return null;

    return( <>
            <NavBar whiteLogoUrl={whiteLogoUrl} homeUrl={homeUrl} cartUrl={cartUrl} 
                                userUrl={userUrl} mapUrl={mapUrl} calendarUrl={calendarUrl} 
                                searchUrl={searchUrl} />

            <div className="concert-title">{event.title}</div>

            <div className="plan-container">
                <div style={{backgroundColor: "black", width: 732, height:732}}>
                    plan concert here
                </div>
                <div className="price-container">
                    <div className="select-showtime">
                        <span className="showtime-topic">Showtimes</span>
                        <div ref={ref} className="showtime-dropdown">
                            <button className={`showtime-selected ${isOpen ? "open" : ""}`}
                                onClick={() => setIsOpen(!isOpen)}>
                                <span>{selected}</span>
                                <img src={downUrl} className={`showtime-arrow ${isOpen ? "rotated" : ""}`}/>
                            </button>
                    
                            {isOpen && (
                            <div className="showtime-list">
                                {event.showDate.filter((s) => s !== selected).map((option) => (
                                    <button key={option} className="showtime-option" onClick={() => handleSelect(option)}>
                                    {option}
                                    </button>))}
                            </div>
                            )}
                        </div>
                    </div>
                    <button className="seat-available">
                        Seat Available
                    </button>
                    <div className="price-card">
                        <img src={event.imageUrl} style={{width: 220}}/><br/>
                        <span>PRICING</span>
                        <div className="zone-price">
                            5,900 THB
                        </div>
                        <div className="zone-price">
                            3,500 THB
                        </div>
                    </div>
                </div>
            </div>
            </>
    );
}