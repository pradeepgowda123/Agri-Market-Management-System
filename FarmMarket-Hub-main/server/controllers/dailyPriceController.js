const asyncHandler = require("express-async-handler");
const DailyPrice = require("../models/DailyPrice");
const apiResponse = require("../utils/apiResponse");
const MESSAGES = require("../constants/messages");

// Create Daily Price
const createDailyPrice = asyncHandler(async (req, res) => {
  const {
    market,
    vegetable,
    minimumPrice,
    modalPrice,
    maximumPrice,
    arrivalQuantity,
    unit,
    remarks,
    priceDate,
  } = req.body;

  const existing = await DailyPrice.findOne({
    market,
    vegetable,
    priceDate,
  });

  if (existing) {
    if (!existing.isActive) {
      existing.minimumPrice = minimumPrice;
      existing.modalPrice = modalPrice;
      existing.maximumPrice = maximumPrice;
      existing.arrivalQuantity = arrivalQuantity;
      existing.unit = unit;
      existing.remarks = remarks;
      existing.isActive = true;

      await existing.save();

      return apiResponse(
        res,
        200,
        true,
        MESSAGES.DAILY_PRICE.RESTORED,
        existing
      );
    }

    res.status(400);
    throw new Error(MESSAGES.DAILY_PRICE.ALREADY_EXISTS);
  }

  const dailyPrice = await DailyPrice.create({
    market,
    vegetable,
    minimumPrice,
    modalPrice,
    maximumPrice,
    arrivalQuantity,
    unit,
    remarks,
    priceDate,
  });

  apiResponse(
    res,
    201,
    true,
    MESSAGES.DAILY_PRICE.CREATED,
    dailyPrice
  );
});

// Get All
const getDailyPrices = asyncHandler(async (req, res) => {
  const prices = await DailyPrice.find({
    isActive: true,
  })
    .populate("market", "marketName district")
    .populate("vegetable", "name")
    .sort({
      priceDate: -1,
      createdAt: -1,
    });

  apiResponse(
    res,
    200,
    true,
    MESSAGES.DAILY_PRICE.FETCHED,
    prices
  );
});

// Get One
const getDailyPriceById = asyncHandler(async (req, res) => {
  const price = await DailyPrice.findById(req.params.id)
    .populate("market")
    .populate("vegetable");

  if (!price || !price.isActive) {
    res.status(404);
    throw new Error(MESSAGES.DAILY_PRICE.NOT_FOUND);
  }

  apiResponse(
    res,
    200,
    true,
    MESSAGES.DAILY_PRICE.FETCHED_ONE,
    price
  );
});

// Update
const updateDailyPrice = asyncHandler(async (req, res) => {
  const {
    market,
    vegetable,
    minimumPrice,
    modalPrice,
    maximumPrice,
    arrivalQuantity,
    unit,
    remarks,
    priceDate,
  } = req.body;

  const price = await DailyPrice.findById(req.params.id);

  if (!price || !price.isActive) {
    res.status(404);
    throw new Error(MESSAGES.DAILY_PRICE.NOT_FOUND);
  }

  const duplicate = await DailyPrice.findOne({
    market,
    vegetable,
    priceDate,
    _id: { $ne: req.params.id },
    isActive: true,
  });

  if (duplicate) {
    res.status(400);
    throw new Error(MESSAGES.DAILY_PRICE.ALREADY_EXISTS);
  }

  price.market = market;
  price.vegetable = vegetable;
  price.minimumPrice = minimumPrice;
  price.modalPrice = modalPrice;
  price.maximumPrice = maximumPrice;
  price.arrivalQuantity = arrivalQuantity;
  price.unit = unit;
  price.remarks = remarks;
  price.priceDate = priceDate;

  const updated = await price.save();

  apiResponse(
    res,
    200,
    true,
    MESSAGES.DAILY_PRICE.UPDATED,
    updated
  );
});

// Delete
const deleteDailyPrice = asyncHandler(async (req, res) => {
  const price = await DailyPrice.findById(req.params.id);

  if (!price || !price.isActive) {
    res.status(404);
    throw new Error(MESSAGES.DAILY_PRICE.NOT_FOUND);
  }

  price.isActive = false;

  await price.save();

  apiResponse(
    res,
    200,
    true,
    MESSAGES.DAILY_PRICE.DELETED
  );
});

module.exports = {
  createDailyPrice,
  getDailyPrices,
  getDailyPriceById,
  updateDailyPrice,
  deleteDailyPrice,
};