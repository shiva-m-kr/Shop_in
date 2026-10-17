import express from "express";
import { getCurrentUser, getAdmin, updateProfile } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";

let userRoutes = express.Router();

userRoutes.get("/currentuser", isAuth, getCurrentUser);
userRoutes.put("/updateprofile", isAuth, updateProfile);
userRoutes.get("/getadmin", adminAuth, getAdmin);

export default userRoutes;