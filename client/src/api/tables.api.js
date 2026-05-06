import { http } from "./http.js";

const TOKEN_KEY = "token";

function unwrap(res){
  if(res && res.success === false && res.error) throw new Error(res.error.message);
  return res;
}

function getToken(){
  return localStorage.getItem(TOKEN_KEY);
}

// Artists
export async function getArtists(){
  const res = unwrap(await http("/api/admin/artists", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getArtistById(artistId){
  const res = unwrap(await http(`/api/admin/artists/${artistId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function createArtist(artistName){
  const res = unwrap(await http("/api/admin/artists", { 
    method: "POST", 
    body: JSON.stringify({ artist_name: artistName }),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function updateArtist(artistId, artistName){
  const res = unwrap(await http(`/api/admin/artists/${artistId}`, { 
    method: "PUT", 
    body: JSON.stringify({ artist_name: artistName }),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function deleteArtist(artistId){
  const res = unwrap(await http(`/api/admin/artists/${artistId}`, { 
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Genres
export async function getGenres(){
  const res = unwrap(await http("/api/admin/genres", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getGenreById(genreId){
  const res = unwrap(await http(`/api/admin/genres/${genreId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function createGenre(genreName){
  const res = unwrap(await http("/api/admin/genres", { 
    method: "POST", 
    body: JSON.stringify({ genre_name: genreName }),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function updateGenre(genreId, genreName){
  const res = unwrap(await http(`/api/admin/genres/${genreId}`, { 
    method: "PUT", 
    body: JSON.stringify({ genre_name: genreName }),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function deleteGenre(genreId){
  const res = unwrap(await http(`/api/admin/genres/${genreId}`, { 
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Agents
export async function getAgents(){
  const res = unwrap(await http("/api/admin/agents", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getAgentById(agentId){
  const res = unwrap(await http(`/api/admin/agents/${agentId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function createAgent(agentData){
  const res = unwrap(await http("/api/admin/agents", { 
    method: "POST", 
    body: JSON.stringify(agentData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function updateAgent(agentId, agentData){
  const res = unwrap(await http(`/api/admin/agents/${agentId}`, { 
    method: "PUT", 
    body: JSON.stringify(agentData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function deleteAgent(agentId){
  const res = unwrap(await http(`/api/admin/agents/${agentId}`, { 
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Venues
export async function getVenues(){
  const res = unwrap(await http("/api/admin/venues", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getVenueById(venueId){
  const res = unwrap(await http(`/api/admin/venues/${venueId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function createVenue(venueData){
  const res = unwrap(await http("/api/admin/venues", { 
    method: "POST", 
    body: JSON.stringify(venueData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function updateVenue(venueId, venueData){
  const res = unwrap(await http(`/api/admin/venues/${venueId}`, { 
    method: "PUT", 
    body: JSON.stringify(venueData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function deleteVenue(venueId){
  const res = unwrap(await http(`/api/admin/venues/${venueId}`, { 
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Zones
export async function getZonesByVenue(venueId){
  const res = unwrap(await http(`/api/admin/venues/${venueId}/zones`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getZoneById(zoneId){
  const res = unwrap(await http(`/api/admin/zones/${zoneId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function createZone(zoneData){
  const res = unwrap(await http("/api/admin/zones", { 
    method: "POST", 
    body: JSON.stringify(zoneData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function updateZone(zoneId, zoneData){
  const res = unwrap(await http(`/api/admin/zones/${zoneId}`, { 
    method: "PUT", 
    body: JSON.stringify(zoneData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function deleteZone(zoneId){
  const res = unwrap(await http(`/api/admin/zones/${zoneId}`, { 
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Seats
export async function getSeatsByZone(zoneId){
  const res = unwrap(await http(`/api/admin/zones/${zoneId}/seats`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getSeatById(seatId){
  const res = unwrap(await http(`/api/admin/seats/${seatId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function createSeat(seatData){
  const res = unwrap(await http("/api/admin/seats", { 
    method: "POST", 
    body: JSON.stringify(seatData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function updateSeat(seatId, seatData){
  const res = unwrap(await http(`/api/admin/seats/${seatId}`, { 
    method: "PUT", 
    body: JSON.stringify(seatData),
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function deleteSeat(seatId){
  const res = unwrap(await http(`/api/admin/seats/${seatId}`, { 
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Users (view only)
export async function getUsers(){
  const res = unwrap(await http("/api/admin/users", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getUserById(userId){
  const res = unwrap(await http(`/api/admin/users/${userId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Bookings (view only)
export async function getBookings(){
  const res = unwrap(await http("/api/admin/bookings", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getBookingById(bookingId){
  const res = unwrap(await http(`/api/admin/bookings/${bookingId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getBookingTickets(bookingId){
  const res = unwrap(await http(`/api/admin/bookings/${bookingId}/tickets`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Payments (view only)
export async function getPayments(){
  const res = unwrap(await http("/api/admin/payments", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getPaymentById(paymentId){
  const res = unwrap(await http(`/api/admin/payments/${paymentId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

// Tickets (view only)
export async function getTickets(){
  const res = unwrap(await http("/api/admin/tickets", { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}

export async function getTicketById(ticketId){
  const res = unwrap(await http(`/api/admin/tickets/${ticketId}`, { 
    headers: { Authorization: `Bearer ${getToken()}` }
  }));
  return res.data;
}
