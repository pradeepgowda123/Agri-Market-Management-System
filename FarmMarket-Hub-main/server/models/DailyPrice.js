const mongoose = require("mongoose");

const dailyPriceSchema = new mongoose.Schema(
  {
    market: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Market",
      required: [true, "Market is required"],
    },

    vegetable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vegetable",
      required: [true, "Vegetable is required"],
    },

    minimumPrice: {
      type: Number,
      required: [true, "Minimum price is required"],
      min: 0,
    },

    modalPrice: {
      type: Number,
      required: [true, "Modal price is required"],
      min: 0,
    },

    maximumPrice: {
      type: Number,
      required: [true, "Maximum price is required"],
      min: 0,
    },

    arrivalQuantity: {
      type: Number,
      required: [true, "Arrival quantity is required"],
      min: 0,
    },

    unit: {
      type: String,
      enum: ["Kg", "Quintal", "Ton"],
      default: "Quintal",
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    priceDate: {
      type: Date,
      required: [true, "Price date is required"],
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

module.exports = mongoose.model("DailyPrice", dailyPriceSchema);