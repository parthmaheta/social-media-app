const router = require("express").Router()
const { verifyToken } = require("../../controller/authenticate")
const {
  showAllFriends,
  searchFriend,
  showFriendDetail,
} = require("../../controller/friend")

router.use("/", verifyToken)
router.route("/").get(showAllFriends, searchFriend)
router.get("/:uid", showFriendDetail)

module.exports = router
