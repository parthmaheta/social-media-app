const multer = require("multer")
const Post = require("./../model/Post")
const jwt = require("jsonwebtoken")
const UserModel = require("../model/User")

exports.createPost = function (req, res) {
    const { id } = jwt.decode(req.headers.authorization)
  const post = new Post()
  if (req.file) post.media = req.file.filename
  if (req.body.postText) post.caption = req.body.postText
  
  post.save(function (err, post) {
    if (err) return res.status(500).send(err)
    UserModel.findById(id).then(user => {
        user.posts.push(post)
        user.save().then(user=>res.send("done")).catch(err=>{return res.status(500).send(err)})
    })
  })
}

const storage = multer.diskStorage({
  destination: "static/user",
  filename: function (req, file, cb) {
    cb(null, Date.now() + require("path").extname(file.originalname))
  },
})
exports.uploadMedia = multer({ storage }).single("media")
