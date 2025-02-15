const mongoose = require('mongoose');
require('dotenv').config();

const connectDB=async()=>{
    try{
        // await mongoose.connect(process.env.mongoDb_Url);
        // console.log('MongoDB connected...');
        await mongoose.connect(process.env.mongoDb_Url + "&tls=true", {
            tlsAllowInvalidCertificates: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    }catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports=connectDB;
