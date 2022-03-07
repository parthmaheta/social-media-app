const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "./../.env" })

exports.verifyToken = function (req, res, next) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      function (err, token) {
        if (err) return res.status(401).send("Unauthorized")

        next()
      }
    )
  } else {
    res.status(401).send("Unauthorized")
  }
}
