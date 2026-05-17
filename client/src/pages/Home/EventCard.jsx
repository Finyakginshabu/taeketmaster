import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MONTHS, formatDateTime } from '../../utils.js';


export function getStatus(statusCode){
    if(statusCode === 2) return { status: "Sold Out", label: "sold-out-btn" };
    if(statusCode === 0) return { status: "Coming Soon", label: "coming-soon-btn" };
    return { status: "Buy Now", label: "buy-now-btn" };
}

export default function EventCard({ id, title, date, statusCode, image }){
    const statusInfo = getStatus(statusCode);
    const navigate = useNavigate();

    return (
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p>{Array.isArray(date) 
                ? date.map(date => formatDateTime(date, false)).join(' - ') 
                : formatDateTime(date, false)}</p>
            <button 
                onClick={() => navigate(`/event/${id}`)} 
                className={statusInfo.label}
                disabled={statusCode === 2}
            >
                {statusInfo.status}
            </button>
        </div>
    );
}