
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email"
            });
        }

        if (!validator.isLength(password, { min: 8 })) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error("registration error:", error);

        return res.status(500).json({
            message: `Registration error: ${error.message}`
        });
    }
};


export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: `Login error: ${error.message}`
        });
    }
}





export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message: "Logout successful"
        })
    } catch (error) {
        return res.status(500).json({
            message: `Logout error: ${error.message}`
        })
    }
}


export const googleLogin = async (req, res) => {

    try {
        let { name, email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
            })
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: `Google login error: ${error.message}`
        })
    }
}






export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await genToken1(email)

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json(token);
        }
        return res.status(400).json({ message: "Invalid creadintials for admin" })
    } catch (error) {
        return res.status(500).json({ messege: `AdminLogin error ${error.message}` })
    }
}











