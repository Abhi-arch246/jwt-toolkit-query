const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// endPoint: /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
};

// endPoint: /api/users/register
const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.send({ message: "User with this email already exists" });
  } else {
    try {
      const salt = await bcrypt.genSalt(13);
      const hashedPassword = await bcrypt.hash(password, salt);
      const response = await User.create({
        email,
        name,
        password: hashedPassword,
      });
      if (response)
        return res.send({ message: "User registered successfully" });
      else return res.send({ message: "User registration failed" });
    } catch (error) {
      console.log(error);
    }
  }
};

// endPoint: /api/users/logout
const logoutUser = async (req, res) => {
  res.json({ message: "Logout user" });
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
