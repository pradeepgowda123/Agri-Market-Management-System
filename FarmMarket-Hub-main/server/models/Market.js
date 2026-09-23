const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    marketName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
      default: "",
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

module.exports = mongoose.model("Market", marketSchema);