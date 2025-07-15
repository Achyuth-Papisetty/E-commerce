const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

// GET all products (Public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// POST single or multiple products (Admin only)
router.post("/", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const products = await Product.insertMany(data);
    res.status(201).json(products);
  } catch (err) {
    console.error("Error adding products:", err.message);
    res.status(500).json({ message: "Error adding products", error: err.message });
  }
});

// PUT update product by ID (Admin only)
router.put("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// DELETE product by ID (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
