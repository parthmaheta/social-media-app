const User = require("./../model/User")

exports.showAllFriends = async function (req, res, next) {
  if (req.query.search) next()
  else {
    return res.status(200).json([])
  }
}

exports.searchFriend = async function (req, res) {
  try {
    const users = await User.find(
      {
        name: { $regex: req.query.search, $options: "i" },
      },
      { _id: 1, name: 1, profilePic: 1 }
    )
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
}

exports.showFriendDetail = async function (req, res) {
  res.send(res.params.uid)
}
