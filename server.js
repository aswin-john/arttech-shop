const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

require('./database/connection/connection')

app.use(express.json());

const ENVIRONMENT = process.env.ENVIRONMENT || 'DEV';
const VERSION = process.env.VERSION || '1.0.0';
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

const orderRoute = require("./route/orderRoute");
//  Webhook route must be registered BEFORE express.json()
// express.raw() keeps req.body as a raw Buffer for signature verification
app.use("/webhook", express.raw({ type: "application/json" }));

// Global JSON parsing for all other routes
app.use(express.json());

app.use("/", orderRoute);


app.get('/', (req, res) => {
  res.send(`ArtTech ${ENVIRONMENT} Server is running — v${VERSION}`);
});

app.listen(PORT, () => {
  console.log(` ${ENVIRONMENT} Server running on port ${PORT} — v${VERSION}`);
});