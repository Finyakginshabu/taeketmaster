import React, { useState, useEffect } from 'react';
import './MyTickets.css';
import { http } from '../../api/http.js'; // ปรับ path ตามโปรเจกต์
import { useAuth } from '../Login/AuthContext.jsx';

export default function MyTickets(){
    const auth = useAuth();
    const user = auth?.user;
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function fetchTickets(){
            try {
                setLoading(true);
                const res = await http("/api/my-tickets", {
                    headers: { "Authorization": `Bearer ${user?.token}` }
                });
                setTickets(res.data);
            } catch (err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if(user?.token) fetchTickets();
    }, [user]);

    const filtered = tickets.filter(t => {
        if(filter === "all") return true;
        return t.status === filter;
    });

    if(loading) return (
        <div className="my-tickets-page">
            <div className="my-tickets-container">
                <div className="my-tickets-empty">
                    <p>Loading tickets...</p>
                </div>
            </div>
        </div>
    );

    if(error) return (
        <div className="my-tickets-page">
            <div className="my-tickets-container">
                <div className="my-tickets-empty">
                    <span>⚠️</span>
                    <p>{error}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="my-tickets-page">
            <div className="my-tickets-container">
                <div className="my-tickets-header">
                    <h1 className="my-tickets-title">My Tickets</h1>
                    <p className="my-tickets-subtitle">{tickets.length} tickets total</p>
                </div>

                <div className="my-tickets-tabs">
                    {[
                        { key: "all",       label: "All" },
                        { key: "confirmed", label: "Upcoming" },
                        { key: "used",      label: "Used" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            className={`tab-btn ${filter === key ? "active" : ""}`}
                            onClick={() => setFilter(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="my-tickets-list">
                    {filtered.length === 0 ? (
                        <div className="my-tickets-empty">
                            <span>🎟️</span>
                            <p>No tickets found</p>
                        </div>
                    ) : (
                        filtered.map(ticket => (
                            <TicketCard key={ticket.ticket_id} ticket={ticket} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function TicketCard({ ticket }){
    const isUsed = ticket.status === "used";

    return (
        <div className={`ticket-card ${isUsed ? "used" : ""}`}>
            <div className="ticket-info">
                <div className="ticket-event-title">{ticket.event_title}</div>
                <div className="ticket-artist">Artist: {ticket.artist}</div>
                <div className="ticket-detail">@ {ticket.venue}</div>
                <div className="ticket-detail">Date: {ticket.showdate}</div>
            </div>

            <div className="ticket-dashed" />

            <div className="ticket-side">
                <div className="ticket-row">
                    <span className="ticket-label">Zone</span>
                    <span className="ticket-value">{ticket.seat_zone}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Seat</span>
                    <span className="ticket-value">{ticket.seat_number}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Total</span>
                    <span className="ticket-value ticket-total-value">
                        {Number(ticket.total_price).toLocaleString()} THB
                    </span>
                </div>
            </div>
        </div>
    );
}