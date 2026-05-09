import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar.jsx';
import { getEventDetail } from '../../api/eventDetails.api.js';
import { Calendar, MapPin, Price, Sale } from '../../components/Icons.jsx';
import { formatDateTime } from '../../utils.js';
import { mockEvents } from "../../api/mockData.js";

const USE_MOCK = true;

function getButton(status) {
    if (status === 2) return { label: "sold-out-btn",    text: "Sold Out"    };
    if (status === 0) return { label: "coming-soon-btn", text: "Coming Soon" };
    return                   { label: "buy-now-btn",     text: "Buy Now"     };
}

function getSale(status) {
    if (status === 2) return { label: "sold-out-sale",    text: "SOLD OUT"    };
    if (status === 0) return { label: "coming-soon-sale", text: "COMING SOON" };
    return                   { label: "buy-now-sale",     text: "ON SALE NOW" };
}

// คำนวณ status จาก mockData (ไม่มี field status ตรงๆ)
function calcStatus(event) {
    if (!event.isAvailable) return 2;
    const today = new Date();
    if (today < new Date(event.startDate)) return 0;
    return 1;
}

export default function EventPage() {
    const { id: event_id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (USE_MOCK) {
            const found = mockEvents.find(e => e.event_id === Number(event_id));
            if (found) {
                // ปรับ field ให้ตรงกับที่ page ใช้
                setEvent({
                    ...found,
                    status: calcStatus(found),
                    venue_name: found.province,
                    public_sale: found.startDate,
                    ticket_prices: "Zone A 6,000 / Zone B 2,500 / Zone C 1,000 / Zone D 500",
                });
            }
            setLoading(false);
            return;
        }
        getEventDetail(event_id)
            .then(data => setEvent(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [event_id]);

    if (loading) return <><NavBar /><div style={{ padding: '2rem' }}>Loading...</div></>;
    if (error)   return <><NavBar /><div style={{ padding: '2rem', color: 'red' }}>{error}</div></>;
    if (!event)  return <><NavBar /><div style={{ padding: '2rem' }}>Event not found.</div></>;

    const btn  = getButton(event.status);
    const sale = getSale(event.status);

    return (<div className="event-wrapper">
                <div className="event-container">
                    <img className="poster" src={event.img_path} alt={event.title} />
                    <div className="event-info">
                        <h2 style={{ fontSize: "42px", margin: "5px" }}>{event.title}</h2>

                        <div className="event-detail">
                            <div className="detail-cell">
                                <p className="detail-label">Show Date</p>
                                <div className="details">
                                    <Calendar style={{ width: 24, stroke: 'black' }} />
                                    <span>{Array.isArray(event.showdate) 
                                            ? event.showdate.map(date => formatDateTime(date, true)).join(' - ') 
                                            : formatDateTime(event.showdate, true)}</span>
                                </div>
                            </div>

                            <div className="detail-cell">
                                <p className="detail-label">Public Sale</p>
                                <div className="details">
                                    <Sale style={{ width: 24 }} />
                                    <span>{event.public_sale}</span>
                                </div>
                            </div>

                            <div className="detail-cell">
                                <p className="detail-label">Venue</p>
                                <div className="details">
                                    <MapPin style={{ width: 24, stroke: 'black' }} />
                                    <span>{event.venue_name}</span>
                                </div>
                            </div>

                            <div className="detail-cell">
                                <p className="detail-label">Ticket Price</p>
                                <div className="details">
                                    <Price style={{ width: 24 }} />
                                    <span>{event.ticket_prices}</span>
                                </div>
                            </div>

                            <div></div>

                            <div className="ticket-status">
                                <p className="detail-label">Ticket Status</p>
                                <button className={sale.label}>{sale.text}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="describe-btn">
                    <div className="btn-wrap">
                        <button
                            className={btn.label}
                            onClick={() => navigate(`/event-booking/${event_id}`)}
                            disabled={event.status !== 1}
                        >
                            {btn.text}
                        </button>
                    </div>
                    <div className="description">
                        <h3>Description</h3>
                        <p>{event.description}</p>
                    </div>
                </div>
            </div>
    );
}