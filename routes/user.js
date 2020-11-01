const { Router } = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = Router();
const { queryObj } = require("../utils");

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
    const { current = 1, pageSize = 10 } = req.query;
    const pageParams = {
      page: current,
      limit: pageSize,
      sort: {
        createdAt: -1,
      },
    };
    const data = await User.paginate(
      queryObj(["userName"], req.query),
      pageParams
    );

    res.status(200).json({ message: "获取用户列表", status: 200, data });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
