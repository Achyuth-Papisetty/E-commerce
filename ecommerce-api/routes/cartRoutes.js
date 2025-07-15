const express = require("express");
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, getCart);
router.post("/", authenticate, addToCart);
router.put("/:id", authenticate, updateCartItem);
router.delete("/:id", authenticate, removeCartItem);

module.exports = router;