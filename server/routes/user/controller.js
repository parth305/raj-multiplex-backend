import User from "../../models/User";
import md5 from "md5";
import sendMail from "../../services/sendMail";

const showUser = async (req, res) => {
    try {
        const users = await User.find({ varify: true })
        res.json({ response: true, status: res.statusCode, users: users })
    }
    catch (e) {
        res.json({ response: false, status: res.statusCode, error: err.message })
    }
}

const addUser = async (req, res) => {
    try {
        // const otp = Math.floor(1000 + Math.random() * 9000)
        let reqObj = req.body
        reqObj["password"] = md5(req.body.password)
        // reqObj["otp"] = otp
        const user = await User.create(reqObj)
        // sendMail(req.body.email, "varify email", `Your OTP is  ${otp}`)
        res.json({ response: true, status: res.statusCode, user: user })
    }
    catch (err) {
        console.log(err)
        res.json({ response: false, status: res.statusCode, error: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        let reqObj = req.body
        if(req.body.password){
            reqObj["password"] = md5(req.body.password)
        }
        const user = await User.findByIdAndUpdate(req.params.id, reqObj, { runValidators: true, new: true })
        res.json({ response: true, status: res.statusCode, user: user })
    }
    catch (err) {
        res.json({ response: false, status: res.statusCode, error: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        res.json({ response: true, status: res.statusCode, user: user })
    }
    catch (err) {
        res.json({ response: false, status: res.statusCode, error: err.message })
    }
}


export default {
    showUser: showUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}