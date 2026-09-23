const validateVegetable = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Vegetable name is required",
    });
  }

  next();
};

module.exports = validateVegetable;