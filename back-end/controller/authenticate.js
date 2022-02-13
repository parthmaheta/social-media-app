const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "./../.env" })

exports.createToken = function (req, res, next) {
    res.header("authorization", jwt.sign({email:req.body.email}, process.env.JWT_SECRET))
}

exports.verifyToken = function (req, res, next) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      function (err, token) {
        if (err) res.send("403 ")
        else next()
      }
    )
  } else {
    res.send("403 ")    
  }
}
