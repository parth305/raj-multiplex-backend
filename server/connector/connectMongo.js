import mongoose from "mongoose"
const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb+srv://raj:raj@cluster0.u0p80n7.mongodb.net/multiplex")
        console.log("Connected Successfully")
    }
    catch (e) {
        console.log("Something went wrong")
        console.log(e.message)
    }
}

export default connectMongo