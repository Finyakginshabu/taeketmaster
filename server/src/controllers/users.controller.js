import * as model from "../models/users.model.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).join({
        status,
        message,
        data,
    });
};

export const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    try{
        const newUser = await model.createUserService(name, email);
        handleResponse(res, 201, "User created successfully", newUser);
    }catch(err){
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try{
        const users = await model.getAllUsersService();
        handleResponse(res, 200, "Users fetched successfully", users);
    }catch(err){
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try{
        const user = await model.getUserByIdService(req.params.id);
        if(!user) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User fetched successfully", user);
    }catch(err){
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    const { name, email } = req.body;
    try{
        const updatedUser = await model.updateUserService(req.params.id, name, email);
        if(!updatedUser) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User updated successfully", updatedUser);
    }catch(err){
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try{
        const deletedUser = await model.deleteUserService(req.params.id);
        if(!deletedUser) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User deleted successfully", deletedUser);
    }catch(err){
        next(err);
    }
};