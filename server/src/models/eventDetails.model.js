import pool from "../config/db.js";

// Click to see an event
export const getEventDetailService = async (id) => {
    const result = await pool.query(`
        select e.title, e.img_path,  
        case 
            when min(s.show_at)::date = max(s.show_at)::date 
            then to_char(min(s.show_at), 'Dy fmdd Mon yyyy')
            else to_char(min(s.show_at), 'Dy fmdd Mon yyyy') || ' - ' || to_char(max(s.show_at), 'Dy fmdd Mon yyyy')
        end as showdate,
        v.name as venue_name, to_char(e.sales_started_at, 'Dy fmdd Mon yyyy, hh24:mi') as public_sale,
        (select string_agg(z.zone_name || ' ' || to_char(ez.price, 'FM9,999'), ' / ' order by ez.price desc)
         from event_zones ez join zones z on ez.zone_id = z.zone_id where ez.event_id = e.event_id) as ticket_prices,
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

// Click buy now and show available tickets
export const getEventDetailTwoService = async (id) => {
    const result = await pool.query(`
        select 
            e.title,
            e.img_path,
            json_agg(distinct to_char(s.show_at, 'Dy fmdd Mon yyyy hh24:mi')) as showtimes,
            json_object_agg(z.zone_name, ez.price) as ticket_prices
        from events e
        join showtimes s on e.event_id = s.event_id
        join venues v on s.venue_id = v.venue_id
        join event_zones ez on e.event_id = ez.event_id
        join zones z on ez.zone_id = z.zone_id
        where e.event_id = $1
        group by e.event_id, e.title, e.img_path;`, [id]);
    return result.rows[0];
};

// Seat Available
export const getAvailableSeatService = async (id) => {
    const result = await pool.query(`
        select z.zone_name, (count(distinct se.seat_id) * count(distinct st.showtime_id)) - count(distinct t.ticket_id) as available_seats
        from events e
        join showtimes st ON e.event_id = st.event_id
        join venues v ON st.venue_id = v.venue_id
        join zones z ON v.venue_id = z.venue_id
        join seats se ON z.zone_id = se.zone_id
        left join tickets t ON st.showtime_id = t.showtime_id AND se.seat_id = t.seat_id
        where e.event_id = $1
        group by z.zone_id, z.zone_name
        order by z.zone_name;`, [id]);
    return result.rows;
};

export const getZoneLayoutService = async (id) => {
    const result = await pool.query(`
        select z.zone_name, z.img_path, z.color, z.x_pos, z.y_pos,
        (count(se.seat_id) > 0) as is_zone
        from zones z
        join venues v on z.venue_id = v.venue_id
        join showtimes st on v.venue_id = st.venue_id
        left join seats se on z.zone_id = se.zone_id
        where st.event_id = $1
        group by z.zone_id, z.zone_name, z.img_path, z.color, z.x_pos, z.y_pos`, [id]);
    return result.rows;
};

export const getSeatLayoutService = async (zoneId, showtimeId) => {
    const result = await pool.query(`
        select s.seat_id, s.number, s.diameter, s.x_pos, s.y_pos,
        (t.ticket_id is not null) as is_booked
        from seats s
        left join tickets t on s.seat_id = t.seat_id and t.showtime_id = $2
        where s.zone_id = $1`, [zoneId, showtimeId]);
    return result.rows;
};