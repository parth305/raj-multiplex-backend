import express from "express";
import authRoute from "./auth";
import userRoute from "./user"
import upcomingmovieRoute from "./upcomingMovies"
const route = express.Router()

route.use("/auth", authRoute)
route.use("/user", userRoute)
route.use("/upcomingmovies",upcomingmovieRoute)

export default route