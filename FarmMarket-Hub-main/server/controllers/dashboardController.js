const asyncHandler = require("express-async-handler");

const Vegetable = require("../models/Vegetable");
const Market = require("../models/Market");
const DailyPrice = require("../models/DailyPrice");
const Notice = require("../models/Notice");

const apiResponse = require("../utils/apiResponse");

const getDashboardStats = asyncHandler(async (req, res) => {
  // Counts
  const vegetables = await Vegetable.countDocuments({
    isActive: true,
  });

  const markets = await Market.countDocuments({
    isActive: true,
  });

  const prices = await DailyPrice.countDocuments({
    isActive: true,
  });

  const notices = await Notice.countDocuments({
    isActive: true,
  });

  // Recent Daily Prices
  const recentPrices = await DailyPrice.find({
    isActive: true,
  })
    .populate("market", "marketName")
    .populate("vegetable", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  // Recent Notices
  const recentNotices = await Notice.find({
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  apiResponse(
    res,
    200,
    true,
    "Dashboard stats fetched successfully",
    {
      vegetables,
      markets,
      prices,
      notices,
      recentPrices,
      recentNotices,
    }
  );
});

module.exports = {
  getDashboardStats,
};