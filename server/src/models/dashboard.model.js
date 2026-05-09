import pool from "../config/db.js";

export const getTodayTicketSold = async () => {
    const result = await pool.query(
        `select count(t.ticket_id) as total_tickets_sold, coalesce(sum(t.price), 0) as total_revenue
         from tickets t where date(t.created_at) = current_date`
    );
    return result.rows[0];
};

export const getAverageTicketSold7Days = async () => {
    const result = await pool.query(
        `select round(avg(daily_count)) as average_tickets_sold, round(avg(daily_revenue), 2) as average_revenue
         from (select date(t.created_at) as sale_date, count(t.ticket_id) as daily_count, coalesce(sum(t.price), 0) as daily_revenue from tickets t
               where date(t.created_at) >= current_date - interval '7 days' group by date(t.created_at)) as daily_stats`
    );
    return result.rows[0];
};

export const getTopSellingArtists = async () => {
    const result = await pool.query(
        `select a.artist_id, a.artist_name, count(t.ticket_id) as tickets_sold from artists a
         left join events e on a.artist_id = e.artist_id
         left join showtimes sh on e.event_id = sh.event_id
         left join tickets t on sh.showtime_id = t.showtime_id
         group by a.artist_id, a.artist_name order by tickets_sold desc limit 5`
    );
    return result.rows;
};

// Only in this quater
export const getTopTicketSpenders = async () => {
    const result = await pool.query(
        `select u.user_id, row_number() over (order by count(t.ticket_id) desc) as rank, 
                concat(u.first_name, ' ', u.last_name) as name, count(t.ticket_id) as total_tickets
         from users u
         left join bookings b on u.user_id = b.user_id
         left join tickets t on b.booking_id = t.booking_id
         where extract(quarter from t.created_at) = extract(quarter from current_date)
         and extract(year from t.created_at) = extract(year from current_date)
         group by u.user_id, u.first_name, u.last_name order by total_tickets desc limit 5`
    );
    return result.rows;
};

export const getMonthlyRevenue = async () => {
    const result = await pool.query(
        `select extract(month from t.created_at) as month, 
                to_char(t.created_at, 'Mon') as month_name,
                round(coalesce(sum(t.price), 0), 2) as revenue
         from tickets t
         where extract(year from t.created_at) = extract(year from current_date)
         group by extract(month from t.created_at), to_char(t.created_at, 'Mon') order by month asc`
    );
    return result.rows;
};

export const getQuaterRevenue = async () => {
    const result = await pool.query(
        `select extract(year from t.created_at) as year,
                extract(quarter from t.created_at) as quarter,
                round(coalesce(sum(t.price), 0), 2) as revenue
         from tickets t
         where t.created_at >= current_date - interval '18 months'
         group by extract(year from t.created_at), extract(quarter from t.created_at)
         order by year desc, quarter desc limit 6`
    );
    return result.rows;
};

export const getPopularEvent = async () => {
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
         order by remaining_tickets asc limit 10`
    );
    return result.rows;
};

export const getTopSpenders = async () => {
    const result = await pool.query(
        `select concat(u.first_name, ' ', u.last_name) as name, round(coalesce(sum(t.price), 0), 2) as money_spent
         from users u
         left join bookings b on u.user_id = b.user_id
         left join tickets t on b.booking_id = t.booking_id
         group by u.user_id, u.first_name, u.last_name
         order by money_spent desc limit 5`
    );
    return result.rows;
};
