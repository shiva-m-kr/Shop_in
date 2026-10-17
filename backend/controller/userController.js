import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            message: `getCurrentUser error: ${error.message}`
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { name: name.trim() },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: `updateProfile error: ${error.message}`
        });
    }
};

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(404).json({message:"admin not found"});
        }
        return res.status(201).json({
            email:adminEmail,
            role: "admin"
        })
    }catch(error){
        console.log("getAdmin error : ", error)
        return res.status(500).json({ message: `getAdmin error ${error}` }             
        )
    }
}

