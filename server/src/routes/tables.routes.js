import express from "express";
import * as controller from "../controllers/tables.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Artists (Full CRUD)
router.get("/artists", verifyAdmin, controller.getAllArtists);
router.get("/artists/:artistId", verifyAdmin, controller.getArtistById);
router.post("/artists", verifyAdmin, controller.createArtist);
router.put("/artists/:artistId", verifyAdmin, controller.updateArtist);
router.delete("/artists/:artistId", verifyAdmin, controller.deleteArtist);

// Genres (Full CRUD)
router.get("/genres", verifyAdmin, controller.getAllGenres);
router.get("/genres/:genreId", verifyAdmin, controller.getGenreById);
router.post("/genres", verifyAdmin, controller.createGenre);
router.put("/genres/:genreId", verifyAdmin, controller.updateGenre);
router.delete("/genres/:genreId", verifyAdmin, controller.deleteGenre);

// Agents (Full CRUD)
router.get("/agents", verifyAdmin, controller.getAllAgents);
router.get("/agents/:agentId", verifyAdmin, controller.getAgentById);
router.post("/agents", verifyAdmin, controller.createAgent);
router.put("/agents/:agentId", verifyAdmin, controller.updateAgent);
router.delete("/agents/:agentId", verifyAdmin, controller.deleteAgent);

// Venues (Full CRUD)
router.get("/venues", verifyAdmin, controller.getAllVenues);
router.get("/venues/:venueId", verifyAdmin, controller.getVenueById);
router.post("/venues", verifyAdmin, controller.createVenue);
router.put("/venues/:venueId", verifyAdmin, controller.updateVenue);
router.delete("/venues/:venueId", verifyAdmin, controller.deleteVenue);

// Zones (Full CRUD)
router.get("/venues/:venueId/zones", verifyAdmin, controller.getZonesByVenueId);
router.get("/zones/:zoneId", verifyAdmin, controller.getZoneById);
router.post("/zones", verifyAdmin, controller.createZone);
router.put("/zones/:zoneId", verifyAdmin, controller.updateZone);
router.delete("/zones/:zoneId", verifyAdmin, controller.deleteZone);

// Seats (Full CRUD)
router.get("/zones/:zoneId/seats", verifyAdmin, controller.getSeatsByZoneId);
router.get("/seats/:seatId", verifyAdmin, controller.getSeatById);
router.post("/seats", verifyAdmin, controller.createSeat);
router.put("/seats/:seatId", verifyAdmin, controller.updateSeat);
router.delete("/seats/:seatId", verifyAdmin, controller.deleteSeat);

// Users (View Only)
router.get("/users", verifyAdmin, controller.viewUsers);
router.get("/users/:userId", verifyAdmin, controller.viewUserById);
router.get("/users/:userId/bookings", verifyAdmin, controller.viewUserBookings);

// Bookings (View Only)
router.get("/bookings", verifyAdmin, controller.viewBookings);
router.get("/bookings/:bookingId", verifyAdmin, controller.viewBookingById);
router.get("/bookings/:bookingId/tickets", verifyAdmin, controller.viewTicketsByBooking);

// Payments (View Only)
router.get("/payments", verifyAdmin, controller.viewPayments);
router.get("/payments/:paymentId", verifyAdmin, controller.viewPaymentById);

// Tickets (View Only)
router.get("/tickets", verifyAdmin, controller.viewTickets);
router.get("/tickets/:ticketId", verifyAdmin, controller.viewTicketById);

export default router;
