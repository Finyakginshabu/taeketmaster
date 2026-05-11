import pool from "../config/db.js";

// Artists
export const getAllArtists = async () => {
    const result = await pool.query("select * from artists order by artist_id asc");
    return result.rows;
};

export const getArtistById = async (artistId) => {
    const result = await pool.query("select * from artists where artist_id = $1", [artistId]);
    return result.rows[0];
};

export const createArtist = async (artistName) => {
    const result = await pool.query(
        "insert into artists (artist_name) values ($1) returning *",
        [artistName]
    );
    return result.rows[0];
};

export const updateArtist = async (artistId, artistName) => {
    const result = await pool.query(
        "update artists set artist_name = $1 where artist_id = $2 returning *",
        [artistName, artistId]
    );
    return result.rows[0];
};

export const deleteArtist = async (artistId) => {
    const result = await pool.query(
        "delete from artists where artist_id = $1 returning *",
        [artistId]
    );
    return result.rows[0];
};

// Genres
export const getAllGenres = async () => {
    const result = await pool.query("select * from genres order by genre_id asc");
    return result.rows;
};

export const getGenreById = async (genreId) => {
    const result = await pool.query("select * from genres where genre_id = $1", [genreId]);
    return result.rows[0];
};

export const createGenre = async (genreName) => {
    const result = await pool.query(
        "insert into genres (genre_name) values ($1) returning *",
        [genreName]
    );
    return result.rows[0];
};

export const updateGenre = async (genreId, genreName) => {
    const result = await pool.query(
        "update genres set genre_name = $1 where genre_id = $2 returning *",
        [genreName, genreId]
    );
    return result.rows[0];
};

export const deleteGenre = async (genreId) => {
    const result = await pool.query(
        "delete from genres where genre_id = $1 returning *",
        [genreId]
    );
    return result.rows[0];
};

// Agents
export const getAllAgents = async () => {
    const result = await pool.query("select * from agents order by agent_id asc");
    return result.rows;
};

export const getAgentById = async (agentId) => {
    const result = await pool.query("select * from agents where agent_id = $1", [agentId]);
    return result.rows[0];
};

export const createAgent = async (agentData) => {
    const { agent_name, email, phone } = agentData;
    const result = await pool.query(
        "insert into agents (agent_name, email, phone) values ($1, $2, $3) returning *",
        [agent_name, email, phone]
    );
    return result.rows[0];
};

export const updateAgent = async (agentId, agentData) => {
    const { agent_name, email, phone } = agentData;
    const result = await pool.query(
        "update agents set agent_name = $1, email = $2, phone = $3 where agent_id = $4 returning *",
        [agent_name, email, phone, agentId]
    );
    return result.rows[0];
};

export const deleteAgent = async (agentId) => {
    const result = await pool.query(
        "delete from agents where agent_id = $1 returning *",
        [agentId]
    );
    return result.rows[0];
};

// Venues
export const getAllVenues = async () => {
    const result = await pool.query("select * from venues order by venue_id asc");
    return result.rows;
};

export const getVenueById = async (venueId) => {
    const result = await pool.query("select * from venues where venue_id = $1", [venueId]);
    return result.rows[0];
};

export const createVenue = async (venueData) => {
    const { name, email, phone, seat_capacity, address, province, latitude, longitude } = venueData;
    const result = await pool.query(
        "insert into venues (name, email, phone, seat_capacity, address, province, latitude, longitude) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
        [name, email, phone, seat_capacity, address, province, latitude, longitude]
    );
    return result.rows[0];
};

export const updateVenue = async (venueId, venueData) => {
    const { name, email, phone, seat_capacity, address, province, latitude, longitude } = venueData;
    const result = await pool.query(
        "update venues set name = $1, email = $2, phone = $3, seat_capacity = $4, address = $5, province = $6, latitude = $7, longitude = $8 where venue_id = $9 returning *",
        [name, email, phone, seat_capacity, address, province, latitude, longitude, venueId]
    );
    return result.rows[0];
};

export const deleteVenue = async (venueId) => {
    const result = await pool.query(
        "delete from venues where venue_id = $1 returning *",
        [venueId]
    );
    return result.rows[0];
};

// Zones
export const getZonesByVenueId = async (venueId) => {
    const result = await pool.query(
        "select * from zones where venue_id = $1 order by zone_id asc",
        [venueId]
    );
    return result.rows;
};

export const getZoneById = async (zoneId) => {
    const result = await pool.query("select * from zones where zone_id = $1", [zoneId]);
    return result.rows[0];
};

export const createZone = async (zoneData) => {
    const { venue_id, zone_name, img_path, color, x_pos, y_pos } = zoneData;
    const result = await pool.query(
        "insert into zones (venue_id, zone_name, img_path, color, x_pos, y_pos) values ($1, $2, $3, $4, $5, $6) returning *",
        [venue_id, zone_name, img_path, color, x_pos, y_pos]
    );
    return result.rows[0];
};

export const updateZone = async (zoneId, zoneData) => {
    const { zone_name, img_path, color, x_pos, y_pos } = zoneData;
    const result = await pool.query(
        "update zones set zone_name = $1, img_path = $2, color = $3, x_pos = $4, y_pos = $5 where zone_id = $6 returning *",
        [zone_name, img_path, color, x_pos, y_pos, zoneId]
    );
    return result.rows[0];
};

