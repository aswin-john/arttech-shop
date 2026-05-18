// generate-sig.js  — run with: node generateSig.js
const crypto = require("crypto");

const order_id = "order_SkwWlmqgY0sUvs";   // paste from Test 1 response
const payment_id = "pay_xxxxxxxxxxxx";   // grab from Razorpay Dashboard → Transactions

const body = order_id + "|" + payment_id;
const sig = crypto
  .createHmac("sha256", "YOUR_RAZORPAY_KEY_SECRET")
  .update(body)
  .digest("hex");

console.log("signature:", sig);