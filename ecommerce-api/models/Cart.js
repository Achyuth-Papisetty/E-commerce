const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);