import Contact from "../models/contactModel.js";

export const submitContactMessage = async (req, res) => {
    try {
        const { name, email, subject, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please provide your name, email, and message."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        const newContact = new Contact({
            name,
            email,
            subject: subject || "General Inquiry",
            phone: phone || "",
            message
        });

        await newContact.save();

        return res.status(201).json({
            success: true,
            message: "Thank you for reaching out! We have received your message and will respond shortly.",
            contactId: newContact._id
        });
    } catch (error) {
        console.error("submitContactMessage error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit message. Please try again later."
        });
    }
};

export const getAllContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.error("getAllContactMessages error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch messages."
        });
    }
};
