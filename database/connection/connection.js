const mongoose = require('mongoose');

const connectWithRetry = async () => {
  try {
    let DB = process.env.DATABASE;

    await mongoose.connect(DB);
    console.log(`📡...${process.env.ENVIRONMENT} ${process.env.PROJECT_NAME} DATABASE CONNECTED SUCCESSFULLY...📡`);
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection error:", error.message);
    setTimeout(connectWithRetry, 5000);
  }
};

module.exports = connectWithRetry;