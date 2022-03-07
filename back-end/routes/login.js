const jwt = require("jsonwebtoken")
const UserModel = require("../model/User")
const bcrypt = require("bcrypt")
const router = require("express").Router()
require("dotenv").config({ path: "../.env" })

router.route("/").post(async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 15 * 60,
        })
        res.header("Authorization", token)
        const { name, dob, profilePic, gender } = user
        return res.status(200).send({ name, dob, profilePic, gender })
      }
      return res.status(401).send({ password: "Invalid Password" })
    } else {
      return res.status(401).send({ email: "No User Found" })
    }
  } catch (error) {
    return res.status(500).send(error)
  }
})

module.exports = router
