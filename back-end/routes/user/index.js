const route = require("express").Router()

const { verifyToken } = require("../../controller/authenticate")
const {
  CreateUser,
  GetUser,
  updateProfile,
  updateDetails,
} = require("../../controller/User")

route.use("/", verifyToken)
route.route("/").get(GetUser).post(CreateUser).put(updateProfile, updateDetails)
route.use("/:uid", verifyToken)

module.exports = route
