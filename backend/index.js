import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors"



dotenv.config()
let port = process.env.PORT || 6000



let app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/contact",contactRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

app.get("/",(req,res)=>{
    res.send("hello from server")
})
app.listen(port,()=>{
    console.log("Hello from server")
    connectDB()
})