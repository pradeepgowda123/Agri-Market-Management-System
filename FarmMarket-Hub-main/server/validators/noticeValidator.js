const validateNotice = (req, res, next) => {
  const {
    title,
    description,
    expiryDate,
  } = req.body;

  if (!title || !description || !expiryDate) {
    return res.status(400).json({
      success: false,
      message:
        "Title, Description and Expiry Date are required",
    });
  }

  next();
};

module.exports = validateNotice;