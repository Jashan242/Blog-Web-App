const express=require('express');
const { createComment, getComment } = require('../controllers/comment');
const { userAuth } = require('../middleware/auth');

const router=express.Router();

router.post('/create', userAuth, createComment);
router.get('/:id', getComment);
module.exports=router;