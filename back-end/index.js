const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db")
require("dotenv").config()

const PORT = process.env.PORT || 4011

app.use(cors({ exposedHeaders: "Authorization" }))
app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hellow")
})

app.use("/api", require("./routes"))

db.on("error", () => {
  console.log("Cant Connect To Database")
})
db.once("open", () => {
  console.log("Connected Successfully")
  app.listen(PORT, () => {
    console.log("App Is Running On", PORT)
  })
})
