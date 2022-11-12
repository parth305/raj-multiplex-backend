import express from "express"
import currentMovieRoute from "./currentMovie";
import upcomingMovieRoute from "./upcomingMovie";



const route = express.Router()

route.use("/current", currentMovieRoute)
route.use("/upcoming", upcomingMovieRoute)

export default route