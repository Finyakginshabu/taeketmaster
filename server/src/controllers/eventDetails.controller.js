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