import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function getStatus(startDate, endDate, isAvailable) {
        if (!isAvailable) return { status: "Sold Out", label: "sold-out-btn" };

        const today = new Date();
        if (today < new Date(startDate)) return { status: "Coming Soon", label: "coming-soon-btn" };
        return { status: "Buy Now", label: "buy-now-btn" };
    }

export default function EventCard({id, title, date, startDate, endDate, isAvailable, image}){

    const status = getStatus(startDate, endDate, isAvailable);
    const navigate = useNavigate();

    return(<div className="card">
                <img src={image}/>
                <h2>{title}</h2>
                <p>{date}</p>
                <button onClick={() => navigate(`/event/${id}`)} className={status.label}>
                    {status.status}
                </button>
            </div>);
}