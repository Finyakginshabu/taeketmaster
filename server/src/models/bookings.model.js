import pool from "../config/db.js";

// Get all bookings by user
export const getBookingsByUserId = async (userId) => {
    const result = await pool.query(`
        select 
            b.booking_id,
            b.booked_at,
            b.total_price,
            e.title,
            e.img_path,
            count(distinct t.ticket_id) as ticket_count
        from bookings b
        join tickets t on b.booking_id = t.booking_id
        join showtimes s on t.showtime_id = s.showtime_id
        join events e on s.event_id = e.event_id
        where b.user_id = $1
        group by b.booking_id, b.booked_at, b.total_price, e.title, e.img_path
        order by b.booked_at desc
    `, [userId]);
    
    return result.rows;
};

// Create booking (basic structure)
export const createBooking = async (userId, totalPrice) => {
    const result = await pool.query(
        `insert into bookings (user_id, booked_at, total_price) 
         values ($1, now(), $2) 
         returning booking_id, user_id, booked_at, total_price`,
        [userId, totalPrice]
    );
    return result.rows[0];
};
