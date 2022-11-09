import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv"

dotenv.config()

const auth = async (req, res, next) => {
    try {
        const decodedUser = jwt.verify(req.headers.authorization, process.env.secretKey)
        const validUser = await User.findById(decodedUser.user._id)
        if (validUser) {
            next()
        }
        else {
            res.json({ response: false, status: res.statusCode, error: "Invalid authorization" })
        }
    }
    catch (e) {
        res.json({ response: false, status: res.statusCode, error: "Invalid authorization" })
    }
}

export default auth