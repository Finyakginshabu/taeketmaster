import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();

console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log("Connection pool established with Database");
})

export default pool;
