import pool from "../config/db.js";

// Tickets Sold Report
export const getTicketsSold = async (startDate, endDate, groupBy) => {
    let dateFormatSelect, dateGroupBy, orderClause, whereClause;
    if(groupBy === 'monthly'){
        dateFormatSelect = "to_char(b.booked_at, 'Mon yyyy') as date";
        dateGroupBy = "date_trunc('month', b.booked_at)";
        orderClause = "date_trunc('month', b.booked_at) asc";
    }else{
        dateFormatSelect = "to_char(b.booked_at, 'fmdd Mon yyyy') as date";
        dateGroupBy = "date(b.booked_at)";
        orderClause = "date(b.booked_at) asc";
    }
    
    if(startDate && endDate){
        whereClause = "where date(b.booked_at) >= $1 and date(b.booked_at) <= $2";
    }else{
        whereClause = "";
    }
    
    const result = await pool.query(
        `select ${dateFormatSelect}, count(t.ticket_id) as tickets_sold, round(coalesce(sum(t.price), 0), 2) as total_revenue
         from tickets t
         join bookings b on t.booking_id = b.booking_id
         ${whereClause}
         group by ${dateGroupBy}
         order by ${orderClause}`,
        startDate && endDate ? [startDate, endDate] : []
    );
    return result.rows;
};

// Selling Artists Report
export const getSellingArtists = async () => {
    const result = await pool.query(
        `select a.artist_id, a.artist_name, count(t.ticket_id) as tickets_sold, round(coalesce(sum(t.price), 0), 2) as total_revenue
         from artists a
         left join event_artists ea on a.artist_id = ea.artist_id
         left join events e on ea.event_id = e.event_id
         left join showtimes sh on e.event_id = sh.event_id
         left join tickets t on sh.showtime_id = t.showtime_id
         group by a.artist_id, a.artist_name
         order by tickets_sold desc`
    );
    return result.rows;
};

// Ticket Spenders Report
export const getTicketSpenders = async (startDate, endDate, sortBy) => {
    const orderClause = sortBy === 'total_spent' ? 'total_spent desc' : 'total_tickets desc';
    const whereClause = startDate && endDate ? 'where date(b.booked_at) >= $1 and date(b.booked_at) <= $2' : '';
    const result = await pool.query(
        `select concat(u.first_name, ' ', u.last_name) as customer_name, count(t.ticket_id) as total_tickets, round(coalesce(sum(t.price), 0), 2) as total_spent
         from users u
         left join bookings b on u.user_id = b.user_id
         left join tickets t on b.booking_id = t.booking_id
         ${whereClause}
         group by u.user_id, u.first_name, u.last_name
         order by ${orderClause}`,
        startDate && endDate ? [startDate, endDate] : []
    );
    return result.rows;
};

// Revenue Report
export const getRevenue = async (startDate, endDate, groupBy) => {
    let dateFormatSelect, dateGroupBy, orderClause, whereClause;
    if(groupBy === 'monthly'){
        dateFormatSelect = "to_char(b.booked_at, 'Mon yyyy') as date";
        dateGroupBy = "date_trunc('month', b.booked_at)";
        orderClause = "date_trunc('month', b.booked_at) asc";
    }else if(groupBy === 'quarterly'){
        dateFormatSelect = "to_char(date_trunc('quarter', b.booked_at), 'YYYY') || '-Q' || to_char(date_trunc('quarter', b.booked_at), 'Q') as date";
        dateGroupBy = "date_trunc('quarter', b.booked_at)";
        orderClause = "date_trunc('quarter', b.booked_at) asc";
    }else{
        dateFormatSelect = "to_char(b.booked_at, 'fmdd Mon yyyy') as date";
        dateGroupBy = "date(b.booked_at)";
        orderClause = "date(b.booked_at) asc";
    }
    
    if(startDate && endDate){
        whereClause = "where date(b.booked_at) >= $1 and date(b.booked_at) <= $2";
    }else{
        whereClause = "";
    }
    
    const result = await pool.query(
        `select ${dateFormatSelect}, round(coalesce(sum(t.price), 0), 2) as revenue
         from tickets t
         join bookings b on t.booking_id = b.booking_id
         ${whereClause}
         group by ${dateGroupBy}
         order by ${orderClause}`,
        startDate && endDate ? [startDate, endDate] : []
    );
    // Return rows with 'date' field for consistency
    return result.rows;
};

// Popular Events Report
export const getPopularEvents = async (startDate, endDate) => {
    let whereClause = '';
    const params = [];
    
    if(startDate && endDate){
        whereClause = 'where date(b.booked_at) >= $1 and date(b.booked_at) <= $2';
        params.push(startDate, endDate);
    }
    
    const result = await pool.query(
        `select e.event_id, e.title as event_name, count(t.ticket_id) as tickets_sold, round(coalesce(sum(t.price), 0), 2) as total_revenue
         from events e
         left join showtimes sh on e.event_id = sh.event_id
         left join tickets t on sh.showtime_id = t.showtime_id
         left join bookings b on t.booking_id = b.booking_id
         ${whereClause}
         group by e.event_id, e.title
         having count(t.ticket_id) > 0
         order by tickets_sold desc`,
        params
    );
    return result.rows;
};
