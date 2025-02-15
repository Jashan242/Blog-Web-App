const Post=require('../models/post');
const User = require('../models/user');
const { uploadOnCloudinary } = require("../utils/cloudinary");
exports.getAllPost=async(req, res)=>{
    try{
        const posts=await Post.find().populate('user', 'username');
        res.json(posts);
    }
    catch(err){ 
        res.status(500).json({error:err.message});
    }
}

exports.getPostById=async(req, res)=>{
    const id=req.params.id;
    try{
        const post=await Post.findById(id).populate('user', 'username bio');
        if(!post) return res.status(404).json({message: 'Post not found'});
        console.log(post);
        res.json(post);
    }
    catch(err){ 
        res.status(500).json({error:err.message});
    }
}

exports.createPost = async (req, res) => {
    try {

        const { title, content, category, desc, isFeatured, visit } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        let imageUrl = req.file?.path;
        if(!imageUrl) {
            return res.status(400).json({ error: "Image is required" });
        }
        const cloudinaryResponse = await uploadOnCloudinary(imageUrl);
        if(!cloudinaryResponse){
            return res.status(400).json({ error: "Failed to upload image to Cloudinary" });
        }
    
        imageUrl = cloudinaryResponse.url
        console.log(`Image URLs: ${cloudinaryResponse.url}`);

        const newPost = new Post({
            user: req.user.id,  // Ensure user is authenticated
            img: imageUrl,
            title,
            category,
            desc,
            content,
            isFeatured: isFeatured || false,
            visit: visit || 0,
        });

        const post = await newPost.save();
        // console.log("Post saved successfully:", post);

        res.status(201).json(post);
    } catch (err) {
        // console.error("Error in createPost method:", err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};


exports.deletePost=async(req, res)=>{
    try{
        const userId=req.user.id;
        const postId=req.params.id;
        const post=await Post.findById(postId);
       
        if(!post){
            return res.status(404).json({error:"Post not found"});
        }

        if(post.user.toString()!==userId){
            console.log("unable to delete");
            return res.status(403).json({error:"Unauthorized to delete this post"});
        }

        await Post.findByIdAndDelete(postId);
        res.json({message:"Post deleted successfully"});
    }
    catch(err){
        console.error("❌ Error in deletePost method:", err);
        res.status(500).json({error:err.message});
    }
}

exports.featuredPost=async(require, res)=>{
    try{
        const featuredPost = await Post.find({isFeatured:true}).populate('user', 'username')
        .limit(3);
        console.log(featuredPost);
        res.json({featuredPost});
    }
    catch(err){
        console.error("Error in featuredPost method:", err);
        res.status(500).json({error:err.message});
    }
}

exports.postByCategory=async(req, res)=>{
    try{
        const category=req.params.category;
        const postByCategory = await Post.find({category})
        console.log(postByCategory);
        res.json({postByCategory});
    }
    catch(err){
        console.error("Error in postByCategory method:", err);
        res.status(500).json({error:err.message});
    }
}

exports.savePost=async(req, res)=>{
    try{
        const userId=req.user.id;
        const postId=req.params.id;
        const user=await User.findById(userId);

        if(user.savedPosts.includes(postId)){
            return res.status(400).json({error:"Post already saved"});
        }

        user.savedPosts.push(postId);
        await user.save();

        res.json({message:"Post saved successfully"});
        
    }
    catch(err){
        console.error("Error in savePost method:", err);
        res.status(500).json({error:err.message});
    }
}