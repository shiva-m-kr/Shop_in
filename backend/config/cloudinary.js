import { v2 as cloudinary } from 'cloudinary';
import fs from "node:fs";

const uploadonCloudinary = async (filepath) => {
    if (!filepath) {
        return null;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const result = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto"
        });

        return result;
    } finally {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
    }
};

export default uploadonCloudinary;