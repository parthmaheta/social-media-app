const route = require("express").Router()

const { verifyToken } = require("../../controller/authenticate")
const {
  CreateUser,
  GetUser,
  UpdateUser,
  DeleteUser,
} = require("../../controller/User")

route.route("/").get(GetUser).post(CreateUser)
route.use("/:uid", verifyToken)

module.exports = route
