const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res){
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email, and password are required.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                name,
                email,
            },
            passwordHashPreview: hashedPassword.substring(0, 20) + "...",
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

        const mockUser = {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            password: await bcrypt.hash("password123", 10),
        };

        if (email !== mockUser.email){
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const passwordMatch = await bcrypt.compare(password, mockUser.password);

        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            { userId: mockUser.id, email: mockUser.email }, 
            process.env.JWT_SECRET || "fallback_secret_key",
            { expiresIn: "1h"}
        );

        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: mockUser.id,
                name: mockUser.name,
                email: mockUser.email,
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