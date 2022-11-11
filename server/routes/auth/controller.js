import User from "../../models/User";
import jwt from "jsonwebtoken";
import md5 from "md5";
import dotenv from "dotenv"
import sendMail from "../../services/sendMail";
import { RESPONSE_CODES } from '../../services/constants'
import UserOtp from "../../models/UserOtp";

dotenv.config();

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email, verify: true })
        // const user = await User.findOne({ email: email })
        if (user.password == md5(password)) {
            const token = jwt.sign({ user: user }, process.env.secretKey, { expiresIn: "2h" })
            res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: user, token: token })
        }
        else {
            res.status(RESPONSE_CODES.UNAUTHORISED).json({ response: false, status: RESPONSE_CODES.UNAUTHORISED, error: "Invalid password" })
        }
    }
    catch (err) {
        // console.log(err)
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: "Invalid email Id or password" })
    }
}

const authEmail = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        // console.log("===============", user)
        if (user) {
            let userOtp = await UserOtp.findOne({ userId: user._id })
            if (userOtp && userOtp.otp == req.body.otp) {
                user = await User.findByIdAndUpdate(user._id, { verify: true }, { runValidators: true, new: true })
                const token = jwt.sign({ user: user }, process.env.secretKey, { expiresIn: "2h" })
                res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: user, token: token })
            }
            else {
                res.status(RESPONSE_CODES.UNAUTHORISED).json({ response: false, status: RESPONSE_CODES.UNAUTHORISED, error: "Invalid OTP or OTP is expired" })
            }
        }
        else {
            res.status(RESPONSE_CODES.RESOURCE_NOT_FOUND).json({ response: false, status: RESPONSE_CODES.RESOURCE_NOT_FOUND, error: "Invalid email Id from else" })

        }
    }
    catch (err) {
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: "Invalid email Id" })
    }
}

const forgetPassword = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, verify: true })
        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000)
            // user = await User.findByIdAndUpdate(user._id, { otp: otp }, { runValidators: true, new: true })
            let otpObj = { userId: user._id, otp: otp, generatedTime: Date.now() }
            let userOtp = await UserOtp.findOne({ userId: user._id })
            if (userOtp) {
                await UserOtp.findByIdAndUpdate(userOtp._id, otpObj, { runValidators: true, new: true })
            }
            else {
                await UserOtp.create(otpObj)
            }

            await sendMail(req.body.email, "Verify Email Raj multiplex", `<h4>Your OTP is</h4> <h2>${otp}</h2>`)
            res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: user })
        }
    }
    catch (err) {
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, message: "Invalid email Id" })
    }
}

const authToken = async (req, res) => {
    try {
        const decodedUser = jwt.verify(req.body.token, process.env.secretKey)
        const validUser = await User.findOne({ _id: decodedUser.user._id, verify: true })
        if (validUser) {
            // console.log("==================== valid user")
            res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: validUser })
        }
        else {
            res.json({ response: false, status: res.statusCode, error: "Invalid authorization" })
        }
    }
    catch (e) {
        res.json({ response: false, status: res.statusCode, error: "Invalid authorization" })
    }
}

export default {
    authUser: authUser,
    authEmail: authEmail,
    forgetPassword: forgetPassword,
    authToken: authToken,
}