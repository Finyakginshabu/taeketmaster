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
      select s.seat_id, s.zone_id, z.zone_id, e.event_id, ez.price
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

