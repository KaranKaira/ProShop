import express from 'express';
const router = express.Router();

//?controllers method
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);
//? because profile is a protected route so u should be authorized to see that route ,
//?so protect middleware runs before getUserProfile and verifies if u are authorized or not.
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
