import mongoose from "mongoose"
import dotenv from "dotenv"
const connectMongo = async () => {
    try {
        dotenv.config()
        // await mongoose.connect(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected Successfully")
    }
    catch (e) {
        console.log("Something went wrong")
        console.log(e.message)
    }
}

export default connectMongo