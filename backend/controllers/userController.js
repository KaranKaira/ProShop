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

export { authUser, getUserProfile };
