import * as model from "../models/bookings.model.js";

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        success: status < 400,
        message,
        data,
    });
};

export const reserveTicket = async (req, res) => {
  try{
    const userId = req.user.user_id; // From JWT token middleware
    const { showtimeId, seatId } = req.body;

    if(!showtimeId || !seatId){
      return handleResponse(res, 400, "showtimeId and seatId are required");
    }

    const seatData = await model.getSeatPriceService(seatId, showtimeId);
    
    if(!seatData){
      return handleResponse(res, 404, "Seat or showtime not found");
    }

    const ticketPrice = parseFloat(seatData.price);

    const isBooked = await model.isSeadBookedService(seatId, showtimeId);
    
    if(isBooked){
      return handleResponse(res, 409, "Seat is already booked");
    }

    let booking = await model.getActiveBookingService(userId);

    if(!booking){
      booking = await model.createBookingService(userId);
    }

    const ticket = await model.createTicketService(
      booking.booking_id,
      showtimeId,
      seatId,
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
    return handleResponse(res, 500, "Error reserving ticket: " + error.message);
  }
};

