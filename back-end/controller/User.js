const UserModel = require("../model/User")
const jwt = require("jsonwebtoken")

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

exports.UpdateUser = async function (req, res) {
  res.send("Update")
}

exports.DeleteUser = async function (req, res) {
  res.send("Delete")
}
