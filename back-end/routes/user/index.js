const route = require("express").Router()

const { verifyToken } = require("../../controller/authenticate")
const {
  CreateUser,
  GetUser,
  updateProfile,
  updateDetails,
} = require("../../controller/User")

route
  .route("/")
  .get(verifyToken, GetUser)
  .post(CreateUser)
  .put(verifyToken, updateProfile, updateDetails)
route.use("/:uid", verifyToken)

module.exports = route
