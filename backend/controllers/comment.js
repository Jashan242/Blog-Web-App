const Comment=require('../models/comment');

exports.createComment=async(req, res)=>{
    try{
        const userId=req.user.id;
        console.log(req.userId);
        const {desc,postId}=req.body;

        const comment=new Comment({desc,
            post: postId, 
            user: userId
        });
        await comment.save();
        console.log(comment);
        res.status(201).json(comment);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

exports.getComment=async(req, res)=>{
    try{
        const comments=await Comment.find({post:req.params.id}).populate('user', 'username');
        res.json(comments);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}