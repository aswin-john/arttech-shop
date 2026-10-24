const mongoose = require('mongoose');

const connectWithRetry = async () => {
  try {
    const DB = process.env.DATABASE;
    await mongoose.connect(DB);
    console.log(`📡...${process.env.ENVIRONMENT} ${process.env.PROJECT_NAME} DATABASE CONNECTED SUCCESSFULLY...📡`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    setTimeout(connectWithRetry, 5000);
  }
};

module.exports = connectWithRetry;