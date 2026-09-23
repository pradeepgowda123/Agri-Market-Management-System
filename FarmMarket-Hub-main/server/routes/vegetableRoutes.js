const express = require("express");

const router = express.Router();

const {
  createVegetable,
  getVegetables,
  getVegetableById,
  updateVegetable,
  deleteVegetable,
} = require("../controllers/vegetableController");

const validateVegetable = require("../validators/vegetableValidator");

router
  .route("/")
  .get(getVegetables)
  .post(validateVegetable, createVegetable);

  
router
  .route("/:id")
  .get(getVegetableById)
  .put(validateVegetable, updateVegetable)
  .delete(deleteVegetable);
module.exports = router;