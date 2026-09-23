const asyncHandler = require("express-async-handler");
const Market = require("../models/Market");
const apiResponse = require("../utils/apiResponse");
const MESSAGES = require("../constants/messages");

// @desc    Create a new Market
// @route   POST /api/markets
// @access  Private (Later)

const createMarket = asyncHandler(async (req, res) => {
  const { marketName, district, address, phoneNumber } = req.body;

  if (!marketName || !district || !address) {
    res.status(400);
    throw new Error("Market Name, District and Address are required");
  }

  const marketExists = await Market.findOne({ marketName });

if (marketExists) {

  if (!marketExists.isActive) {

    marketExists.isActive = true;
    marketExists.district = district;
    marketExists.address = address;
    marketExists.phoneNumber = phoneNumber;

    await marketExists.save();

    return apiResponse(
      res,
      200,
      true,
      MESSAGES.MARKET.RESTORED,
      marketExists
    );
  }

  res.status(400);
  throw new Error(MESSAGES.MARKET.ALREADY_EXISTS);
}

  const market = await Market.create({
    marketName,
    district,
    address,
    phoneNumber,
  });

  apiResponse(
    res,
    201,
    true,
    MESSAGES.MARKET.CREATED,
    market
  );
});



// @desc    Get all markets
// @route   GET /api/markets
// @access  Public

const getMarkets = asyncHandler(async (req, res) => {
  const markets = await Market.find({
    isActive: true,
  }).sort({
    createdAt: -1,
  });

  apiResponse(
    res,
    200,
    true,
    MESSAGES.MARKET.FETCHED,
    markets
  );
});


// @desc    Get Market by ID
// @route   GET /api/markets/:id
// @access  Public

const getMarketById = asyncHandler(async (req, res) => {
  const market = await Market.findById(req.params.id);

  if (!market || !market.isActive) {
    res.status(404);
    throw new Error(MESSAGES.MARKET.NOT_FOUND);
  }

  apiResponse(
    res,
    200,
    true,
    MESSAGES.MARKET.FETCHED_ONE,
    market
  );
});


// @desc    Update Market
// @route   PUT /api/markets/:id
// @access  Private (Later)

const updateMarket = asyncHandler(async (req, res) => {
  const { marketName, district, address, phoneNumber } = req.body;

  const market = await Market.findById(req.params.id);

  if (!market || !market.isActive) {
    res.status(404);
    throw new Error(MESSAGES.MARKET.NOT_FOUND);
  }

  // Check duplicate market name (excluding current market)
  const existingMarket = await Market.findOne({
    marketName,
    _id: { $ne: req.params.id },
  });

  if (existingMarket) {
    res.status(400);
    throw new Error(MESSAGES.MARKET.ALREADY_EXISTS);
  }

  market.marketName = marketName || market.marketName;
  market.district = district || market.district;
  market.address = address || market.address;
  market.phoneNumber = phoneNumber || market.phoneNumber;

  const updatedMarket = await market.save();

  apiResponse(
    res,
    200,
    true,
   MESSAGES.MARKET.UPDATED,
    updatedMarket
  );
});



// @desc    Soft Delete Market
// @route   DELETE /api/markets/:id
// @access  Private (Later)

const deleteMarket = asyncHandler(async (req, res) => {
  const market = await Market.findById(req.params.id);

  if (!market || !market.isActive) {
    res.status(404);
   throw new Error(MESSAGES.MARKET.NOT_FOUND);
  }

  market.isActive = false;

  await market.save();

  apiResponse(
    res,
    200,
    true,
    MESSAGES.MARKET.DELETED
  );
});

module.exports = {
  createMarket,
  getMarkets,
  getMarketById,
  updateMarket,
  deleteMarket,
};