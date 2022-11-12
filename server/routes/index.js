import express from "express";
import authRoute from "./auth";
import userRoute from "./user"
import movieRoute from "./movie"
const route = express.Router()

route.use("/auth", authRoute)
route.use("/user", userRoute)
route.use("/movie", movieRoute)

export default route