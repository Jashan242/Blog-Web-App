const express=require('express');
const { register, login, getUserDetails, editUserDetails, getSavedPosts, getUserPosts, resetOtp, resetPassword } = require('../controllers/user');
const { userAuth } = require('../middleware/auth');

const router=express.Router();

const multer = require('multer');

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 50 * 1024 * 1024, // 50mb size limit
  }
}).single("image");



router.post('/register', upload, register);
router.post('/login', login);
router.get('/', userAuth, getUserDetails);
router.put('/edit', userAuth, editUserDetails);
router.get('/savedPosts', userAuth, getSavedPosts);
router.get('/posts', userAuth, getUserPosts);
router.post('/reset-otp', resetOtp);
router.post('/reset-password', resetPassword);

module.exports=router;