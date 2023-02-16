const express = require("express");
const { validate } = require("../validator/validator.js");
const {
  createCar,
  getCars,
  editCar,
  deleteCar,
} = require("../controllers/car.controller");
const router = express.Router();

// CREATE
router.post("/", createCar);

// READ
router.get("/", getCars);

// UPDATE
router.put("/:id", validate.validateId(), editCar);

// // DELETE
router.delete("/:id", validate.validateId(), deleteCar);

module.exports = router;
