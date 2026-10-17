import express from 'express';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import {
    placeOrder,
    placeOrderRazorpay,
    verifyRazorpayPayment,
    userOrders,
    getOrderById,
    allOrders,
    updateStatus,
    downloadInvoice
} from '../controller/orderController.js';

const orderRoutes = express.Router();

// Admin routes (must be before /:orderId to avoid route conflict)
orderRoutes.get("/admin/all", adminAuth, allOrders);
orderRoutes.post("/admin/status", adminAuth, updateStatus);

// Customer routes (protected by user auth)
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay);
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpayPayment);
orderRoutes.get("/userorders", isAuth, userOrders);
orderRoutes.get("/:orderId/invoice", isAuth, downloadInvoice);
orderRoutes.get("/:orderId", isAuth, getOrderById);

export default orderRoutes;