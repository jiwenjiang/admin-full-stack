const { Router } = require("express");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { userTypeEnum } = require("../const");
const { check, validationResult } = require("express-validator");
const router = Router();

// /api/auth/regist
router.post(
  "/regist",

  [check("password", "Wrong password").isLength({ min: 6 })],

  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(200).json({
          errors: error.array(),
          message: "参数错误",
          status: 400,
          data: null,
        });
      }

      const { userName, password } = req.body;

      const candidate = await User.findOne({ userName });

      if (candidate) {
        return res
          .status(200)
          .json({ message: "用户已存在", status: 400, data: null });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ ...req.body, password: hashedPassword });
      await user.save();
      if (req.body.type === userTypeEnum.DOCTOR) {
        const doctor = new Doctor({ userId: user._id, ...req.body.doctor });
        await doctor.save();
      }

      res.status(200).json({ message: "注册成功", status: 200, data: null });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
);

router.post(
  "/login",

  [check("password", "Enter password").exists()],

  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({
          errors: error.array(),
          message: "Wrong data for login",
        });
      }

      const { userName, password } = req.body;

      const user = await User.findOne({ userName });

      if (!user) {
        return res
          .status(200)
          .json({ message: "用户名或密码错误", status: 400, data: null });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(200)
          .json({ message: "用户名或密码错误", status: 400, data: null });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "3h",
      });

      res
        .status(200)
        .json({ message: "登录成功", status: 200, data: { token } });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong " });
    }
  }
);

module.exports = router;
