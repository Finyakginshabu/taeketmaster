import * as model from "../models/auth.model.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "alm1ghtymut4ntpuppy6sevenhokjedhokjed";

export const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        success: status < 400,
        message: message,
        data: data
    });
};

export const signUp = async (req, res, next) => {
    const { first_name, last_name, gender, date_of_birth, email, phone, username, password } = req.body;
    try{
        const badEmail = await model.getUserByEmail(email);
        if(badEmail){
            return handleResponse(res, 400, "An account with this email or already exists. Go sign in, lol.");
        }
        const badUsername = await model.getUserByUsername(username);
        if(badUsername){
            return handleResponse(res, 400, "Username already taken. Cry about it, lol.");
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await model.createUser({ first_name, last_name, gender, date_of_birth, 
            email, phone, username, password: hashedPassword 
        });
        handleResponse(res, 201, "Sign up successful, GG", newUser);
    }catch(err){
        next(err);
    }
};

export const signIn = async (req, res, next) => {
    const { usorem, password } = req.body;
    try{
        const user = await model.getAuthUser(usorem);
        if(!user){
            return handleResponse(res, 401, "One of those was wrong. Guess which?");
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return handleResponse(res, 401, "One of those was wrong. Guess which?");
        }
        const token = jwt.sign(
            { id: user.user_id, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        handleResponse(res, 200, "Sign in successful, GG", { 
            token,
            user: { 
                id: user.user_id, 
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email,
                username: user.username,
                role: user.role
            } 
        });
    }catch (err){
        next(err);
    }
};