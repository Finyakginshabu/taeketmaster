import * as model from "../models/home.model.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const getEventFeed = async (req, res, next) => {
    try{
        const { province, startDate, endDate, search } = req.query;
        const events = await model.getEventFeedService({ 
            province, 
            startDate, 
            endDate,
            search 
        });
        handleResponse(res, 200, "events fetched successfully", events);
    }catch(err){
        next(err);
    }
};