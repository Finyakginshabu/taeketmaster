import React, { useState, useEffect } from 'react';
import './MyTickets.css';
import { http } from '../../api/http.js';
import { useAuth } from '../Login/AuthContext.jsx';
import { formatDateTime } from '../../utils.js';

export default function MyTickets(){
    const auth = useAuth();
    const user = auth?.user;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function fetchTickets(){
            try {
                setLoading(true);
                const res = await http("/api/my-tickets", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                setTickets(res.data);
            } catch (err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if(token) fetchTickets();
    }, [token]);

    const filtered = tickets.filter(t => {
        if(filter === "all") return true;
        return t.status === filter;
    });

    return (
        <div className="my-tickets-page">
            <div className="my-tickets-container">
                <div className="my-tickets-header">
                    <h1 className="my-tickets-title">My Tickets</h1>
                </div>
                <div className="my-tickets-list">
                    {filtered.length === 0 ? (
                        <div className="my-tickets-empty">
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
                <div className="ticket-artist">{ticket.artist}</div>
                <div className="ticket-detail">@ {ticket.venue}</div>
                <div className="ticket-detail">{formatDateTime(ticket.showdate, false)}</div>
            </div>

            <div className="ticket-dashed" />

            <div className="ticket-side">
                <div className="ticket-row">
                    <span className="ticket-value">{ticket.seat_zone}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-value">{ticket.seat_number}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-value ticket-total-value">
                        ฿ {Number(ticket.price).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}