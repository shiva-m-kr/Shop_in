import express from "express";
import { submitContactMessage, getAllContactMessages } from "../controller/contactController.js";
import adminAuth from "../middleware/adminAuth.js";

const contactRoutes = express.Router();

contactRoutes.post("/submit", submitContactMessage);
contactRoutes.get("/list", adminAuth, getAllContactMessages);

export default contactRoutes;
