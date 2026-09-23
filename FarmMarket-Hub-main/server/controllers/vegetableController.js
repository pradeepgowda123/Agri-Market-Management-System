const asyncHandler = require("express-async-handler");
const Vegetable = require("../models/Vegetable");
const apiResponse = require("../utils/apiResponse");
const MESSAGES = require("../constants/messages");
// @desc    Add a new vegetable
// @route   POST /api/vegetables
// @access  Private (Later)
// @desc    Create a new vegetable
// @route   POST /api/vegetables
// @access  Private (Later)

const createVegetable = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;

if (!name) {
  res.status(400);
  throw new Error("Vegetable name is required");
}

  const vegetableExists = await Vegetable.findOne({ name });

if (vegetableExists) {

  // Restore soft-deleted vegetable
  if (!vegetableExists.isActive) {
    vegetableExists.isActive = true;

    await vegetableExists.save();

    return apiResponse(
      res,
      200,
      true,
      MESSAGES.VEGETABLE.RESTORED,
      vegetableExists
    );
  }

  // Already active
  res.status(400);
  throw new Error(MESSAGES.VEGETABLE.ALREADY_EXISTS);
}

 const vegetable = await Vegetable.create({
  name,
  isActive,
});

  apiResponse(
    res,
    201,
    true,
    MESSAGES.VEGETABLE.CREATED,
    vegetable
  );
});

// @desc    Get all vegetables
// @route   GET /api/vegetables
// @access  Public

// @desc    Get all vegetables
// @route   GET /api/vegetables
// @access  Public

const getVegetables = asyncHandler(async (req, res) => {
 const vegetables = await Vegetable.find({
  isActive: true,
}).sort({
  createdAt: -1,
});


  apiResponse(
    res,
    200,
    true,
    MESSAGES.VEGETABLE.FETCHED,
    vegetables
  );
});
// @desc    Get single vegetable
// @route   GET /api/vegetables/:id
// @access  Public

// @desc    Get single vegetable
// @route   GET /api/vegetables/:id
// @access  Public

const getVegetableById = asyncHandler(async (req, res) => {
  const vegetable = await Vegetable.findById(req.params.id);

  if (!vegetable) {
    res.status(404);
    throw new Error(MESSAGES.VEGETABLE.NOT_FOUND);
  }

  apiResponse(
    res,
    200,
    true,
   MESSAGES.VEGETABLE.FETCHED_ONE,
    vegetable
  );
});

// @desc    Update vegetable
// @route   PUT /api/vegetables/:id
// @access  Private (Later)

const updateVegetable = asyncHandler(async (req, res) => {
 const { name, isActive } = req.body;

  const vegetable = await Vegetable.findById(req.params.id);

  if (!vegetable) {
    res.status(404);
   throw new Error(MESSAGES.VEGETABLE.NOT_FOUND);
  }

  // Check duplicate name (excluding current vegetable)
  const existingVegetable = await Vegetable.findOne({
    name,
    _id: { $ne: req.params.id },
  });

  if (existingVegetable) {
    res.status(400);
    throw new Error(MESSAGES.VEGETABLE.ALREADY_EXISTS);
  }

  vegetable.name = name || vegetable.name;

if (typeof isActive === "boolean") {
  vegetable.isActive = isActive;
}

  const updatedVegetable = await vegetable.save();

  apiResponse(
    res,
    200,
    true,
    MESSAGES.VEGETABLE.UPDATED,
    updatedVegetable
  );
});


// @desc    Delete vegetable (Soft Delete)
// @route   DELETE /api/vegetables/:id
// @access  Private (Later)

const deleteVegetable = asyncHandler(async (req, res) => {

    const vegetable = await Vegetable.findById(req.params.id);

    if (!vegetable) {
        res.status(404);
       throw new Error(MESSAGES.VEGETABLE.NOT_FOUND);
    }

    vegetable.isActive = false;

    await vegetable.save();

    apiResponse(
        res,
        200,
        true,
        MESSAGES.VEGETABLE.DELETED
    );

});

module.exports = {
    createVegetable,
    getVegetables,
    getVegetableById,
    updateVegetable,
    deleteVegetable
};