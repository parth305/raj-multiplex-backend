import User from "../../models/User";
import md5 from "md5";
import sendMail from "../../services/sendMail";
import { RESPONSE_CODES } from "../../services/constants";
import UserOtp from "../../models/UserOtp";

const showUser = async (req, res) => {
    try {
        const users = await User.find({ verify: true })
        res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, users: users })
    }
    catch (e) {
        console.log("Can not create user due to,", e);
        res.staus(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const addUser = async (req, res) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000)
        let reqObj = req.body
        reqObj["password"] = md5(req.body.password)
        // reqObj["otp"] = otp

        let user = await User.findOne({ email: req.body.email, verify: false })

        if (user) {
            user = await User.findByIdAndUpdate(user._id, reqObj, { runValidators: true, new: true })

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

        else {
            // const otp = Math.floor(1000 + Math.random() * 9000)
            // let reqObj = req.body
            // reqObj["password"] = md5(req.body.password)
            // reqObj["otp"] = otp
            let user = await User.create(reqObj)

            let otpObj = { userId: user._id, otp: otp, generatedTime: Date.now() }
            await UserOtp.create(otpObj)

            await sendMail(req.body.email, "Verify Email Raj multiplex", `<h4>Your OTP is</h4> <h2>${otp}</h2>`)
            res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: user })
        }
    }

    catch (err) {
        console.log(err)
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        let reqObj = req.body
        if (req.body.password) {

            reqObj["password"] = md5(req.body.password)
        }
        const user = await User.findByIdAndUpdate(req.params.id, reqObj, { runValidators: true, new: true })
        if (user) {
            res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: user })
        }
        else {
            res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: res.statusCode, error: "Invalid userId" })
        }
    }
    catch (err) {
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const updateUserPassword = async (req, res) => {
    try {
        let reqObj = req.body
        reqObj["password"] = md5(req.body.password)
        const user = await User.findByIdAndUpdate(req.params.id, reqObj, { runValidators: true, new: true })
        if (user) {
            res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: user })
        }
        else {
            res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: res.statusCode, error: "Invalid userId" })
        }
    }
    catch (err) {
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        if (user) {
            res.status(RESPONSE_CODES.OK).json({ response: true, status: RESPONSE_CODES.OK, user: user })
        }
        else {
            res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: res.statusCode, error: "Invalid userId" })
        }

    }
    catch (err) {
        res.status(RESPONSE_CODES.BAD_REQUEST).json({ response: false, status: res.statusCode, error: err.message })
    }
}


export default {
    showUser: showUser,
    addUser: addUser,
    updateUser: updateUser,
    updateUserPassword: updateUserPassword,
    deleteUser: deleteUser
}