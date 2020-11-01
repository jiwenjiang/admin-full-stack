const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(200)
        .json({ status: 401, data: null, message: "无权限，请重新登录" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded;

    next();
  } catch (e) {
    res
      .status(200)
      .json({ status: 401, data: null, message: "无权限，请重新登录" });
  }
};
