const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// endPoint: /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id);
      return res.send({ status: 1, message: "Login Successful" });
    }
  } else return res.send({ status: 0, message: "Invalid email or Password" });
};

// endPoint: /api/users/register
const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.send({
      status: 0,
      message: "User with this email already exists",
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(13);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        email,
        name,
        password: hashedPassword,
      });
      if (user) {
        generateToken(res, user._id);
        return res.send({ status: 1, message: "User registered successfully" });
      } else
        return res.send({ status: 0, message: "User registration failed" });
    } catch (error) {
      console.log(error);
    }
  }
};

// endPoint: /api/users/logout
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Logged out" });
};

// endPoint: /api/users/userdata
const getUserData = async (req, res) => {
  res.json({ message: "User data fetched" });
};

// endPoint: /api/users/updatedata
const updateUserData = async (req, res) => {
  res.json({ message: "User data updated" });
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
  updateUserData,
};
