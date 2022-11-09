import User from "../../models/User";
import jwt from "jsonwebtoken";
import md5 from "md5";
import dotenv from "dotenv"
dotenv.config();
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body
        // const user = await User.findOne({ email: email, varify: true })
        const user = await User.findOne({ email: email })
        if (user.password == md5(password)) {
            const token = jwt.sign({ user: user }, process.env.secretKey, { expiresIn: "2h" })
            res.json({ response: true, status: res.statusCode, user: user, token: token })
        }
        else {
            res.json({ response: false, status: res.statusCode, error: "Invalid password" })
        }
    }
    catch (err) {
        // console.log(err)
        res.json({ response: false, status: res.statusCode, error: "Invalid email Id or password" })
    }
}

const authEmail = async (req, res) => {
    try {
        let user = User.findOne({ email: req.body.email, varify: false })
        if (user) {
            if (user.otp == req.body.otp) {
                user = await User.findByIdAndUpdate(user._id, { varify: true }, { runValidators: true, new: true })
                res.json({ response: true, status: res.statusCode, user: user })
            }
            else {
                res.json({ response: false, status: res.statusCode, error: "Invalid OTP" })
            }
        }
        else {
            res.json({ response: false, status: res.statusCode, error: "Invalid email Id from else" })

        }
    }
    catch (err) {
        res.json({ response: false, status: res.statusCode, error: "Invalid email Id" })
    }
}

export default {
    authUser: authUser,
    authEmail: authEmail
}