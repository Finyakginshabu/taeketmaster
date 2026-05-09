import pool from "../config/db.js";

export const updateUser = async (id, userData) => {
    const { first_name, last_name, username, phone, date_of_birth, gender } = userData;
    
    if(username){
        const existingUsername = await pool.query(
            `select user_id from users where username = $1 and user_id != $2`,
            [username, id]
        );
        if(existingUsername.rows.length > 0){
            throw new Error("Username already taken");
        }
    }
    
    const result = await pool.query(
        `update users set first_name = $1, last_name = $2, username = COALESCE($3, username), 
         phone = $4, date_of_birth = $5, gender = $6 where user_id = $7 
         returning user_id as id, first_name, last_name, email, username, phone, date_of_birth, gender, role`,
        [first_name, last_name, username, phone, date_of_birth, gender, id]
    );
    return result.rows[0];
};

export const getUserById = async (userId) => {
    const result = await pool.query(
        `select user_id as id, username, first_name, last_name, email, phone, date_of_birth, gender
         from users where user_id = $1`,
        [userId]
    );
    return result.rows[0];
};

// Address
export const getAddressByUserId = async (userId) => {
    const result = await pool.query(
        `select address_id, user_id, house_no, street_name, sub_district, district, province, postal_code 
         from addresses where user_id = $1`,
        [userId]
    );
    return result.rows[0];
};

export const createAddress = async (userId, addressData) => {
    const { house_no, street_name, sub_district, district, province, postal_code } = addressData;
    
    const result = await pool.query(
        `insert into addresses (user_id, house_no, street_name, sub_district, district, province, postal_code) 
         values ($1, $2, $3, $4, $5, $6, $7) 
         returning address_id, user_id, house_no, street_name, sub_district, district, province, postal_code`,
        [userId, house_no, street_name, sub_district, district, province, postal_code]
    );
    return result.rows[0];
};

export const updateAddress = async (addressId, userId, addressData) => {
    const { house_no, street_name, sub_district, district, province, postal_code } = addressData;
    
    const result = await pool.query(
        `update addresses set house_no = $1, street_name = $2, sub_district = $3, district = $4, province = $5, postal_code = $6 
         where address_id = $7 and user_id = $8 
         returning address_id, user_id, house_no, street_name, sub_district, district, province, postal_code`,
        [house_no, street_name, sub_district, district, province, postal_code, addressId, userId]
    );
    return result.rows[0];
};
