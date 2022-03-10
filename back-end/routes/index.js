const router = require("express").Router()

router.use("/login", require("./login"))
router.use("/user", require("./user"))
router.use("/post", require("./post"))
router.use("/friend", require("./friend"))

module.exports = router
