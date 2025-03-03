
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
const app: Express = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // e.g., "localhost"
  user: process.env.DB_USER,     // e.g., "root"
  password: process.env.DB_PASS, // e.g., "2003"
  database: process.env.DB_NAME, // e.g., "portfolio"
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// API endpoint to handle contact form submissions
app.post("/api/contact", async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await pool.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    res.status(201).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
