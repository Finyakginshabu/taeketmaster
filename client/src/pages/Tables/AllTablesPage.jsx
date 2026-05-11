import React, { useState, useEffect } from 'react'
import TableCard from "./TableCard.jsx";
import { Search } from '../../components/Icons.jsx'
import { mockTables } from '../../utils.js'

export default function AllTablePage(){

    const [tables, setTables] = useState([]); 
    const [showManageable, setShowManageable] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
            // fetch("/api/tables.api.js")
            //     .then(res => res.json())
            //     .then(data => setTables(data));
                setTables(mockTables);
    }, []);

    const filteredTables = tables.filter((table) => {
        const matchesSearch = table.title.toLowerCase().includes(search.toLowerCase());
        if(showManageable){
            return table.isManageable === true && matchesSearch;
        }
        
        return matchesSearch; 
    });

    return( <>
            <div className="filter-table">
                <div className="table-controls">
                    <label className="show-manageable-label">
                        <input type="checkbox" checked={showManageable}
                        onChange={(e) => setShowManageable(e.target.checked)}/>
                        show only manageable tables
                    </label>
                    
                    <div className="search-pill">
                        <Search style={{width:20}} />
                        <input type="text" placeholder="Search tables..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input" />
                    </div>
                </div>
            </div>

            <div className="tables-card">
                {filteredTables.map(table => (
                    <TableCard
                        key={table.id}
                        id={table.id}
                        title={table.title}
                    />
                ))}
            </div>
            </>
    );
}