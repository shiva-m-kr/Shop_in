import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(400).json({ message: "Not authorised login again" })
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(400).json({
                message: "Not authorised login again, invalid token"
            })
        }
        req.adminEmail = process.env.ADMIN_EMAIL

        next()

    } catch (error) {
        console.log("adminAuth error : ", error)
        return res.status(500).json({ message: `isAuth error ${error}` })
    }
}

export default adminAuth;