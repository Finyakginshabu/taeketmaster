import pool from "../config/db.js";

export const getEventDetailService = async (id) => {
    const result = await pool.query(`
        select e.title, e.img_path,  
        to_char(min(s.show_at), 'Dy fmdd Mon yyyy') || ' - ' || to_char(max(s.show_at), 'Dy fmdd Mon yyyy') as showdate,
        v.name as venue_name, to_char(e.sales_started_at, 'Dy fmdd Mon yyyy, hh24:mi') as public_sale,
        case
            when now() < e.sales_started_at then 0
            when (
                select count(t.ticket_id) 
                from tickets t 
                join showtimes st on t.showtime_id = st.showtime_id 
                where st.event_id = e.event_id
            ) >= (
                select count(se.seat_id) * count(distinct st.showtime_id)
                from showtimes st
                join zones z on st.venue_id = z.venue_id
                join seats se on z.zone_id = se.zone_id
                where st.event_id = e.event_id
            ) then 2
            else 1 end as status, e.description
        from events e
        join showtimes s on e.event_id = s.event_id
        join venues v on s.venue_id = v.venue_id 
        where e.event_id = $1
        group by e.event_id, e.title, e.img_path, v.name, e.sales_started_at, e.description;`, [id]);
    return result.rows[0];
};