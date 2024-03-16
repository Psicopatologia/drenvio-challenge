const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/products", async (req, res) => {
  try {
    const data = await productModel.find({ quantity: { $gt: 0 } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/price/:user_id/:product_name", async (req, res) => {
  try {
    // Get product
    const product = await productModel.findOne({
      name: req.params.product_name.toLowerCase(),
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Get user
    const user = await userModel.findOne({ id: req.params.user_id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // If user has special offer for product brand returns price for user
    const index = user.specialPrices?.findIndex(
      (offer) => offer.brand === product.brand
    );
    if (index > -1) {
      const userPrice =
        product.price * (1 - user.specialPrices[index].discount);
      res.json(userPrice);
      return;
    }

    // If user has no special offer for product brand returns base price
    res.json(product.price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
