import * as model from "../models/bookings.model.js";

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        success: status < 400,
        message,
        data,
    });
};

// Get booking detail with event info
export const getBookingDetail = async (req, res, next) => {
    const { id } = req.params;
    try {
        const booking = await model.getBookingDetail(id);
        if (!booking) {
            return handleResponse(res, 404, "Booking not found");
        }
        handleResponse(res, 200, "Booking details fetched successfully", booking);
    } catch (err) {
        next(err);
    }
};

// Get all bookings for logged-in user
export const getMyBookings = async (req, res, next) => {
    const userId = req.user.id; // From auth middleware
    try {
        const bookings = await model.getBookingsByUserId(userId);
        handleResponse(res, 200, "User bookings fetched successfully", bookings);
    } catch (err) {
        next(err);
    }
};

// Create booking (basic)
export const createBooking = async (req, res, next) => {
    const userId = req.user.id; // From auth middleware
    const { totalPrice } = req.body;
    try {
        if (!totalPrice) {
            return handleResponse(res, 400, "Total price is required");
        }
        const booking = await model.createBooking(userId, totalPrice);
        handleResponse(res, 201, "Booking created successfully", booking);
    } catch (err) {
        next(err);
    }
};
