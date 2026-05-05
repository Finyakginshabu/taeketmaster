import { http } from "./http.js";

// If backend returns success: false, throw the error message so callers can catch.
function unwrap(res){
  if(res && res.success === false && res.error) throw new Error(res.error.message);
  return res;
}

export async function getProfile(token){
  const res = unwrap(await http("/api/profile", {
    headers: { "Authorization": `Bearer ${token}` }
  }));
  return res.data;
}

export async function updateProfile(data, token){
  const res = unwrap(await http("/api/profile", {
    method: "PUT",
    headers: { "Authorization": `Bearer ${token}` },
    body: JSON.stringify(data)
  }));
  return res.data;
}

export async function getAddress(token){
  const res = unwrap(await http("/api/address", {
    headers: { "Authorization": `Bearer ${token}` }
  }));
  return res.data;
}

export async function upsertAddress(data, token){
  const res = unwrap(await http("/api/address", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: JSON.stringify(data)
  }));
  return res.data;
}
