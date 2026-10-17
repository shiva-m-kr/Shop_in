import crypto from "crypto";
import Razorpay from "razorpay";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import {
    generateInvoiceNumber,
    ensureOrderInvoiceDetails,
    buildInvoicePdf
} from "../services/invoiceService.js";

const DELIVERY_FEE = 40;

// Helper: Razorpay configuration
export const getRazorpayConfig = () => {
    const key_id = (process.env.RAZORPAY_KEY_ID || "").trim();
    const key_secret = (process.env.RAZORPAY_SECREAT_KEY || process.env.RAZORPAY_SECRET_KEY || "").trim();
    return { key_id, key_secret };
};

export const getRazorpayInstance = () => {
    const { key_id, key_secret } = getRazorpayConfig();
    if (!key_id || !key_secret) {
        throw new Error("Razorpay credentials are not configured in backend .env. Please set RAZORPAY_KEY_ID and RAZORPAY_SECREAT_KEY.");
    }
    return new Razorpay({ key_id, key_secret });
};

// Helper: Server-side item verification and total calculation
export const verifyOrderItems = async (items) => {
    const productIds = [...new Set(items.map(item => item._id))];
    const dbProducts = await Product.find({ _id: { $in: productIds } });
    const productMap = {};
    for (const p of dbProducts) {
        productMap[String(p._id)] = p;
    }

    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
        const dbProduct = productMap[String(item._id)];
        if (!dbProduct) {
            throw new Error(`Product not found: ${item._id}`);
        }

        const qty = Number(item.quantity);
        if (!qty || qty <= 0) {
            throw new Error(`Invalid quantity for product: ${dbProduct.name}`);
        }

        verifiedItems.push({
            _id: dbProduct._id,
            name: dbProduct.name,
            price: dbProduct.price,
            image1: dbProduct.image1,
            size: item.size,
            quantity: qty
        });

        subtotal += dbProduct.price * qty;
    }

    const totalAmount = subtotal + DELIVERY_FEE;
    return { verifiedItems, subtotal, totalAmount };
};

// Place Order — server-verified pricing
export const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, address, paymentMethod = "COD" } = req.body;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User identification missing"
            });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items are required to place an order"
            });
        }

        if (!address || typeof address !== "object" || Object.keys(address).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required"
            });
        }

        const { firstName, street, city, state, zipcode, phone } = address;
        if (!firstName || !street || !city || !state || !zipcode || !phone) {
            return res.status(400).json({
                success: false,
                message: "All required address fields (first name, street, city, state, zipcode, phone) must be provided"
            });
        }

        // Server-side price verification
        const { verifiedItems, totalAmount } = await verifyOrderItems(items);

        const orderData = {
            userId,
            items: verifiedItems,
            amount: totalAmount,
            address,
            paymentMethod,
            payment: paymentMethod === "COD" ? false : false,
            date: Date.now()
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        // Clear user's cart in the database
        await User.findByIdAndUpdate(userId, { cartData: {} });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("placeOrder error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while placing order"
        });
    }
};

// Get orders for current logged-in user
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User identification missing"
            });
        }

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("userOrders error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while fetching user orders"
        });
    }
};

// Get single order by ID (user must own the order)
export const getOrderById = async (req, res) => {
    try {
        const userId = req.userId;
        const { orderId } = req.params;

        if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Ensure user owns this order
        if (String(order.userId) !== String(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this order"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error("getOrderById error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while fetching order"
        });
    }
};

// Get all orders (Admin)
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("allOrders error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while fetching all orders"
        });
    }
};

// Update order status (Admin)
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status, payment } = req.body;

        if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "A valid Order ID is required"
            });
        }

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const validStatuses = [
            "Order Placed",
            "Processing",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
            });
        }

        const updateFields = { status };
        if (typeof payment === "boolean") {
            updateFields.payment = payment;
        } else if (status === "Delivered") {
            // Once delivered, COD orders are paid
            updateFields.payment = true;
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            updateFields,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder
        });
    } catch (error) {
        console.error("updateStatus error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while updating order status"
        });
    }
};

