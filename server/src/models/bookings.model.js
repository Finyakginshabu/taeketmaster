import pool from "../config/db.js";

// booked in 15 minutes
export const getActiveBookingService = async (userId) => {
  try{
    const query = `
      select booking_id, user_id, booked_at, total_price 
      from bookings 
      where user_id = $1 
      and booked_at > now() - interval '15 minutes'
      order by booked_at desc 
      limit 1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }catch(error){
    throw error;
  }
};

export const createBookingService = async (userId) => {
  try{
    const query = `
      insert into bookings (user_id, booked_at, total_price)
      values ($1, now(), 0)
      returning booking_id, user_id, booked_at, total_price
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }catch(error){
    throw error;
  }
};

export const createTicketService = async (bookingId, showtimeId, seatId, price) => {
  try{
    const query = `
      insert into tickets (booking_id, showtime_id, seat_id, price, is_used)
      values ($1, $2, $3, $4, false)
      returning ticket_id, booking_id, showtime_id, seat_id, price, is_used
    `;
    const result = await pool.query(query, [bookingId, showtimeId, seatId, price]);
    return result.rows[0];
  }catch(error){
    throw error;
  }
};

export const updateBookingTotalPriceService = async (bookingId, totalPrice) => {
  try{
    const query = `
      update bookings 
      set total_price = $1 
      where booking_id = $2
      returning booking_id, user_id, booked_at, total_price
    `;
    const result = await pool.query(query, [totalPrice, bookingId]);
    return result.rows[0];
  }catch(error){
    throw error;
  }
};

export const getSeatPriceService = async (seatId, showtimeId) => {
  try{
    const query = `
      select s.seat_id, s.zone_id, ez.event_id, ez.price
      from seats s
      join zones z on s.zone_id = z.zone_id
      join event_zones ez on z.zone_id = ez.zone_id
      join showtimes st on st.event_id = ez.event_id
      where s.seat_id = $1 and st.showtime_id = $2
    `;
    const result = await pool.query(query, [seatId, showtimeId]);
    return result.rows[0] || null;
  }catch(error){
    throw error;
  }
};

export const isSeatBookedService = async (seatId, showtimeId) => {
  try{
    const query = `select ticket_id from tickets where showtime_id = $1 and seat_id = $2`;
    const result = await pool.query(query, [showtimeId, seatId]);
    return result.rows.length > 0;
  }catch(error){
    throw error;
  }
};

export const getBookingTotalPriceService = async (bookingId) => {
  try{
    const query = `select sum(price) as total from tickets where booking_id = $1`;
    const result = await pool.query(query, [bookingId]);
    return parseFloat(result.rows[0].total) || 0;
  }catch(error){
    throw error;
  }
};

export const createPaymentService = async (bookingId, paymentMethod) => {
  try{
    const query = `
      insert into payments (booking_id, payment_method, paid_at)
      values ($1, $2, now())
      returning payment_id, booking_id, payment_method, paid_at
    `;
    const result = await pool.query(query, [bookingId, paymentMethod]);
    return result.rows[0];
  }catch(error){
    throw error;
  }
};

export const getBookingByIdService = async (bookingId) => {
  try{
    const query = `
      select booking_id, user_id, booked_at, total_price 
      from bookings 
      where booking_id = $1
    `;
    const result = await pool.query(query, [bookingId]);
    return result.rows[0] || null;
  }catch(error){
    throw error;
  }
};

export const removeTicketService = async (seatId, showtimeId) => {
  try{
    const query = `
      delete from tickets 
      where seat_id = $1 and showtime_id = $2
      returning ticket_id, booking_id, seat_id, showtime_id, price
    `;
    const result = await pool.query(query, [seatId, showtimeId]);
    return result.rows[0] || null;
  }catch(error){
    throw error;
  }
};

export const removeBookingService = async (bookingId) => {
  try{
    const checkQuery = `select ticket_id from tickets where booking_id = $1`;
    const checkResult = await pool.query(checkQuery, [bookingId]);
    if (checkResult.rows.length === 0) {
      const deleteQuery = `delete from bookings where booking_id = $1 returning booking_id`;
      await pool.query(deleteQuery, [bookingId]);
    }
  }catch(error){
    throw error;
  }
};

export const getMyTicketsService = async (userId) => {
  try{
    const query = `
      select 
        t.ticket_id,
        t.price,
        t.is_used,
        e.title as event_title,
        st.show_at as showdate,
        v.name as venue,
        z.zone_name as seat_zone,
        s.number as seat_number,
        b.total_price,
        a.artist_name as artist,
        case when t.is_used = true then 'used' else 'confirmed' end as status
      from tickets t
      join bookings b on t.booking_id = b.booking_id
      join showtimes st on t.showtime_id = st.showtime_id
      join events e on st.event_id = e.event_id
      join venues v on st.venue_id = v.venue_id
      join seats s on t.seat_id = s.seat_id
      join zones z on s.zone_id = z.zone_id
      left join event_artists ea on e.event_id = ea.event_id
      left join artists a on ea.artist_id = a.artist_id
      where b.user_id = $1
      order by st.show_at desc
    `;
    const result = await pool.query(query, [userId]);
    return result.rows || [];
  }catch(error){
    throw error;
  }
};

