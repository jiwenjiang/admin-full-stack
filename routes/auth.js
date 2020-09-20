const { Router } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = Router();

// /api/auth/signup
router.post(
  "/signup",

  [
    check("email", "Wrong email").isEmail(),
    check("password", "Wrong password").isLength({ min: 6 }),
  ],

  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({
          errors: error.array(),
          message: "Wrong data for register",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Such user already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User successfully created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong " });
    }
  }
);

// /api/auth/signin
router.post(
  "/signin",

  [
    check("email", "Enter valid email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],

  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({
          errors: error.array(),
          message: "Wrong data for login",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong " });
    }
  }
);

module.exports = router;
