import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        default: "General Inquiry",
        trim: true
    },
    phone: {
        type: String,
        default: "",
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "reviewed", "resolved"],
        default: "pending"
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
