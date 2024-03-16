const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  specialPrices: [
    {
      brand: {
        required: true,
        type: String,
      },
      discount: {
        required: true,
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
