const express = require("express");
const router = express.Router();
const {
  getUserData,
  loginUser,
  registerUser,
  updateUserData,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/userdata", getUserData);
router.post("/updatedata", updateUserData);

module.exports = router;
