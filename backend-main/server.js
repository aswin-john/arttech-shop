require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection/connection");
const userRoutes = require("./route/route");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({ name: "ArtTech API", status: "running" });
});

// Product browsing is public. Replace this endpoint with the product catalogue
// once its model and data are added.
app.get("/api/products", (_req, res) => {
  res.json({ success: true, products: [], message: "Product catalogue is not configured yet." });
});

app.use("/api/auth", userRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled request error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`ArtTech listening on port ${PORT}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  });
}

module.exports = app;
