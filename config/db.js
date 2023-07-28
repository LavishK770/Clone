const mongoose = require('mongoose');

const Connection = async () => {
  const URL = process.env.MONGODB_ATLAS_URL;
  //const URL=`mongodb://localhost:27017/clone`;//for local mongodb
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(URL, { useNewUrlParser: true });

    console.log(`database connected successfully`);
  } catch (error) {
    console.log('Error: while connecting with database', error.message);
  }
};

module.exports = Connection;



