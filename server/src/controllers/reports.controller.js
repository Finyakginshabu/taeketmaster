import * as model from "../models/reports.model.js";
import { handleResponse } from "./auth.controller.js";

// Tickets Sold Report
export const getTicketsSold = async (req, res, next) => {
    try{
        const { start_date, end_date, group_by } = req.query;
        
        // Validate date format if provided
        if(start_date || end_date){
            if(!start_date || !end_date){
                return handleResponse(res, 400, "both start_date and end_date required or leave both null for all time");
            }
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if(!dateRegex.test(start_date) || !dateRegex.test(end_date)){
                return handleResponse(res, 400, "date format");
            }
        }
        
        const validGroupBy = ['daily', 'monthly'];
        const groupByValue = group_by || 'daily';
        if(!validGroupBy.includes(groupByValue)){
            return handleResponse(res, 400, "daily or monthly");
        }
        const reportData = await model.getTicketsSold(start_date || null, end_date || null, groupByValue);
        const data = { report: reportData };
        handleResponse(res, 200, "Tickets sold report generated successfully", data);
    }catch(err){
        next(err);
    }
};

// Selling Artists Report
export const getSellingArtists = async (req, res, next) => {
    try{
        const reportData = await model.getSellingArtists();
        const data = { report: reportData };
        
        handleResponse(res, 200, "Selling artists report generated successfully", data);
    }catch(err){
        next(err);
    }
};

// Ticket Spenders Report -> if not custom, not show date range filter
export const getTicketSpenders = async (req, res, next) => {
    try{
        const { period, start_date, end_date, sort_by } = req.query;
        let startDate, endDate;
        const today = new Date();
        if(period === 'custom'){
            // date range
            if(!start_date || !end_date){
                return handleResponse(res, 400, "start_date or end_date missed");
            }
            // YYYY-MM-DD
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if(!dateRegex.test(start_date) || !dateRegex.test(end_date)){
                return handleResponse(res, 400, "Date format");
            }
            startDate = start_date;
            endDate = end_date;
        }else if(period === 'all_time'){
            startDate = null;
            endDate = null;
        }else if(period === 'this_year'){
            startDate = `${today.getFullYear()}-01-01`;
            endDate = today.toISOString().split('T')[0];
        }else if(period === 'this_month'){
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            startDate = `${year}-${month}-01`;
            endDate = today.toISOString().split('T')[0];
        }else if(period === 'this_quarter'){
            const quarter = Math.ceil((today.getMonth()+1)/3);
            const startMonth = (quarter-1)*3+1;
            const year = today.getFullYear();
            startDate = `${year}-${String(startMonth).padStart(2, '0')}-01`;
            endDate = today.toISOString().split('T')[0];
        }else{
            return handleResponse(res, 400, "this_year/this_month/this_quarter/all_time/custom");
        }
        const validSortBy = ['total_tickets', 'total_spent'];
        const sortByValue = sort_by || 'total_tickets';
        if(!validSortBy.includes(sortByValue)){
            return handleResponse(res, 400, "sort_by must be total_tickets or total_spent");
        }
        const reportData = await model.getTicketSpenders(startDate, endDate, sortByValue);
        const data = { report: reportData };
        handleResponse(res, 200, "Ticket spenders report generated successfully", data);
    }catch(err){
        next(err);
    }
};

// Revenue Report
export const getRevenue = async (req, res, next) => {
    try{
        const { start_date, end_date, group_by } = req.query;
        if(start_date || end_date){
            if(!start_date || !end_date){
                return handleResponse(res, 400, "both start_date and end_date required or leave both null for all time");
            }
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if(!dateRegex.test(start_date) || !dateRegex.test(end_date)){
                return handleResponse(res, 400, "date format");
            }
        }
        const validGroupBy = ['daily', 'monthly', 'quarterly'];
        const groupByValue = group_by || 'daily';
        if(!validGroupBy.includes(groupByValue)){
            return handleResponse(res, 400, "daily, monthly or quarterly");
        }
        const reportData = await model.getRevenue(start_date || null, end_date || null, groupByValue);
        const data = { report: reportData };
        handleResponse(res, 200, "Revenue report generated successfully", data);
    }catch(err){
        next(err);
    }
};

// Popular Events Report
export const getPopularEvents = async (req, res, next) => {
    try{
        const { start_date, end_date } = req.query;
        
        // Validate date format if provided
        if(start_date || end_date){
            if(!start_date || !end_date){
                return handleResponse(res, 400, "both start_date and end_date required or leave both null for all time");
            }
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if(!dateRegex.test(start_date) || !dateRegex.test(end_date)){
                return handleResponse(res, 400, "date format");
            }
        }
        
        const reportData = await model.getPopularEvents(start_date || null, end_date || null);
        const data = { report: reportData };
        
        handleResponse(res, 200, "Popular events report generated successfully", data);
    }catch(err){
        next(err);
    }
};
