const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

async function registerUser(req, res){
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email, and password are required.",
            });
        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if(existingUser.rows.length > 0){
            return res.status(400).json({
                message: "Email already registered.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );

        return res.status(201).json({
            message: "User registered successfully.",
            user: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error during registration.",
            error: error.message,
        });
    }
}

async function loginUser(req, res) {
    try{
        const {email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = userResult.rows[0];

        if (!user){
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email }, 
            process.env.JWT_SECRET || "fallback_secret_key",
            { expiresIn: "1h"}
        );

        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error){
        return res.status(500).json({
            message: "Server error during login",
            error: error.message,
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
};