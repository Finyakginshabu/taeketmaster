// Fin wrote to line 70, others are generated TT

import * as model from "../models/tables.model.js";
import { handleResponse } from "./auth.controller.js";

// Artists
export const getAllArtists = async (req, res, next) => {
    try{
        const artists = await model.getAllArtists();
        handleResponse(res, 200, "Artists fetched successfully", artists);
    }catch(err){
        next(err);
    }
};

export const getArtistById = async (req, res, next) => {
    try{
        const { artistId } = req.params;
        const artist = await model.getArtistById(artistId);
        if(!artist){
            return handleResponse(res, 404, "Artist not found");
        }
        handleResponse(res, 200, "Artist fetched successfully", artist);
    }catch(err){
        next(err);
    }
};

export const createArtist = async (req, res, next) => {
    try{
        const { artist_name } = req.body;
        if(!artist_name){
            return handleResponse(res, 400, "Artist name is required");
        }
        const artist = await model.createArtist(artist_name);
        handleResponse(res, 201, "Artist created successfully", artist);
    }catch(err){
        next(err);
    }
};

export const updateArtist = async (req, res, next) => {
    try{
        const { artistId } = req.params;
        const { artist_name } = req.body;
        if(!artist_name){
            return handleResponse(res, 400, "Artist name is required");
        }
        const artist = await model.updateArtist(artistId, artist_name);
        if(!artist){
            return handleResponse(res, 404, "Artist not found");
        }
        handleResponse(res, 200, "Artist updated successfully", artist);
    }catch(err){
        next(err);
    }
};

export const deleteArtist = async (req, res, next) => {
    try{
        const { artistId } = req.params;
        const artist = await model.deleteArtist(artistId);
        if(!artist){
            return handleResponse(res, 404, "Artist not found");
        }
        handleResponse(res, 200, "Artist deleted successfully", artist);
    }catch(err){
        next(err);
    }
};

// Genres
export const getAllGenres = async (req, res, next) => {
    try{
        const genres = await model.getAllGenres();
        handleResponse(res, 200, "Genres fetched successfully", genres);
    }catch(err){
        next(err);
    }
};

export const getGenreById = async (req, res, next) => {
    try{
        const { genreId } = req.params;
        const genre = await model.getGenreById(genreId);
        if(!genre){
            return handleResponse(res, 404, "Genre not found");
        }
        handleResponse(res, 200, "Genre fetched successfully", genre);
    }catch(err){
        next(err);
    }
};

export const createGenre = async (req, res, next) => {
    try{
        const { genre_name } = req.body;
        if(!genre_name){
            return handleResponse(res, 400, "Genre name is required");
        }
        const genre = await model.createGenre(genre_name);
        handleResponse(res, 201, "Genre created successfully", genre);
    }catch(err){
        next(err);
    }
};

export const updateGenre = async (req, res, next) => {
    try{
        const { genreId } = req.params;
        const { genre_name } = req.body;
        if(!genre_name){
            return handleResponse(res, 400, "Genre name is required");
        }
        const genre = await model.updateGenre(genreId, genre_name);
        if(!genre){
            return handleResponse(res, 404, "Genre not found");
        }
        handleResponse(res, 200, "Genre updated successfully", genre);
    }catch(err){
        next(err);
    }
};

export const deleteGenre = async (req, res, next) => {
    try{
        const { genreId } = req.params;
        const genre = await model.deleteGenre(genreId);
        if(!genre){
            return handleResponse(res, 404, "Genre not found");
        }
        handleResponse(res, 200, "Genre deleted successfully", genre);
    }catch(err){
        next(err);
    }
};

// Agents
export const getAllAgents = async (req, res, next) => {
    try{
        const agents = await model.getAllAgents();
        handleResponse(res, 200, "Agents fetched successfully", agents);
    }catch(err){
        next(err);
    }
};

export const getAgentById = async (req, res, next) => {
    try{
        const { agentId } = req.params;
        const agent = await model.getAgentById(agentId);
        if(!agent){
            return handleResponse(res, 404, "Agent not found");
        }
        handleResponse(res, 200, "Agent fetched successfully", agent);
    }catch(err){
        next(err);
    }
};

export const createAgent = async (req, res, next) => {
    try{
        const { agent_name, email, phone } = req.body;
        if(!agent_name){
            return handleResponse(res, 400, "Agent name is required");
        }
        const agent = await model.createAgent({ agent_name, email, phone });
        handleResponse(res, 201, "Agent created successfully", agent);
    }catch(err){
        next(err);
    }
};

