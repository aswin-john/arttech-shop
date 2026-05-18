const express = require("express");
const { createOrder, verifyPayment, handleWebhook } = require("../controller/orderController");

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook); // raw body for signature verification

module.exports = router;