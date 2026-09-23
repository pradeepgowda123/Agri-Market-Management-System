const express = require("express");

const router = express.Router();

const {
  createMarket,
  getMarkets,
  getMarketById,
  updateMarket,
  deleteMarket,
} = require("../controllers/marketController");


const validateMarket = require("../validators/marketValidator");

router
  .route("/")
  .get(getMarkets)
  .post(validateMarket, createMarket);


router
  .route("/:id")
  .get(getMarketById)
  .put(validateMarket, updateMarket)
  .delete(deleteMarket);


  
module.exports = router;