export const updateAgent = async (req, res, next) => {
    try{
        const { agentId } = req.params;
        const { agent_name, email, phone } = req.body;
        if(!agent_name){
            return handleResponse(res, 400, "Agent name is required");
        }
        const agent = await model.updateAgent(agentId, { agent_name, email, phone });
        if(!agent){
            return handleResponse(res, 404, "Agent not found");
        }
        handleResponse(res, 200, "Agent updated successfully", agent);
    }catch(err){
        next(err);
    }
};

export const deleteAgent = async (req, res, next) => {
    try{
        const { agentId } = req.params;
        const agent = await model.deleteAgent(agentId);
        if(!agent){
            return handleResponse(res, 404, "Agent not found");
        }
        handleResponse(res, 200, "Agent deleted successfully", agent);
    }catch(err){
        next(err);
    }
};

// Venues
export const getAllVenues = async (req, res, next) => {
    try{
        const venues = await model.getAllVenues();
        handleResponse(res, 200, "Venues fetched successfully", venues);
    }catch(err){
        next(err);
    }
};

export const getVenueById = async (req, res, next) => {
    try{
        const { venueId } = req.params;
        const venue = await model.getVenueById(venueId);
        if(!venue){
            return handleResponse(res, 404, "Venue not found");
        }
        handleResponse(res, 200, "Venue fetched successfully", venue);
    }catch(err){
        next(err);
    }
};

export const createVenue = async (req, res, next) => {
    try{
        const { name, email, phone, seat_capacity, address, province, latitude, longitude } = req.body;
        if(!name || !seat_capacity || !latitude || !longitude){
            return handleResponse(res, 400, "Name, seat_capacity, latitude, and longitude are required");
        }
        const venue = await model.createVenue({
            name, email, phone, seat_capacity, address, province, latitude, longitude
        });
        handleResponse(res, 201, "Venue created successfully", venue);
    }catch(err){
        next(err);
    }
};

export const updateVenue = async (req, res, next) => {
    try{
        const { venueId } = req.params;
        const { name, email, phone, seat_capacity, address, province, latitude, longitude } = req.body;
        if(!name || !seat_capacity || !latitude || !longitude){
            return handleResponse(res, 400, "Name, seat_capacity, latitude, and longitude are required");
        }
        const venue = await model.updateVenue(venueId, {
            name, email, phone, seat_capacity, address, province, latitude, longitude
        });
        if(!venue){
            return handleResponse(res, 404, "Venue not found");
        }
        handleResponse(res, 200, "Venue updated successfully", venue);
    }catch(err){
        next(err);
    }
};

export const deleteVenue = async (req, res, next) => {
    try{
        const { venueId } = req.params;
        const venue = await model.deleteVenue(venueId);
        if(!venue){
            return handleResponse(res, 404, "Venue not found");
        }
        handleResponse(res, 200, "Venue deleted successfully", venue);
    }catch(err){
        next(err);
    }
};

// Zones
export const getZonesByVenueId = async (req, res, next) => {
    try{
        const { venueId } = req.params;
        const zones = await model.getZonesByVenueId(venueId);
        handleResponse(res, 200, "Zones fetched successfully", zones);
    }catch(err){
        next(err);
    }
};

export const getZoneById = async (req, res, next) => {
    try{
        const { zoneId } = req.params;
        const zone = await model.getZoneById(zoneId);
        if(!zone){
            return handleResponse(res, 404, "Zone not found");
        }
        handleResponse(res, 200, "Zone fetched successfully", zone);
    }catch(err){
        next(err);
    }
};

export const createZone = async (req, res, next) => {
    try{
        const { venue_id, zone_name, img_path, color, x_pos, y_pos } = req.body;
        if(!venue_id || !zone_name){
            return handleResponse(res, 400, "Venue ID and zone name are required");
        }
        const zone = await model.createZone({ venue_id, zone_name, img_path, color, x_pos, y_pos });
        handleResponse(res, 201, "Zone created successfully", zone);
    }catch(err){
        next(err);
    }
};

export const updateZone = async (req, res, next) => {
    try{
        const { zoneId } = req.params;
        const { zone_name, img_path, color, x_pos, y_pos } = req.body;
        if(!zone_name){
            return handleResponse(res, 400, "Zone name is required");
        }
        const zone = await model.updateZone(zoneId, { zone_name, img_path, color, x_pos, y_pos });
        if(!zone){
            return handleResponse(res, 404, "Zone not found");
        }
        handleResponse(res, 200, "Zone updated successfully", zone);
    }catch(err){
        next(err);
    }
};

export const deleteZone = async (req, res, next) => {
    try{
        const { zoneId } = req.params;
        const zone = await model.deleteZone(zoneId);
        if(!zone){
            return handleResponse(res, 404, "Zone not found");
        }
        handleResponse(res, 200, "Zone deleted successfully", zone);
    }catch(err){
        next(err);
    }
};

