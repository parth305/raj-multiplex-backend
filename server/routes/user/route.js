import express from "express"
import controller from "./controller"
import auth from "../../services/auth"

const route = express.Router()

route.post("/",controller.addUser)
route.get("/", auth, controller.showUser)
route.put("/:id", auth, controller.updateUser)
route.delete("/:id", auth, controller.deleteUser)

export default route