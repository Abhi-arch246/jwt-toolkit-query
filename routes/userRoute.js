const express = require("express");
const router = express.Router();
const {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserData,
} = require("../controllers/userController");
const protected = require("../config/authMiddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/userdata", protected, getUserData);
router.put("/update", protected, updateUserData);

module.exports = router;
