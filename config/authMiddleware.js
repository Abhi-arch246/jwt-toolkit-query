const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protected = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      throw new Error("Not authorized, invalid token");
    }
  } else {
    throw new Error("Not authorized, no token");
  }
};

module.exports = protected;
