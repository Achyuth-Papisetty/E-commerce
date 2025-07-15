const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  const order = new Order({ userId: req.user.id, items: cart.items });
  await order.save();
  cart.items = [];
  await cart.save();
  res.json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find(req.user.role === "admin" ? {} : { userId: req.user.id });
  res.json(orders);
};
