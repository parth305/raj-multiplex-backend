import User from "../../models/User";
import md5 from "md5";
import sendMail from "../../services/sendMail";
import { RESPONSE_CODES } from "../../services/constants";

const showUser = async (req, res) => {
    try {
        const users = await User.find({ verify: true })
        res.json({ response: true, status: RESPONSE_CODES.OK, users: users })
    }
    catch (e) {
        console.log("Can not create user due to,",e);
        res.json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const addUser = async (req, res) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000)
        let reqObj = req.body
        reqObj["password"] = md5(req.body.password)
        reqObj["otp"] = otp

        let user = await User.findOne({ email: req.body.email, verify: false })

        if (user) {
            user = await User.findByIdAndUpdate(user._id, reqObj, { runValidators: true, new: true })
            await sendMail(req.body.email, "Verify Email Raj multiplex", `<h4>Your OTP is</h4> <h2>${otp}</h2>`)
            res.json({ response: true, status: RESPONSE_CODES.OK, user: user })
        }

        else {
            // const otp = Math.floor(1000 + Math.random() * 9000)
            // let reqObj = req.body
            // reqObj["password"] = md5(req.body.password)
            // reqObj["otp"] = otp
            let user = await User.create(reqObj)
            await sendMail(req.body.email, "Verify Email Raj multiplex", `<h4>Your OTP is</h4> <h2>${otp}</h2>`)
            res.json({ response: true, status: RESPONSE_CODES.CREATED, user: user })
        }
    }

    catch (err) {
        console.log(err)
        res.json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        let reqObj = req.body
        if (req.body.password) {

            reqObj["password"] = md5(req.body.password)
        }
        const user = await User.findByIdAndUpdate(req.params.id, reqObj, { runValidators: true, new: true })
        res.json({ response: true, status: RESPONSE_CODES.OK, user: user })
    }
    catch (err) {
        res.json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const updateUserPassword = async (req, res) => {
    try {
        let reqObj = req.body
        reqObj["password"] = md5(req.body.password)
        const user = await User.findByIdAndUpdate(req.params.id, reqObj, { runValidators: true, new: true })
        res.json({ response: true, status: RESPONSE_CODES.UPDATED, user: user })
    }
    catch (err) {
        res.json({ response: false, status: RESPONSE_CODES.BAD_REQUEST, error: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        res.json({ response: true, status: RESPONSE_CODES.OK, user: user })
    }
    catch (err) {
        res.json({ response: false, status: res.statusCode, error: err.message })
    }
}


export default {
    showUser: showUser,
    addUser: addUser,
    updateUser: updateUser,
    updateUserPassword: updateUserPassword,
    deleteUser: deleteUser
}