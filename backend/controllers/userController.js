import User from '../models/userModel.js';

//? Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';

//? @desc - Auth User and get request
//? @route - POST api/users/login
//? @access - Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    console.log(user);
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

//? @desc - register new user
//? @route - POST api/users
//? @access - Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already there!');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
  else{
    res.status(400)
    throw new Error('Invalid data for user ')
  }
});

//? @desc - get user profile
//? @route - POST api/users/profile
//? @access - Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //? this req.user field comes from the protect controller
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//? @desc - update user profile
//? @route - PUT /api/users/profile
//? @access - Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //? this req.user field comes from the protect controller
  if (user) {
   user.name =  req.body.name || user.name 
   user.email = req.body.email || user.email
   if(req.body.password)  user.password = req.body.password
   const updatedUser = await user.save();

   res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export { authUser, getUserProfile ,registerUser , updateUserProfile};
