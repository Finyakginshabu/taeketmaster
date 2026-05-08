import { http } from "./http.js";

function unwrap(res){
  if(res && res.success === false && res.error) throw new Error(res.error.message);
  return res;
}

export async function getEventDetail(eventId){
  const res = unwrap(await http(`/api/event?eventId=${encodeURIComponent(eventId)}`));
  return res.data;
}

export async function getEventDetailTwo(eventId){
  const res = unwrap(await http(`/api/event2?eventId=${encodeURIComponent(eventId)}`));
  return res.data;
}

export async function getAvailableSeat(params = {}){
  const query = new URLSearchParams(params).toString();
  const res = unwrap(await http(`/api/event/available${query ? `?${query}` : ""}`));
  return res.data;
}

export async function getZoneLayout(params = {}){
  const query = new URLSearchParams(params).toString();
  const res = unwrap(await http(`/api/event/zones${query ? `?${query}` : ""}`));
  return res.data;
}

export async function getSeatLayout(params = {}){
  const query = new URLSearchParams(params).toString();
  const res = unwrap(await http(`/api/event/seats${query ? `?${query}` : ""}`));
  return res.data;
}
