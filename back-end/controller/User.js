const UserModel = require("../model/User")
const jwt = require("jsonwebtoken")
const multer = require("multer")

//Validate User Input and Create User IF email does not exist in database
exports.CreateUser = async function (req, res) {
  try {
    await UserModel.validate(req.body)
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      return res.status(401).send({ error: "User already exists" })
    } else {
      await UserModel.create(req.body)

      res.status(200).send({ status: "ok" })
    }
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.GetUser = async function (req, res) {
  if (req.headers.authorization) {
    try {
      const id = jwt.decode(req.headers.authorization).id
      const user = await UserModel.findById(id, {
        name: 1,
        profilePic: 1,
        dob: 1,
        gender: 1,
      })
      console.log(user)
      if (user) return res.status(200).send(user)
    } catch (e) {
      return res.status(401).send({ error: "Unauthorized" })
    }
  }

  return res.status(401).send({ error: "Unauthorized" })
}

const storage = multer.diskStorage({
  destination: "static/user",
  filename: function (req, file, cb) {
    cb(null, Date.now() + require("path").extname(file.originalname))
  },
})

exports.updateProfile = multer({ storage }).single("profilePic")

exports.updateDetails = async function (req, res) {
  try {
    const id = jwt.decode(req.headers.authorization).id
    const user = await UserModel.findById(id)
    if (user) {
      user.name = req.body.name
      user.dob = req.body.dob
      user.gender = req.body.gender
      if (req.file) user.profilePic = "user/" + req.file.filename

      await user.save()

      return res
        .status(200)
        .json({
          name: user.name,
          dob: user.dob,
          gender: user.gender,
          profilePic: user.profilePic,
        })
    }
  } catch (e) {
    return res.status(500).send()
  }
}
