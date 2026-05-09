import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TableCard({ id, title }){
    
    const navigate = useNavigate();
    
    return( <div>
                <button className="table-btn" onClick={() => navigate(`/tables/${id}`)}>
                    {title}
                </button>
            </div>   
    );
}