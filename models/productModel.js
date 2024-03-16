const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  quantity: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("product", productSchema);
