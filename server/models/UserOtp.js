import mongoose from "mongoose";

const userOtpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    generatedTime: {
        type: Date,
        default: Date.now(),
        required: true
    },
    otp: {
        type: String,
        required: true
    }
})

userOtpSchema.index({ generatedTime: 1 }, { expireAfterSeconds: 120 })
const UserOtp= mongoose.model("userOtp", userOtpSchema)
export default UserOtp