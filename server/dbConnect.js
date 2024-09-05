const mongoose = require('mongoose')

module.exports = async () =>{
    const mongoUri = process.env.MONGODB_URI
    try {
    const connect = await mongoose.connect(mongoUri, {
        dbName:"Portfolio"
      });
      console.log(`MongoDb connected`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}