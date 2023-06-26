const express = require("express");
const router = express.Router();
const {
  getUserData,
  loginUser,
  registerUser,
  updateUserData,
} = require("../controllers/userController");
const protected = require("../config/authMiddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/userdata", protected, getUserData);
router.post("/updatedata", protected, updateUserData);

module.exports = router;
