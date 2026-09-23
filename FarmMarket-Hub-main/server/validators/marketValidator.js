const validateMarket = (req, res, next) => {
  const { marketName, district, address } = req.body;

  if (!marketName || !district || !address) {
    return res.status(400).json({
      success: false,
      message: "Market Name, District and Address are required",
    });
  }

  next();
};

module.exports = validateMarket;