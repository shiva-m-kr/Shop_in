import express from "express";
import { getCart, addToCart, updateCart, mergeCart } from "../controller/cartController.js";
import isAuth from "../middleware/isAuth.js";

const cartRoutes = express.Router();

cartRoutes.get("/", isAuth, getCart);
cartRoutes.post("/add", isAuth, addToCart);
cartRoutes.put("/update", isAuth, updateCart);
cartRoutes.post("/merge", isAuth, mergeCart);

export default cartRoutes;
