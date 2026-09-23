const express = require("express");

const router = express.Router();

const {
  createDailyPrice,
  getDailyPrices,
  getDailyPriceById,
  updateDailyPrice,
  deleteDailyPrice,
} = require("../controllers/dailyPriceController");

const validateDailyPrice = require("../validators/dailyPriceValidator");

router
  .route("/")
  .get(getDailyPrices)
  .post(validateDailyPrice, createDailyPrice);

router
  .route("/:id")
  .get(getDailyPriceById)
  .put(validateDailyPrice, updateDailyPrice)
  .delete(deleteDailyPrice);

module.exports = router;