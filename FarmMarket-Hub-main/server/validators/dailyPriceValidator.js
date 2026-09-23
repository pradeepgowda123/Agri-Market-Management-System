const validateDailyPrice = (req, res, next) => {
  const {
    market,
    vegetable,
    minimumPrice,
    modalPrice,
    maximumPrice,
    arrivalQuantity,
    priceDate,
  } = req.body;

  if (
    !market ||
    !vegetable ||
    minimumPrice === undefined ||
    modalPrice === undefined ||
    maximumPrice === undefined ||
    arrivalQuantity === undefined ||
    !priceDate
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  if (minimumPrice > modalPrice) {
    return res.status(400).json({
      success: false,
      message: "Modal price cannot be less than minimum price",
    });
  }

  if (modalPrice > maximumPrice) {
    return res.status(400).json({
      success: false,
      message: "Maximum price cannot be less than modal price",
    });
  }

  next();
};

module.exports = validateDailyPrice;