export const deleteZone = async (zoneId) => {
    const result = await pool.query(
        "delete from zones where zone_id = $1 returning *",
        [zoneId]
    );
    return result.rows[0];
};

// Seats
export const getSeatsByZoneId = async (zoneId) => {
    const result = await pool.query(
        "select * from seats where zone_id = $1 order by seat_id asc",
        [zoneId]
    );
    return result.rows;
};

export const getSeatById = async (seatId) => {
    const result = await pool.query("select * from seats where seat_id = $1", [seatId]);
    return result.rows[0];
};

export const createSeat = async (seatData) => {
    const { zone_id, number, diameter, x_pos, y_pos } = seatData;
    const result = await pool.query(
        "insert into seats (zone_id, number, diameter, x_pos, y_pos) values ($1, $2, $3, $4, $5) returning *",
        [zone_id, number, diameter, x_pos, y_pos]
    );
    return result.rows[0];
};

export const updateSeat = async (seatId, seatData) => {
    const { number, diameter, x_pos, y_pos } = seatData;
    const result = await pool.query(
        "update seats set number = $1, diameter = $2, x_pos = $3, y_pos = $4 where seat_id = $5 returning *",
        [number, diameter, x_pos, y_pos, seatId]
    );
    return result.rows[0];
};

export const deleteSeat = async (seatId) => {
    const result = await pool.query(
        "delete from seats where seat_id = $1 returning *",
        [seatId]
    );
    return result.rows[0];
};

// Users
export const viewUsers = async () => {
    const result = await pool.query(
        "select user_id, first_name, last_name, email, phone, username, role, registered_at from users order by user_id asc"
    );
    return result.rows;
};

export const viewUserById = async (userId) => {
    const result = await pool.query(
        "select user_id, first_name, last_name, email, phone, username, role, registered_at from users where user_id = $1",
        [userId]
    );
    return result.rows[0];
};

// Bookings
export const viewBookings = async () => {
    const result = await pool.query(
        `select b.booking_id, b.user_id, u.first_name, u.last_name, u.email, b.booked_at, b.total_price 
         from bookings b 
         join users u on b.user_id = u.user_id 
         order by b.booking_id asc`
    );
    return result.rows;
};

export const viewBookingById = async (bookingId) => {
    const result = await pool.query(
        `select b.booking_id, b.user_id, u.first_name, u.last_name, u.email, b.booked_at, b.total_price 
         from bookings b 
         join users u on b.user_id = u.user_id 
         where b.booking_id = $1`,
        [bookingId]
    );
    return result.rows[0];
};

export const viewTicketsByBooking = async (bookingId) => {
    const result = await pool.query(
        `select t.ticket_id, t.showtime_id, t.seat_id, s.number as seat_number, t.price, t.is_used,
                sh.show_at, e.title as event_title, v.name as venue_name
         from tickets t
         join seats s on t.seat_id = s.seat_id
         join showtimes sh on t.showtime_id = sh.showtime_id
         join events e on sh.event_id = e.event_id
         join venues v on sh.venue_id = v.venue_id
         where t.booking_id = $1`,
        [bookingId]
    );
    return result.rows;
};

// Payments
export const viewPayments = async () => {
    const result = await pool.query(
        `select p.payment_id, p.booking_id, p.payment_method, p.paid_at, b.total_price, u.first_name, u.last_name, u.email
         from payments p
         join bookings b on p.booking_id = b.booking_id
         join users u on b.user_id = u.user_id
         order by p.payment_id asc`
    );
    return result.rows;
};

export const viewPaymentById = async (paymentId) => {
    const result = await pool.query(
        `select p.payment_id, p.booking_id, p.payment_method, p.paid_at, b.total_price, u.first_name, u.last_name, u.email
         from payments p
         join bookings b on p.booking_id = b.booking_id
         join users u on b.user_id = u.user_id
         where p.payment_id = $1`,
        [paymentId]
    );
    return result.rows[0];
};

// Tickets
export const viewTickets = async () => {
    const result = await pool.query(
        `select t.ticket_id, t.booking_id, t.showtime_id, t.seat_id, s.number as seat_number, t.price, t.is_used,
                sh.show_at, e.title as event_title, v.name as venue_name, z.zone_name
         from tickets t
         join seats s on t.seat_id = s.seat_id
         join showtimes sh on t.showtime_id = sh.showtime_id
         join events e on sh.event_id = e.event_id
         join venues v on sh.venue_id = v.venue_id
         join zones z on s.zone_id = z.zone_id
         order by t.ticket_id asc`
    );
    return result.rows;
};

export const viewTicketById = async (ticketId) => {
    const result = await pool.query(
        `select t.ticket_id, t.booking_id, t.showtime_id, t.seat_id, s.number as seat_number, t.price, t.is_used,
                sh.show_at, e.title as event_title, v.name as venue_name, z.zone_name
         from tickets t
         join seats s on t.seat_id = s.seat_id
         join showtimes sh on t.showtime_id = sh.showtime_id
         join events e on sh.event_id = e.event_id
         join venues v on sh.venue_id = v.venue_id
         join zones z on s.zone_id = z.zone_id
         where t.ticket_id = $1`,
        [ticketId]
    );
    return result.rows[0];
};
