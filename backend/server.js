const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const connectDb = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Task Manager API is running."});
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

async function startServer() {
    try{
        const db = await connectDb();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
            )
        `);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL UNIQUE DEFAULT 'todo',
            FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        console.log("Database connected and tables ready.")

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error.message);
    }
}

startServer();