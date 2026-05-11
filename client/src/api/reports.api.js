//Admin -> 1 Fuction : 1 Report (labeled in Figma)
import { http } from "./http.js";

const TOKEN_KEY = "token";

function unwrap(res){
    if(res && res.success === false && res.error) throw new Error(res.error.message);
    return res;
}

function getToken(){
    return localStorage.getItem(TOKEN_KEY);
}

// Tickets Sold Report
export async function getTicketsSoldReport(options = {}){
    const { start_date = '', end_date = '', group_by = 'daily' } = options;
    const params = new URLSearchParams({ start_date, end_date, group_by });
    const res = unwrap(await http(`/api/reports/tickets-sold?${params}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.report || res.data || [];
}

// Selling Artists Report
export async function getSellingArtistsReport(){
    const res = unwrap(await http("/api/reports/selling-artists", {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.report || res.data || [];
}

// Ticket Spenders Report
export async function getTicketSpendersReport(options = {}){
    const { period = 'this_year', start_date = '', end_date = '', sort_by = 'total_spent' } = options;
    let url = `/api/reports/ticket-spenders?period=${period}&sort_by=${sort_by}`;
    if(period === 'custom' && start_date && end_date){
        url += `&start_date=${start_date}&end_date=${end_date}`;
    }
    const res = unwrap(await http(url, { headers: { Authorization: `Bearer ${getToken()}` } }));
    return res.report || res.data || [];
}

// Revenue Report
export async function getRevenueReport(options = {}){
    const { start_date = '', end_date = '', group_by = 'daily' } = options;
    const params = new URLSearchParams({ start_date, end_date, group_by });
    const res = unwrap(await http(`/api/reports/revenue?${params}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.report || res.data || [];
}

// Popular Events Report
export async function getPopularEventsReport(options = {}){
    const { start_date = '', end_date = '' } = options;
    const params = new URLSearchParams({ start_date, end_date });
    const res = unwrap(await http(`/api/reports/popular-events?${params}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.report || res.data || [];
}
