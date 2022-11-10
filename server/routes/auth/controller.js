import User from "../../models/User";
import jwt from "jsonwebtoken";
import md5 from "md5";
import dotenv from "dotenv"
import sendMail from "../../services/sendMail";
import {RESPONSE_CODES} from '../../services/constants'

dotenv.config();

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email, verify: true })
        // const user = await User.findOne({ email: email })
        if (user.password == md5(password)) {
            const token = jwt.sign({ user: user }, process.env.secretKey, { expiresIn: "2h" })
            res.json({ response: true, status: RESPONSE_CODES.OK, user: user, token: token })
        }
        else {
            res.json({ response: false, status: RESPONSE_CODES.UNAUTHORISED, error: "Invalid password" })
        }
    }
    catch (err) {
        // console.log(err)
        res.json({ response: false, status:RESPONSE_CODES.BAD_REQUEST, error: "Invalid email Id or password" })
    }
}

const authEmail = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        // console.log("===============", user)
        if (user) {
            if (user.otp == req.body.otp) {
                user = await User.findByIdAndUpdate(user._id, { verify: true }, { runValidators: true, new: true })
                res.json({ response: true, status: RESPONSE_CODES.OK, user: user })
            }
            else {
                res.json({ response: false, status: RESPONSE_CODES.UNAUTHORISED, error: "Invalid OTP" })
            }
        }
        else {
            res.json({ response: false, status: RESPONSE_CODES.RESOURCE_NOT_FOUND, error: "Invalid email Id from else" })

        }
    }
    catch (err) {
        res.json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: "Invalid email Id" })
    }
}

const forgetPassword = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, verify: true })
        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000)
            user = await User.findByIdAndUpdate(user._id, { otp: otp }, { runValidators: true, new: true })
            await sendMail(req.body.email, "Verify Email Raj multiplex", `<div><h4>Your OTP is</h4> <h2>${otp}</h2></div>`)
            res.json({ response: true, status: RESPONSE_CODES.OK, user: user })
        }
    }
    catch (err) {
        res.json({ response: false, status: RESPONSE_CODES.BAD_REQUEST,message: "Invalid email Id" })
    }
}

export default {
    authUser: authUser,
    authEmail: authEmail,
    forgetPassword: forgetPassword
}