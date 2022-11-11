import express from "express"
import controller from "./controller"

const route = express.Router()

route.post("/token",controller.authToken)
route.post("/login",controller.authUser)
route.put("/email",controller.authEmail)
route.put("/forget",controller.forgetPassword)


export default route