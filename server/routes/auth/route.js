import express from "express"
import controller from "./controller"

const route = express.Router()

route.post("/login",controller.authUser)
route.post("/email",controller.authEmail)


export default route