import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { handleResponse } from "../controllers/auth.controller.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "alm1ghtymut4ntpuppy6sevenhokjedhokjed";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
    if(!token){
        return handleResponse(res, 401, "Access denied. No token provided."); 
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    }catch(err){
        return handleResponse(res, 403, "Invalid or expired token.");
    }
};

export const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return handleResponse(res, 401, "Access denied. No token provided."); 
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        if(decoded.role !== 'admin'){
            return handleResponse(res, 403, "Access denied. Only Admin lol.");
        }
        next();
    }catch(err){
        return handleResponse(res, 403, "Invalid or expired token.");
    }
};