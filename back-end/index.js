const express = require("express")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 4011
app.listen(PORT, () => {
  console.log("Hellow App Is Running On Port", PORT)
})
