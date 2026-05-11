import * as model from "../models/bookings.model.js";
import pool from "../config/db.js";

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        success: status < 400,
        message,
        data,
    });
};

export const reserveTicket = async (req, res) => {
  try{
    console.log("=== reserveTicket DEBUG ===");
    console.log("Content-Type:", req.headers['content-type']);
    console.log("req.body:", req.body);
    console.log("req.body type:", typeof req.body);
    
    const userId = req.user.id; // From JWT token middleware
    const { seat_id, showtime_id } = req.body || {};

    if(!showtime_id || !seat_id){
      return handleResponse(res, 400, `showtime_id and seat_id are required. Body: ${JSON.stringify(req.body)}`);
    }

    const seatData = await model.getSeatPriceService(seat_id, showtime_id);
    
    if(!seatData){
      return handleResponse(res, 404, "Seat or showtime not found");
    }

    const ticketPrice = parseFloat(seatData.price);

    const isBooked = await model.isSeatBookedService(seat_id, showtime_id);
    
    if(isBooked){
      return handleResponse(res, 409, "Seat is already booked");
    }

    let booking = await model.getActiveBookingService(userId);

    if(!booking){
      booking = await model.createBookingService(userId);
    }

    const ticket = await model.createTicketService(
      booking.booking_id,
      showtime_id,
      seat_id,
      ticketPrice
    );

    const newTotal = await model.getBookingTotalPriceService(booking.booking_id);
    await model.updateBookingTotalPriceService(booking.booking_id, newTotal);

    return handleResponse(res, 201, "Ticket reserved successfully", { 
      booking_id: booking.booking_id, 
      ticket: ticket, 
      booking_total: newTotal 
    });

  }catch(error){
    console.error("Error reserving ticket:", error);
    console.error("Error stack:", error.stack);
    return handleResponse(res, 500, "Error reserving ticket: " + error.message);
  }
};

export const createPayment = async (req, res) => {
  try{
    const userId = req.user.id;
    const { bookingId, paymentMethod } = req.body;

    if(!bookingId || !paymentMethod){
      return handleResponse(res, 400, "bookingId and paymentMethod are required");
    }

    const validMethods = ['promptpay', 'mobile_banking', 'credit_card'];
    if(!validMethods.includes(paymentMethod)){
      return handleResponse(res, 400, "Invalid payment method. Must be: promptpay, mobile_banking, or credit_card");
    }

    const booking = await model.getBookingByIdService(bookingId);
    if(!booking){
      return handleResponse(res, 404, "Booking not found");
    }

    if(booking.user_id !== userId){
      return handleResponse(res, 403, "Unauthorized: this booking does not belong to you");
    }

    const payment = await model.createPaymentService(bookingId, paymentMethod);

    return handleResponse(res, 201, "Payment created successfully", payment);

  }catch(error){
    console.error("Error creating payment:", error);
    return handleResponse(res, 500, "Error creating payment: " + error.message);
  }
};

export const getMyTickets = async (req, res) => {
  try{
    const userId = req.user.id;

    const tickets = await model.getMyTicketsService(userId);

    return handleResponse(res, 200, "Tickets retrieved successfully", tickets);

  }catch(error){
    console.error("Error retrieving tickets:", error);
    return handleResponse(res, 500, "Error retrieving tickets: " + error.message);
  }
};

export const removeBooking = async (req, res) => {
  try{
    const userId = req.user.id;
    const { seat_id, showtime_id } = req.body || {};

    if(!seat_id || !showtime_id){
      return handleResponse(res, 400, "seat_id and showtime_id are required");
    }

    // Find the booking this ticket belongs to
    const ticketQuery = `select booking_id from tickets where seat_id = $1 and showtime_id = $2`;
    const ticketResult = await pool.query(ticketQuery, [seat_id, showtime_id]);
    
    if(ticketResult.rows.length === 0){
      return handleResponse(res, 404, "Ticket not found");
    }

    const bookingId = ticketResult.rows[0].booking_id;

    // Verify the booking belongs to the user
    const booking = await model.getBookingByIdService(bookingId);
    if(!booking){
      return handleResponse(res, 404, "Booking not found");
    }

    if(booking.user_id !== userId){
      return handleResponse(res, 403, "Unauthorized: this booking does not belong to you");
    }

    // Remove the ticket
    const removedTicket = await model.removeTicketService(seat_id, showtime_id);

    // Remove booking if it has no more tickets
    await model.removeBookingService(bookingId);

    return handleResponse(res, 200, "Ticket removed successfully", { 
      ticket: removedTicket,
      booking_id: bookingId 
    });

  }catch(error){
    console.error("Error removing booking:", error);
    console.error("Error stack:", error.stack);
    return handleResponse(res, 500, "Error removing booking: " + error.message);
  }
};

