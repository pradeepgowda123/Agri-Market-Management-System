const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vegetable name is required"],
      trim: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vegetable", vegetableSchema);