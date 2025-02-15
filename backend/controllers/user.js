const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');
const { uploadOnCloudinary } = require("../utils/cloudinary");
const {transporter} = require('../utils/sendEmail.js');

exports.register = async (req, res) => {

    console.log('Request received', req.body);

    const {firstname, lastname, username, email, password, bio}=req.body;

    try{
        const userExists=await User.findOne({email});
        if(userExists) 
            return res.status(400).json({error: 'User already exists'});
        
        if (typeof password !== 'string' || password.trim().length === 0) {
            return res.status(400).json({ error: 'Password is required and must be a string' });
        }
        
        const hashedPassword=await bcrypt.hash(password, 10);

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


        const newUser=new User({
            firstname,
            lastname, 
            username, 
            email, 
            password: hashedPassword, 
            img:imageUrl || '', 
            bio: bio || 'Passionate writer sharing insights, ideas, and experiences to inform and inspire.',});

            const options = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject: "🎉 Welcome to Wordy Vibes – Let Your Thoughts Flow!",
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="color: #007BFF;">Welcome to Wordy Vibes!</h2>
                        <p>Dear ${firstname},</p>
                        <p>We’re thrilled to have you as part of the <strong>Wordy Vibes</strong> community! Your account has been successfully created with the email: <strong>${email}</strong>.</p>
                        
                        <p><strong>What is Wordy Vibes?</strong></p>
                        <p>A space where creativity meets expression! Whether you’re here to read, write, or engage with thought-provoking stories, you’ve found the perfect place.</p>
            
                        <p><strong>What’s Next?</strong></p>
                        <ul>
                            <li>📖 Read our latest blog posts and get inspired.</li>
                            <li>✍️ Start sharing your own stories and ideas.</li>
                        </ul>
            
                        <p>We can't wait to see what you bring to Wordy Vibes. Start exploring today!</p>
                        
                        <p>Best regards,</p>
                        <p><strong>The Wordy Vibes Team</strong></p>
            
                        <hr>
                        <p style="font-size: 12px; color: #777;">If you did not sign up for Wordy Vibes, please ignore this email or contact us immediately.</p>
                    </div>
                `,
            };
            
    
            await transporter.sendMail(options);

        await newUser.save();

        res.status(200).json({ message:"user registered successfully"});
    }
    catch(err){
        res.status(400).json({error: err.message});
        console.log(err);
    }
}

exports.login = async (req, res) => {
    const {email, password}=req.body;
    console.log(req.body);
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error: 'User not found'});

        const isPasswordValid=await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({error: 'Invalid password'});

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
        });

        // console.log(res.cookie('token'));
        return res.json({token, username:user.username, message: 'User logged in'});
    }

    catch(err){
        res.status(400).json({error: err.message});
        console.log(err);
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({message: 'User logged out'});
}

exports.getUserDetails=async(req, res)=>{
    const userId=req.user.id;
    try{
        const user=await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.editUserDetails = async (req, res) => {
    console.log("Edit request received", req.body);
    const { firstname, lastname, username, email, bio } = req.body;
    let updatedData = { firstname, lastname, username, bio };

    const userId = req.user.id;
    console.log(userId);
    try {
        let user = await User.findOne({ _id:userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Handle image update if a new image is uploaded
        if (req.file?.path) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return res.status(400).json({ error: "Failed to upload image to Cloudinary" });
            }
            updatedData.img = cloudinaryResponse.url;
        }

        user = await User.findOneAndUpdate({ _id:userId  }, updatedData, { new: true });

        res.status(200).json({ message: "User details updated successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
};

exports.getSavedPosts = async (req, res) => {
    const userId=req.user.id;
    try{
        const user=await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const savedPosts = await Post.find({ _id: { $in: user.savedPosts } });
        res.status(200).json({
            message: "User saved posts fetched successfully",
            savedPosts: savedPosts // Renamed for clarity
        });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getUserPosts=async(req, res)=>{
    try{
        const userId=req.user.id;
        const posts=await Post.find({user: userId});
        res.json({posts});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}


exports.resetOtp=async(req, res) => {
    const {email}=req.body;
    if(!email){
        return res.json({success:false, message:"Email is required"});
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not found"});
        }
        const otp=String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp=otp;
        user.resetOtpExpiredAt=Date.now() + 15 * 60 * 1000;
        await user.save();

        const options = {
            from: process.env.SMTP_MAIL,
            to: user.email,
            subject: "Reset Your Password - OTP Verification",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>Dear ${user.name || "User"},</p>
                    <p>We received a request to reset your password. Please use the OTP below to proceed:</p>
                    <div style="font-size: 20px; font-weight: bold; padding: 10px; background-color: #f8f8f8; display: inline-block; border-radius: 5px; margin: 10px 0;">
                        ${otp}
                    </div>
                    <p>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
                    <p>If you did not request a password reset, please ignore this email or contact support.</p>
                    <p>Best regards,</p>
                    <p><strong>Wordy Vibes Team</strong></p>
                </div>
            `,
        };
        

        await transporter.sendMail(options);

        res.json({success:true, message:"Password reset otp sent successfully"});

    }
    catch(err){
        return res.json({success:false, message:err.message})
    }
}

exports.resetPassword = async (req, res) => {
    const { email, otp, newPass } = req.body;

    if (!email || !otp || !newPass) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOtpExpiredAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(newPass, 10);
        user.password = hashedPassword;  

        user.resetOtp = "";
        user.resetOtpExpiredAt = 0;

        await user.save();
        
        return res.json({ success: true, message: "Password has been reset successfully" });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};

