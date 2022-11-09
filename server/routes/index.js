import express from "express";
import authRoute from "./auth";
import userRoute from "./user"
const route = express.Router()

route.use("/auth", authRoute)
route.use("/user", userRoute)

export default route