const { Router } = require("express");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const auth = require("../middleware/auth");
const router = Router();
const { queryObj } = require("../utils");
const { userTypeEnum } = require("../const");

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

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id).exec();
    if (data.type === userTypeEnum.DOCTOR) {
      const docData = await Doctor.findOne({ userId: data._id }).exec();
      data.set("doctor", docData.toJSON(), { strict: false });
    }
    res.status(200).json({ message: "获取用户详情", status: 200, data });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body);
    if (req.body.type === userTypeEnum.DOCTOR) {
      await Doctor.findOneAndUpdate({ userId: id }, req.body.doctor);
    }
    res.status(200).json({ message: "更新成功", status: 200, data: null });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "删除成功", status: 200, data: null });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
