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
      return res.send({
        status: 1,
        message: "Login Successful",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.send({ status: 0, message: "Invalid email or Password" });
    }
  } else {
    return res.send({ status: 0, message: "No User found" });
  }
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
const logoutUser = (req, res) => {
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

// endPoint: /api/users/update
const updateUserData = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user && (await bcrypt.compare(req.body.cupassword, user.password))) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const result = await User.findByIdAndUpdate(user._id, {
      name: req.body.name || user.name,
      email: req.body.email,
      password: hashedPassword,
    });

    if (result) {
      return res.send({
        status: true,
        message:
          "User details updated successfully, you'll redirected to login",
      });
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.json({ status: false, message: "Current password is invalid" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
  updateUserData,
};