// Seats
export const getSeatsByZoneId = async (req, res, next) => {
    try{
        const { zoneId } = req.params;
        const seats = await model.getSeatsByZoneId(zoneId);
        handleResponse(res, 200, "Seats fetched successfully", seats);
    }catch(err){
        next(err);
    }
};

export const getSeatById = async (req, res, next) => {
    try{
        const { seatId } = req.params;
        const seat = await model.getSeatById(seatId);
        if(!seat){
            return handleResponse(res, 404, "Seat not found");
        }
        handleResponse(res, 200, "Seat fetched successfully", seat);
    }catch(err){
        next(err);
    }
};

export const createSeat = async (req, res, next) => {
    try{
        const { zone_id, number, diameter, x_pos, y_pos } = req.body;
        if(!zone_id || !number){
            return handleResponse(res, 400, "Zone ID and seat number are required");
        }
        const seat = await model.createSeat({ zone_id, number, diameter, x_pos, y_pos });
        handleResponse(res, 201, "Seat created successfully", seat);
    }catch(err){
        next(err);
    }
};

export const updateSeat = async (req, res, next) => {
    try{
        const { seatId } = req.params;
        const { number, diameter, x_pos, y_pos } = req.body;
        if(!number){
            return handleResponse(res, 400, "Seat number is required");
        }
        const seat = await model.updateSeat(seatId, { number, diameter, x_pos, y_pos });
        if(!seat){
            return handleResponse(res, 404, "Seat not found");
        }
        handleResponse(res, 200, "Seat updated successfully", seat);
    }catch(err){
        next(err);
    }
};

export const deleteSeat = async (req, res, next) => {
    try{
        const { seatId } = req.params;
        const seat = await model.deleteSeat(seatId);
        if(!seat){
            return handleResponse(res, 404, "Seat not found");
        }
        handleResponse(res, 200, "Seat deleted successfully", seat);
    }catch(err){
        next(err);
    }
};

// Users
export const viewUsers = async (req, res, next) => {
    try{
        const users = await model.viewUsers();
        handleResponse(res, 200, "Users fetched successfully (view only)", users);
    }catch(err){
        next(err);
    }
};

export const viewUserById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await model.viewUserById(userId);
        if(!user){
            return handleResponse(res, 404, "User not found");
        }
        handleResponse(res, 200, "User fetched successfully (view only)", user);
    }catch(err){
        next(err);
    }
};

// Bookings
export const viewBookings = async (req, res, next) => {
    try{
        const bookings = await model.viewBookings();
        handleResponse(res, 200, "Bookings fetched successfully (view only)", bookings);
    }catch(err){
        next(err);
    }
};

export const viewBookingById = async (req, res, next) => {
    try{
        const { bookingId } = req.params;
        const booking = await model.viewBookingById(bookingId);
        if(!booking){
            return handleResponse(res, 404, "Booking not found");
        }
        handleResponse(res, 200, "Booking fetched successfully (view only)", booking);
    }catch(err){
        next(err);
    }
};

export const viewTicketsByBooking = async (req, res, next) => {
    try{
        const { bookingId } = req.params;
        const tickets = await model.viewTicketsByBooking(bookingId);
        handleResponse(res, 200, "Tickets for booking fetched successfully (view only)", tickets);
    }catch(err){
        next(err);
    }
};

// Payments
export const viewPayments = async (req, res, next) => {
    try{
        const payments = await model.viewPayments();
        handleResponse(res, 200, "Payments fetched successfully (view only)", payments);
    }catch(err){
        next(err);
    }
};

export const viewPaymentById = async (req, res, next) => {
    try{
        const { paymentId } = req.params;
        const payment = await model.viewPaymentById(paymentId);
        if(!payment){
            return handleResponse(res, 404, "Payment not found");
        }
        handleResponse(res, 200, "Payment fetched successfully (view only)", payment);
    }catch(err){
        next(err);
    }
};

// Tickets
export const viewTickets = async (req, res, next) => {
    try{
        const tickets = await model.viewTickets();
        handleResponse(res, 200, "Tickets fetched successfully (view only)", tickets);
    }catch(err){
        next(err);
    }
};

export const viewTicketById = async (req, res, next) => {
    try{
        const { ticketId } = req.params;
        const ticket = await model.viewTicketById(ticketId);
        if(!ticket){
            return handleResponse(res, 404, "Ticket not found");
        }
        handleResponse(res, 200, "Ticket fetched successfully (view only)", ticket);
    }catch(err){
        next(err);
    }
};
