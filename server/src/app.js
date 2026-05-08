import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"

// import userRoutes from "./routes/users.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/users.routes.js"
import homeRoutes from "./routes/home.routes.js"
import eventDetailsRoutes from "./routes/eventDetail.routes.js"
import bookingsRoutes from "./routes/bookings.routes.js"
import tablesRoutes from "./routes/tables.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import reportsRoutes from "./routes/reports.routes.js"
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", homeRoutes);
app.use("/api", eventDetailsRoutes);
app.use("/api", bookingsRoutes);
app.use("/api/admin", tablesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api", express.static('public'));

// Error handling middleware
app.use(errorHandling);

// Testing postgres
app.get("/", async(req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`)
})

// Server running
app.listen(port, () => {
    console.log(`Hello, World! Taeketmaster server is running on port ${port}`);
})