const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    email: {
        type: String,
         required: true, 
         unique: true
    },
    password: {
        type: String, 
        required: true
    },
    bio:{
        type: String,
        default: 'Passionate writer sharing insights, ideas, and experiences to inform and inspire.'
    },
    img: {
        type: String,
    },
    savedPosts:{
        type: [String],
        default: []
    },
    resetOtp:{
        type: String,
        default: ''
    },
    resetOtpExpiredAt:{
        type: Number,
        default: 0
    }

},  { timestamps: true });

const user=mongoose.model("User", userSchema);
module.exports =user;