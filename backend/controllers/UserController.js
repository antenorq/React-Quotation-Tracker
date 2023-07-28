const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtSecret = process.env.JWT_SECRET;

//Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// REGISTER USER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exists
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["This email already exist"] });
    return;
  }

  //Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //Create User
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // If Something went wrong return error
  if (!newUser) {
    res.status(422).json({ errors: ["Something went wrong, try again later"] });
  }

  // If use was created successfully, return the token
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//SIGN IN
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check if user exists
  if (!user) {
    res.status(404).json({ errors: ["User not exists"] });
    return;
  }

  //check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Invalid password"] });
    return;
  }

  //return user with token
  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

//GET CURRENT LOGGED IN USER
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

//UPDATE AN USER
const update = async (req, res) => {
  const { name, email, password } = req.body;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id).select("-password");

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  if (password) {
    //Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  await user.save();

  res.status(200).json(user);
};

//GET USER BY ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    //check if user exists
    if (!user) {
      res.status(404).json({ errors: ["User not exist"] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["User not exist"] });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
