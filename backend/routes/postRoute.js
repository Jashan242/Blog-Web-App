const express=require('express');
const { getAllPost, createPost, getPostById, deletePost, featuredPost, postByCategory, savePost } = require('../controllers/post');
const { userAuth } = require('../middleware/auth');
const router=express.Router();

const multer = require('multer');

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 50 * 1024 * 1024, // 50mb size limit
  }
}).single("image");



router.get('/', getAllPost);
router.post('/', userAuth, upload, createPost);
router.get('/singlePost/:id', getPostById);
router.delete('/:id',userAuth, deletePost);
router.get('/featured', featuredPost);
router.get('/:category', postByCategory);
router.post('/save/:id', userAuth, savePost);

module.exports=router;