const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    img: {
        type: String,
    },

    title: {
        type: String,
         required: true, 
    },
    category:{
        type: String,
        required: true,
        // unique: true/
    },
    desc:{
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    visit: {    
        type: Number,
        default: 0
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

},  { timestamps: true });

const post=mongoose.model("Post", postSchema);
module.exports =post;