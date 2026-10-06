import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "StayFinder API is running"
    });
});

app.get("/api/health/db", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT NOW() AS database_time"
        );

        res.json({
            status: "ok",
            database: "connected",
            time: result.rows[0].database_time
        });
    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            status: "error",
            database: "disconnected"
        });
    }
});
app.get("/api/properties", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                id,
                host_id,
                title,
                description,
                city,
                state,
                country,
                latitude,
                longitude,
                nightly_rate,
                max_guests,
                bedrooms,
                bathrooms
            FROM properties
            ORDER BY created_at DESC
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching properties:", error);

        res.status(500).json({
            error: "Failed to fetch properties"
        });
    }
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
});
