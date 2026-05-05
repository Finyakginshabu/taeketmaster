import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { getStatus } from '../Home/EventCard';
import { mockEvents } from "../../api/mockData.js";

function eventStatus(startDate, endDate, isAvailable){
        if(!isAvailable) return { status: "SOLD OUT", label: "sold-out-sale" };

        const today = new Date();
        if(today < new Date(startDate)) return { status: "COMING SOON", label: "coming-soon-sale" };
        return { status: "ON SALE NOW", label: "buy-now-sale" };
    }

export default function EventPage({whiteLogoUrl, homeUrl, cartUrl, userUrl, mapUrl, calendarUrl, searchUrl,
                                    priceUrl, saleUrl}){
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const found = mockEvents.find(e => e.id === Number(id));
        if(found) setEvent(found);
    }, [id]);

    if(!event) return null;

    const status = getStatus(event.startDate, event.endDate, event.isAvailable);
    const saleStatus = eventStatus(event.startDate, event.endDate, event.isAvailable);

    return( <>
            <NavBar whiteLogoUrl={whiteLogoUrl} homeUrl={homeUrl} cartUrl={cartUrl} 
                                userUrl={userUrl} mapUrl={mapUrl} calendarUrl={calendarUrl} 
                                searchUrl={searchUrl} />

            <div className="event-wrapper">
                <div className="event-container">
                    <img className="poster" src={event.imageUrl} />
                    <div className="event-info">
                        <h2 style={{fontSize: "42px", margin: "5px"}}>{event.title}</h2>

                        <div className="event-detail">
                            <div className="detail-cell">
                                <p className="detail-label">Show Date</p>
                                <div className="details">
                                    <img style={{width:24}} src={calendarUrl}/>
                                    <span>{event.showDate}</span>
                                </div>
                            </div>

                            <div className="detail-cell">
                                <p className="detail-label">Public Sale</p>
                                <div className="details">
                                    <img style={{width:24}} src={saleUrl}/>
                                    <span>{event.startDate}</span>
                                </div>
                            </div>

                            <div className="detail-cell">
                                <p className="detail-label">Venue</p>
                                <div className="details">
                                    <img style={{width:24}} src={mapUrl}/>
                                    <span>{event.province}</span>
                                </div>
                            </div>

                            <div className="detail-cell">
                                <p className="detail-label">Ticket Price</p>
                                <div className="details">
                                    <img style={{width:24}} src={priceUrl}/>
                                    <span>Zone A 6,000 / Zone B 2,500 / 1,000 / 500 THB</span>
                                </div>
                            </div>

                            <div></div>
                            
                            <div className="ticket-status">
                                <p className="detail-label">Ticket Status</p>
                                <button className={saleStatus.label}>{saleStatus.status}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="describe-btn">
                    <div className="btn-wrap">
                        <button className={status.label} onClick={() => navigate(`/event-booking/${id}`)}>{status.status}</button>
                    </div>
                    <div className="description">
                        <h3>Description</h3>
                        <p>{event.description}</p>
                    </div>
                </div>
                
            </div>
            </>);
}