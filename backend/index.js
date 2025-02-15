const express=require('express')
const cookieParser=require('cookie-parser');
const commentRouter=require('./routes/commentRoute');
const postRouter=require('./routes/postRoute');
const userRouter=require('./routes/userRoute');
const connectDB=require('./connection/connect')
const cors = require('cors');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:5173', 'https://blog-web-app-bay.vercel.app'],  // Allow only your frontend's origin
    methods: 'GET,POST,PUT,DELETE',  // Allow these methods
    credentials: true,  // Allow cookies to be sent in requests
}));

app.use("/post", postRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
connectDB();
app.listen(3030, ()=>{
    console.log('listening on port 3030');
})