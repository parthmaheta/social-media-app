const express = require("express")
const app = express()
const db = require("./db")
require("dotenv").config()

const PORT = process.env.PORT || 4011

app.get("/", (req, res) => {
  res.send("Hellow")
})

app.use("/api/", require("./routes/signup"))

db.on("error", () => {
  console.log("Cant Connect To Database")
})
db.once("open", () => {
  console.log("Connected Successfully")
  app.listen(PORT, () => {
    console.log("App Is Running On", PORT)
  })
})
