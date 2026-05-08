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
// await getTicketsSold('daily'); -> 001 (1)
// await getTicketsSold('2026-01-01', '2026-12-31', 'monthly');
export async function getTicketsSold(startDate, endDate, groupBy = 'daily'){
    const params = new URLSearchParams({ start_date: startDate, end_date: endDate, group_by: groupBy });
    const res = unwrap(await http(`/api/reports/tickets-sold?${params}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.data;
}

// Selling Artists Report
// await getSellingArtists(); -> 002
export async function getSellingArtists(){
    const res = unwrap(await http("/api/reports/selling-artists", {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.data;
}

// Ticket Spenders Report
// await getTicketSpenders('this_quarter'); -> 003
// await getTicketSpenders('all_time', null, null, 'total_spent'); -> 007
// await getTicketSpenders('custom', '2026-01-01', '2026-05-08', 'total_spent');
export async function getTicketSpenders(period, startDate = null, endDate = null, sortBy = 'total_tickets'){
    let url = `/api/reports/ticket-spenders?period=${period}&sort_by=${sortBy}`;
    if(period === 'custom' && startDate && endDate){
        url += `&start_date=${startDate}&end_date=${endDate}`;
    }
    const res = unwrap(await http(url, { headers: { Authorization: `Bearer ${getToken()}` } }));
    return res.data;
}

// Revenue Report
// await getRevenue('daily'); -> 001 (2)
// await getRevenue('monthly'); -> 004
// await getRevenue('quarterly'); -> 005
// await getRevenue('2026-05-01', '2026-05-31', 'daily');
export async function getRevenue(startDate, endDate, groupBy = 'daily'){
    const params = new URLSearchParams({ start_date: startDate, end_date: endDate, group_by: groupBy });
    const res = unwrap(await http(`/api/reports/revenue?${params}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.data;
}

// Popular Events Report
// await getPopularEvents(); -> 006
export async function getPopularEvents(){
    const res = unwrap(await http("/api/reports/popular-events", {
        headers: { Authorization: `Bearer ${getToken()}` }
    }));
    return res.data;
}
