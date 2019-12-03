const Post = require("../models/posts.model");
const Image = require("../models/image.model");
const mongoose = require("mongoose");

//get all posts from mongodb
exports.getallposts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(error => {
      res.status(400).send({ error: "Error while getting posts" });
    });
};
//save posts in mongodb
exports.save = function(req, res) {
  const body = req.body.body;
  const likecount = Number(req.body.likecount);
  const commentcount = Number(req.body.commentcount);
  const userid = req.body.userid;
  const status = true;

  Image.findOne({ userName: userid })
    .exec()
    .then(async function(imageinfo) {
      if (imageinfo !== null) {
        const userimage = imageinfo.image;
        const newpost = new Post({
          body,
          likecount,
          commentcount,
          userid,
          userimage,
          status
        });
        const posts = await newpost.save();
        return [imageinfo, posts];
      } else {
        res.status(400).send({
          err:
            "No profile image exists for the user.Please update the profile image and try again."
        });
      }
    })
    .then(function(result) {
      if (result[1] !== null) res.status(200).json(result[1]);
    })
    .catch(err => {
      res.status(400).send({ err: "Error while adding posts" });
    });
};

// Getting posts of the logged in user
exports.getMyPosts = (req, res) => {
  let userName = req.body.username;
  Post.find({ userid: req.body.username })
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(error => {
      console.log(error);
      res.status(400).send({ error: "Error while getting personal posts" });
    });
};

// Deleting the post selected by logged in user
exports.deleteSelectedPost = (req, res) => {
  let id = mongoose.Types.ObjectId(req.query.postId);

  Post.findByIdAndDelete({ _id: id })
    .then(availablePosts => {
      Post.find({ userid: availablePosts.userid })
        .sort({ createdAt: -1 })
        .then(posts => {
          res.json(posts);
        });
    })
    .catch(error => {
      res.status(400).send({ error: "Error in deleting post" });
    });
};
exports.likepost = async (req, res) => {
  let postid = req.body._id;
  let likecount = req.body.likecount;
  post.findOneAndUpdate(
    { _id: postid },
    { $set: { likecount: likecount } },
    { upsert: true },
    function(err, doc) {
      if (err) {
        throw err;
      } else {
        res.status(200).json({ likecount: "like updated" });
      }
    }
  );
};
