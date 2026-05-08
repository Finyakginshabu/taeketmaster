import * as model from "../models/eventDetails.model.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const getEventDetail = async (req, res, next) => {
    try{
        const { id } = req.query;
        const event = await model.getEventDetailService(id);
        handleResponse(res, 200, "event fetched successfully", event);
    }catch(err){
        next(err);
    }
};

export const getEventDetailTwo = async (req, res, next) => {
    try{
        const { id } = req.query;
        const event = await model.getEventDetailTwoService(id);
        handleResponse(res, 200, "event fetched successfully", event);
    }catch(err){
        next(err);
    }
};

export const getAvailableSeat = async (req, res, next) => {
    try{
        const { id } = req.query;
        if(!id) return handleResponse(res, 400, "event_id is required");
        const seats = await model.getAvailableSeatService(id);
        if(seats.length === 0){
            return handleResponse(res, 404, "No seating data found for this event");
        }
        handleResponse(res, 200, "available seats fetched successfully", seats);
    }catch (err){
        next(err);
    }
};

export const getZoneLayout = async (req, res, next) => {
    try{
        const { id } = req.query;
        if(!id) return handleResponse(res, 400, "event_id is required");
        const layout = await model.getZoneLayoutService(id);
        if(!layout || layout.length === 0){
            return handleResponse(res, 404, "no zone layout found for this event");
        }
        handleResponse(res, 200, "zone layout fetched successfully", layout);
    }catch(err){
        next(err);
    }
};

export const getSeatLayout = async (req, res, next) => {
    try{
        const { zone_id, showtime_id } = req.query;
        if(!zone_id || !showtime_id){
            return handleResponse(res, 400, "zone_id and showtime_id are required");
        }
        const seats = await model.getSeatLayoutService(zone_id, showtime_id);
        if(!seats || seats.length === 0){
            return handleResponse(res, 404, "no seats found for this zone");
        }
        handleResponse(res, 200, "seat layout fetched successfully", seats);
    }catch(err){
        next(err);
    }
};