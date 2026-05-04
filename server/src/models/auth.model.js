import pool from "../config/db.js";

export const getAuthUser = async (usorem) => {
    const result = await pool.query(`select user_id, password, role from users where username = $1 OR email ilike $1`, [usorem]);
    return result.rows[0];
};

export const getUserByEmail = async (email) => {
    const result = await pool.query(`select user_id from users where email ilike $1`, [email]);
    return result.rows[0];
};

export const getUserByUsername = async (username) => {
    const result = await pool.query(`select user_id from users where username = $1`, [username]);
    return result.rows[0];
};

export const createUser = async (userData) => {
    const { first_name, last_name, gender, date_of_birth, email, phone, username, password } = userData;
    const result = await pool.query(
        `insert into users (first_name, last_name, gender, date_of_birth, email, phone, username, password) 
        values ($1, $2, $3, $4, $5, $6, $7, $8) returning user_id as id, first_name, last_name, email, username, role`,
        [first_name, last_name, gender, date_of_birth, email, phone, username, password]
    );
    return result.rows[0];
};