const mongoose = require("mongoose");

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function connectWithRetry() {
  const databaseUri = process.env.DATABASE;
  if (!databaseUri) throw new Error("DATABASE is missing from the environment.");

  while (true) {
    try {
      await mongoose.connect(databaseUri);
      console.log(`${process.env.ENVIRONMENT || "DEV"} ${process.env.PROJECT_NAME || "ArtTech"} database connected successfully.`);
      return;
    } catch (error) {
      console.error("Database connection error:", error.message);
      console.log("Retrying MongoDB connection in 5 seconds...");
      await delay(5000);
    }
  }
}

module.exports = connectWithRetry;
