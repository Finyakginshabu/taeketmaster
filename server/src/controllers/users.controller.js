import * as model from "../models/users.model.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const getProfile = async (req, res, next) => {
    const userId = req.user.id; // From your auth middleware
    try{
        const user = await model.getUserById(userId);
        
        if(!user){
            return handleResponse(res, 404, "User not found");
        }

        handleResponse(res, 200, "Profile fetched successfully", user);
    }catch(err){
        next(err);
    }
};

export const updateProfile = async (req, res, next) => {
    const userId = req.user.id; // From auth middleware
    const { first_name, last_name, username, phone } = req.body;
    try{
        const updatedUser = await model.updateUser(userId, { first_name, last_name, username, phone });
        if(!updatedUser) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "Profile updated successfully", updatedUser);
    }catch(err){
        next(err);
    }
};

export const getAddress = async (req, res, next) => {
    const userId = req.user.id;
    try{
        const address = await model.getAddressByUserId(userId);
        if(!address) return handleResponse(res, 404, "Address not found");
        handleResponse(res, 200, "Address fetched successfully", address);
    }catch(err){
        next(err);
    }
};

export const upsertAddress = async (req, res, next) => {
    const userId = req.user.id;
    const { house_no, street_name, sub_district, district, province, postal_code } = req.body;
    try{
        // Check if address already exists
        const existingAddress = await model.getAddressByUserId(userId);
        let result;

        if(existingAddress){
            // Update
            result = await model.updateAddress(existingAddress.address_id, userId, {
                house_no, street_name, sub_district, district, province, postal_code
            });
            handleResponse(res, 200, "Address updated successfully", result);
        } else {
            // Create
            result = await model.createAddress(userId, {
                house_no, street_name, sub_district, district, province, postal_code
            });
            handleResponse(res, 201, "Address created successfully", result);
        }
    }catch(err){
        next(err);
    }
};