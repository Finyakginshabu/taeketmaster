import pool from "../config/db.js";

// Tickets Sold Report
export const getTicketsSold = async (startDate, endDate, groupBy) => {
    let dateFormatSelect, dateGroupBy, orderClause, whereClause;
    if(groupBy === 'monthly'){
        dateFormatSelect = "to_char(t.created_at, 'Mon yyyy') as date";
        dateGroupBy = "to_char(t.created_at, 'Mon yyyy'), date_trunc('month', t.created_at)";
        orderClause = "date_trunc('month', t.created_at) asc";
    }else{
        dateFormatSelect = "to_char(t.created_at, 'fmdd Mon yyyy') as date";
        dateGroupBy = "date(t.created_at)";
        orderClause = "date(t.created_at) asc";
    }
    
    if(startDate && endDate){
        whereClause = "where date(t.created_at) >= $1 and date(t.created_at) <= $2";
    }else{
        whereClause = "";
    }
    
    const result = await pool.query(
        `select ${dateFormatSelect}, count(t.ticket_id) as tickets_sold, round(coalesce(sum(t.price), 0), 2) as revenue
         from tickets t
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
        `select a.artist_id, a.artist_name, count(t.ticket_id) as tickets_sold
         from artists a
         left join events e on a.artist_id = e.artist_id
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
    const whereClause = startDate && endDate ? 'where date(t.created_at) >= $1 and date(t.created_at) <= $2' : '';
    const result = await pool.query(
        `select concat(u.first_name, ' ', u.last_name) as name,  count(t.ticket_id) as total_tickets, round(coalesce(sum(t.price), 0), 2) as total_spent
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
        dateFormatSelect = "to_char(t.created_at, 'Mon yyyy') as date";
        dateGroupBy = "to_char(t.created_at, 'Mon yyyy'), date_trunc('month', t.created_at)";
        orderClause = "date_trunc('month', t.created_at) asc";
    }else if(groupBy === 'quarterly'){
        dateFormatSelect = "concat(to_char(date_trunc('quarter', t.created_at), 'YYYY'), '-Q', to_char(date_trunc('quarter', t.created_at), 'Q')) as date";
        dateGroupBy = "date_trunc('quarter', t.created_at)";
        orderClause = "date_trunc('quarter', t.created_at) asc";
    }else{
        dateFormatSelect = "to_char(t.created_at, 'fmdd Mon yyyy') as date";
        dateGroupBy = "date(t.created_at)";
        orderClause = "date(t.created_at) asc";
    }
    
    if(startDate && endDate){
        whereClause = "where date(t.created_at) >= $1 and date(t.created_at) <= $2";
    }else{
        whereClause = "";
    }
    
    const result = await pool.query(
        `select ${dateFormatSelect}, round(coalesce(sum(t.price), 0), 2) as revenue
         from tickets t
         ${whereClause}
         group by ${dateGroupBy}
         order by ${orderClause}`,
        startDate && endDate ? [startDate, endDate] : []
    );
    return result.rows;
};

// Popular Events Report
export const getPopularEvents = async () => {
    const result = await pool.query(
        `select e.event_id, e.title as event_name,
                coalesce((select count(*) from seats s join zones z on s.zone_id = z.zone_id 
                         where z.venue_id = sh.venue_id) - count(t.ticket_id), 0) as remaining_tickets
         from events e
         join showtimes sh on e.event_id = sh.event_id
         left join tickets t on sh.showtime_id = t.showtime_id
         group by e.event_id, e.title, sh.venue_id
         having coalesce((select count(*) from seats s join zones z on s.zone_id = z.zone_id 
                         where z.venue_id = sh.venue_id) - count(t.ticket_id), 0) > 0
         order by remaining_tickets asc`
    );
    return result.rows;
};
