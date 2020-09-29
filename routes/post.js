const { Router } = require("express");
const Post = require("../models/post");
const auth = require("../middleware/auth");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title.trim() || !description.trim()) {
      res.status(500).json({ message: "Field is empty" });
    }

    const post = new Post({
      title,
      description,
      user: req.user.userId,
    });

    await post.save();

    res.status(201).json({ post });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });
    console.log({ posts });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