// Place Order with Razorpay — creates Razorpay order and pending DB order
export const placeOrderRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User identification missing"
            });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items are required to place an order"
            });
        }

        if (!address || typeof address !== "object" || Object.keys(address).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required"
            });
        }

        const { firstName, street, city, state, zipcode, phone } = address;
        if (!firstName || !street || !city || !state || !zipcode || !phone) {
            return res.status(400).json({
                success: false,
                message: "All required address fields must be provided"
            });
        }

        // Server-side price verification
        const { verifiedItems, totalAmount } = await verifyOrderItems(items);

        // Get Razorpay credentials and instance
        const { key_id } = getRazorpayConfig();
        const razorpayInstance = getRazorpayInstance();

        // Amount in paise (1 INR = 100 paise)
        const amountInPaise = Math.round(totalAmount * 100);

        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`.slice(0, 40)
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        // Save order in MongoDB with payment: false and razorpayOrderId
        const orderData = {
            userId,
            items: verifiedItems,
            amount: totalAmount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            status: "Order Placed",
            date: Date.now(),
            razorpayOrderId: razorpayOrder.id
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        return res.status(201).json({
            success: true,
            order: newOrder,
            razorpayOrder,
            key_id
        });

    } catch (error) {
        console.error("placeOrderRazorpay error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to initialize Razorpay payment"
        });
    }
};

// Verify Razorpay Payment signature and finalize order
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const userId = req.userId;
        const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "A valid Order ID is required"
            });
        }

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing Razorpay payment verification details"
            });
        }

        const { key_secret } = getRazorpayConfig();
        if (!key_secret) {
            return res.status(500).json({
                success: false,
                message: "Razorpay secret key is not configured on server"
            });
        }

        // Generate expected signature using HMAC SHA256
        const signBody = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", key_secret)
            .update(signBody)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature. Verification failed."
            });
        }

        // Retrieve and update order with verified payment and unique invoice details
        const existingOrder = await Order.findById(orderId);
        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Verify that the user owns this order
        if (String(existingOrder.userId) !== String(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this order"
            });
        }

        const invoiceNumber = existingOrder.invoiceNumber || generateInvoiceNumber(existingOrder);
        const invoiceDate = existingOrder.invoiceDate || new Date();

        existingOrder.payment = true;
        existingOrder.razorpayOrderId = razorpay_order_id;
        existingOrder.razorpayPaymentId = razorpay_payment_id;
        existingOrder.invoiceNumber = invoiceNumber;
        existingOrder.invoiceDate = invoiceDate;
        await existingOrder.save();

        // Clear user's cart in DB only after successful payment verification
        await User.findByIdAndUpdate(userId, { cartData: {} });

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order: existingOrder
        });

    } catch (error) {
        console.error("verifyRazorpayPayment error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to verify Razorpay payment"
        });
    }
};

// Download PDF invoice for a verified paid order
export const downloadInvoice = async (req, res) => {
    try {
        const userId = req.userId;
        const { orderId } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User identification missing"
            });
        }

        if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Customer authorization: verify user owns this order
        if (String(order.userId) !== String(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to download this invoice"
            });
        }

        // Payment verification check: invoice is only generated for paid orders
        if (!order.payment) {
            return res.status(400).json({
                success: false,
                message: "Invoice unavailable: Payment has not been verified for this order."
            });
        }

        // Ensure invoiceNumber and invoiceDate are persisted in MongoDB
        await ensureOrderInvoiceDetails(order);

        const filename = `ShopIn-Invoice-${order.invoiceNumber}.pdf`;

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

        await buildInvoicePdf(order, res);

    } catch (error) {
        console.error("downloadInvoice error:", error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to generate invoice PDF"
            });
        }
    }
};
