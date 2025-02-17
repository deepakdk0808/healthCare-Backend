const mongoose = require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })}

        catch(error){
            console.error(`Error:${error.message}`);
          
        }

    
};

module.exports=connectDB;