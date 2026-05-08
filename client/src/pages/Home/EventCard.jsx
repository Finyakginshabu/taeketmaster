import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({title, date, startDate, endDate, isAvailable, image}){

    function getStatus() {
        if (!isAvailable) return { status: "Sold Out", label: "sold-out-btn" };

        const today = new Date();
        if (today < new Date(startDate)) return { status: "Coming Soon", label: "coming-soon-btn" };
        if (today > new Date(endDate))   return { status: "End Sale",    label: "end-sale-btn" };
        return { status: "Buy Now", label: "buy-now-btn" };
    }

    const status = getStatus();

    return(<div className="card">
                <img src={image}/>
                <h2>{title}</h2>
                <p>{date}</p>
                <Link to="/event" className={status.label}>{status.status}</Link>
            </div>);
}