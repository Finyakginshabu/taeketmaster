import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();

console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log("Connection pool established with Database");
})

export default pool;

export const query = (sql, params) => pool.execute(sql, params);