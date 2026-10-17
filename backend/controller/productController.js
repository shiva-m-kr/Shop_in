import uploadonCloudinary from "../config/cloudinary.js"
import Product from "../models/productModel.js"

export const addProduct = async (req, res) => {
    try {
        let {
            name,
            price,
            description,
            category,
            subCategory,
            sizes,
            bestSeller
        } = req.body

        let image1 = req.files?.image1 && req.files.image1[0] ? await uploadonCloudinary(req.files.image1[0].path) : null;
        let image2 = req.files?.image2 && req.files.image2[0] ? await uploadonCloudinary(req.files.image2[0].path) : null;
        let image3 = req.files?.image3 && req.files.image3[0] ? await uploadonCloudinary(req.files.image3[0].path) : null;
        let image4 = req.files?.image4 && req.files.image4[0] ? await uploadonCloudinary(req.files.image4[0].path) : null;

        let productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            date: Date.now(),
            bestSeller: bestSeller === "true" ? true : false,
        }

        if (image1 && image1.secure_url) productData.image1 = image1.secure_url;
        if (image2 && image2.secure_url) productData.image2 = image2.secure_url;
        if (image3 && image3.secure_url) productData.image3 = image3.secure_url;
        if (image4 && image4.secure_url) productData.image4 = image4.secure_url;

        const product = await Product.create(productData)

        res.status(200).json({
            message: "Product added successfully",
            product
        })

    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({
            message: "Add product error",
            error: error.message
        })
    }
}


export const listProduct = async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json({
            message: "Product listed successfully",
            product
        })
    }catch(error){
        console.error("Error in listProduct:", error);
        res.status(500).json({
            message: "List product error",
            error: error.message
        })
    }
}


export const removeProduct= async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.body.id);
        res.status(200).json({
            message: "Product removed successfully",
            product
        })
    }catch(error){
        console.error("Error in removeProduct:", error);
        res.status(500).json({
            message: "Remove product error",
            error: error.message
        })
    }
}   

