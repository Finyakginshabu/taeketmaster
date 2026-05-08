import * as model from "../models/dashboard.model.js";
import { handleResponse } from "./auth.controller.js";

export const getTodayTicketSold = async (req, res, next) => {
    try{
        const today = await model.getTodayTicketSold();
        const last7Days = await model.getAverageTicketSold7Days();

        const todayTickets = today.total_tickets_sold || 0;
        const todayRevenue = today.total_revenue || 0;
        const avgTickets = last7Days.average_tickets_sold || 0;
        const avgRevenue = last7Days.average_revenue || 0;

        const ticketDifference = avgTickets>0 ? parseFloat(((todayTickets-avgTickets)/avgTickets*100).toFixed(2)) : 0;
        const revenueDifference = avgRevenue>0 ? parseFloat(((todayRevenue-avgRevenue)/avgRevenue*100).toFixed(2)) : 0;
        const data = {
            today: {
                total_tickets_sold: todayTickets,
                total_revenue: todayRevenue
            },
            difference_percent: {
                ticket_percent: ticketDifference,
                revenue_percent: revenueDifference
            }
        };
        handleResponse(res, 200, "Today's ticket sold data fetched successfully", data);
    }catch(err){
        next(err);
    }
};

export const getTopSellingArtists = async (req, res, next) => {
    try{
        const artists = await model.getTopSellingArtists();
        handleResponse(res, 200, "Top artists fetched successfully", artists);
    }catch(err){
        next(err);
    }
};

export const getTopTicketSpenders = async (req, res, next) => {
    try{
        const spenders = await model.getTopTicketSpenders();
        handleResponse(res, 200, "Top ticket spenders fetched successfully", spenders);
    }catch(err){
        next(err);
    }
};

export const getMonthlyRevenue = async (req, res, next) => {
    try{
        const monthlyData = await model.getMonthlyRevenue();
        const monthlyRevenue = {};
        const revenues = [];
        monthlyData.forEach(row => {
            const monthName = row.month_name.toLowerCase();
            monthlyRevenue[monthName] = row.revenue;
            revenues.push(row.revenue);
        });
        const peakMonth = monthlyData.reduce((max, curr) => curr.revenue > max.revenue ? curr : max, monthlyData[0] || {});
        const lowestMonth = monthlyData.reduce((min, curr) => curr.revenue < min.revenue ? curr : min, monthlyData[0] || {});
        const data = {
            peak_month: peakMonth.month_name || null,
            lowest_month: lowestMonth.month_name || null,
            monthly_revenue: monthlyRevenue
        };
        handleResponse(res, 200, "Monthly revenue fetched successfully", data);
    }catch(err){
        next(err);
    }
};

export const getQuaterRevenue = async (req, res, next) => {
    try{
        const quaterData = await model.getQuaterRevenue();
        // YYYY-QX
        const quaterRevenue = {};
        quaterData.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.quarter - b.quarter;
        }).forEach(row => {
            const quaterKey = `${row.year}-Q${row.quarter}`;
            quaterRevenue[quaterKey] = row.revenue;
        });
        const data = { quater_revenue: quaterRevenue };
        handleResponse(res, 200, "Quarterly revenue fetched successfully", data);
    }catch(err){
        next(err);
    }
};

export const getPopularEvent = async (req, res, next) => {
    try{
        const events = await model.getPopularEvent();
        const popularEvents = {};
        events.forEach(row => {
            popularEvents[row.event_name] = row.remaining_tickets;
        });
        const data = { popular_events: popularEvents };
        handleResponse(res, 200, "Popular events fetched successfully", data);
    }catch(err){
        next(err);
    }
};

export const getTopSpenders = async (req, res, next) => {
    try{
        const spenders = await model.getTopSpender();
        
        // Build spender object
        const topSpenders = {};
        spenders.forEach(row => {
            topSpenders[row.name] = row.money_spent;
        });
        
        const data = {
            top_spenders: topSpenders
        };
        
        handleResponse(res, 200, "Top spenders fetched successfully", data);
    }catch(err){
        next(err);
    }
};
