import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    // otp: {
    //     type: Number
    // },
    // varify: {
    //     type: Boolean,
    //     default: false
    // }
})

const User = mongoose.model("user", userSchema)

export default User