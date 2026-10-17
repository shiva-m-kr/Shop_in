import User from "../models/userModel.js";

// GET /api/cart  –  return the user's cart object
export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("cartData");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ cartData: user.cartData || {} });
    } catch (error) {
        return res.status(500).json({ message: `getCart error: ${error.message}` });
    }
};

// POST /api/cart/add  –  add or increment an item
// body: { itemId, size, quantity? }
export const addToCart = async (req, res) => {
    try {
        const { itemId, size, quantity = 1 } = req.body;
        if (!itemId || !size) {
            return res.status(400).json({ message: "itemId and size are required" });
        }

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        let cartData = { ...user.cartData };

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;

        user.cartData = cartData;
        user.markModified("cartData");
        await user.save();

        return res.status(200).json({ message: "Item added to cart", cartData });
    } catch (error) {
        return res.status(500).json({ message: `addToCart error: ${error.message}` });
    }
};

// PUT /api/cart/update  –  set exact quantity for an item+size
// body: { itemId, size, quantity }
export const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        if (!itemId || !size || quantity === undefined) {
            return res.status(400).json({ message: "itemId, size, and quantity are required" });
        }

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        let cartData = { ...user.cartData };

        if (quantity <= 0) {
            // Remove this size entry
            if (cartData[itemId]) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            if (!cartData[itemId]) cartData[itemId] = {};
            cartData[itemId][size] = quantity;
        }

        user.cartData = cartData;
        user.markModified("cartData");
        await user.save();

        return res.status(200).json({ message: "Cart updated", cartData });
    } catch (error) {
        return res.status(500).json({ message: `updateCart error: ${error.message}` });
    }
};

// POST /api/cart/merge  –  merge guest cart into server cart (used on login)
// body: { guestCart: { [itemId]: { [size]: qty } } }
export const mergeCart = async (req, res) => {
    try {
        const { guestCart } = req.body;
        if (!guestCart || typeof guestCart !== "object") {
            return res.status(400).json({ message: "guestCart object is required" });
        }

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        let cartData = { ...user.cartData };

        // Merge: for each guest item, keep the higher quantity
        for (const itemId in guestCart) {
            if (!cartData[itemId]) cartData[itemId] = {};
            for (const size in guestCart[itemId]) {
                const guestQty = guestCart[itemId][size] || 0;
                const serverQty = cartData[itemId][size] || 0;
                cartData[itemId][size] = Math.max(guestQty, serverQty);
            }
        }

        user.cartData = cartData;
        user.markModified("cartData");
        await user.save();

        return res.status(200).json({ message: "Cart merged", cartData });
    } catch (error) {
        return res.status(500).json({ message: `mergeCart error: ${error.message}` });
    }
};
