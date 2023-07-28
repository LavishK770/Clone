const mongoose = require('mongoose');

const Connection=async ()=>{
    const URL=process.env.MONGODB_ATLAS_URL;
    try{
      
  await mongoose.connect(URL);
  
  console.log(`database connected successfully`);
    }catch(error){
  console.log('Error: while connecting with database',error.message);
    }
};

 module.exports = Connection; 



