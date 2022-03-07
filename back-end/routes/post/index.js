const { verifyToken } = require("../../controller/authenticate")
const route = require("express").Router()
const { createPost, uploadMedia } = require("../../controller/post")

route.use("/", verifyToken)
route.route("/").post(uploadMedia, createPost)

module.exports = route
