const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getOrders);

module.exports = router;