const route = require("express").Router()

const { verifyToken } = require("../../controller/authenticate")
const {
  CreateUser,
  GetUser,
  UpdateUser,
  DeleteUser,
} = require("../../controller/User")

route.route("/").post(CreateUser)
route.use("/:uid", verifyToken)
route.route("/:uid").get(GetUser).put(UpdateUser).delete(DeleteUser)

module.exports = route
