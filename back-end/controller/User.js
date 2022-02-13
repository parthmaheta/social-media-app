const UserModel = require("../model/User")

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
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      res.send(user)
    } else {
      res.json("User not found")
    }
  } catch (err) {
    res.send(err)
  }
}


exports.UpdateUser = async function (req, res) {
  res.send("Update")
}

exports.DeleteUser = async function (req, res) {
  res.send("Delete")
}
