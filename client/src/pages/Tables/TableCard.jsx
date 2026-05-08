import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TableCard({ id }){

    const [events, setEvents] = useState([]);
    const [manageable, setManageable] = useState(false);
    const navigate = useNavigate();

    // ยังไม่แก้จาก event เป็น table
    const filteredTables = events.filter((event) => {
        if(manageable) return false; // เดี๋ยวมาแก้ คิดไม่ออก

        return true;
    });

    return(<div className="card">
                <button onClick={() => navigate(`/tables/${id}`)} className="">
                    User
                </button>
                <div className="event-card">
                    {filteredEvents.map(event => (
                        <EventCard
                            key={event.id}
                            id={event.id}
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