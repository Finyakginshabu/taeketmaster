import { http } from "./http.js";

function unwrap(res){
  if(res && res.success === false && res.error) throw new Error(res.error.message);
  return res;
}

export async function signUp(data){
  const res = unwrap(await http("/api/signup", { method: "POST", body: JSON.stringify(data) }));
  return res.data;
}

export async function signIn(data){
  const res = unwrap(await http("/api/signin", { method: "POST", body: JSON.stringify(data) }));
  return res.data;
}
