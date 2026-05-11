// Admin
import { http } from "./http.js";

const TOKEN_KEY = "token";

function unwrap(res){
  if(res && res.success === false && res.error) throw new Error(res.error.message);
  return res;
}

function getToken(){
  return localStorage.getItem(TOKEN_KEY);
}

// Today's Ticket Sold + Today's Revenue
export async function getTodayTicketSold(){
  const res = unwrap(await http("/api/dashboard/001", {
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Top Selling Artists
export async function getTopSellingArtists(){
  const res = unwrap(await http("/api/dashboard/002", {
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Top Ticket Spenders (this quater)
export async function getTopTicketSpenders(){
  const res = unwrap(await http("/api/dashboard/003", {
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Monthly Revenue (this year)
export async function getMonthlyRevenue(){
  const res = unwrap(await http("/api/dashboard/004", {
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Quarterly Revenue
export async function getQuaterRevenue(){
  const res = unwrap(await http("/api/dashboard/005", {
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Popular Events
export async function getPopularEvent(){
  const res = unwrap(await http("/api/dashboard/006", {
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Top Spenders
export async function getTopSpender(){
  const res = unwrap(await http("/api/dashboard/007", {
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getReportData(type, params) {
  let data = [];

  switch (type) {
    case "popular-event":
      data = await getPopularEvent();
      break;
    case "monthly-revenue":
      data = await getMonthlyRevenue();
      break;
    case "top-spender":
      data = await getTopTicketSpenders();
      break;
    case "todays-booking": 
      data = await getTodayTicketSold(); 
      break;
    case "top-artist":
      data = await getTopSellingArtists();
      break;
    case "todays-revenue":
      data = await getTodayTicketSold();
      break;
    case "alltime-topspender":
      data = await getTopSpender();
      break;
    case "quarterly-revenue":
      data = await getQuaterRevenue();
      break;
    default:
      throw new Error(`Report type "${type}" is not supported yet.`);
  }

  return {
    data: data,
    total: Array.isArray(data) ? data.length : Object.keys(data || {}).length,
    totalPages: 1
  };
}