import { http } from "./http.js";

function unwrap(res){
  if(res && res.success === false && res.error) throw new Error(res.error.message);
  return res;
}

export async function reserveTicket(data, token){
  const res = unwrap(await http("/api/reserve", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: JSON.stringify(data)
  }));
  return res.data;
}

export async function createPayment(data, token){
  const res = unwrap(await http("/api/payment", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  }));
  return res.data;
}

export async function removeBooking(data, token){
  const res = unwrap(await http("/api/booking", {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(data)
  }));
  return res.data;
}
