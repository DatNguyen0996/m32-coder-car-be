const mongoose = require("mongoose");
const Cars = require("../models/Car");
const carController = {};
const { sendResponse, AppError } = require("../helpers/utils.js");
const { validationResult } = require("express-validator");

carController.createCar = async (req, res, next) => {
  const info = {
    make: "",
    model: "",
    release_date: 0,
    transmission_type: "",
    price: 0,
    size: "",
    style: "",
  };

  try {
    // YOUR CODE HERE
    const carInfo = req.body;
    const notAllow = Object.keys(info).filter((e) =>
      Object.keys(carInfo).includes(e)
    );
    if (notAllow.length !== Object.keys(info).length)
      throw new AppError(402, "Bad Request", "Create Car Error");
    const created = await Cars.create(carInfo);
    sendResponse(
      res,
      200,
      true,
      { car: carInfo },
      null,
      "Create Car Successfully!",
      1,
      1
    );
  } catch (err) {
    next(err);
    // YOUR CODE HERE
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const { page } = req.query;
    const getData = await Cars.find({ isDeleted: false });

    if (getData.length === 0) {
      throw new AppError(402, "Bad Request", "Car not found");
    }

    const offset = page || 1;
    const listOfFound = getData.slice((offset - 1) * 10, offset * 10);

    sendResponse(
      res,
      200,
      true,
      { cars: listOfFound },
      null,
      "Get Car List Successfully!",
      1,
      Math.ceil(getData.length / 10)
    );
  } catch (err) {
    next(err);
    // YOUR CODE HERE
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new AppError(402, "Bad Request", errors.array());
    }

    const { id } = req.params;
    const updateInfo = req.body;
    const targetId = id;
    const options = { new: true };
    // YOUR CODE HERE

    const checkCar = await Cars.find({ isDeleted: false, _id: id });
    if (checkCar.length === 0) {
      throw new AppError(402, "Bad Request", "Car not found");
    }

    const updated = await Cars.findByIdAndUpdate(targetId, updateInfo, options);
    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Update Car Successfully!",
      1,
      1
    );

    // console.log(updated);
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new AppError(402, "Bad Request", errors.array());
    }

    const { id } = req.params;
    const targetId = id;
    const options = { new: true };
    const updateInfoDelete = { isDeleted: true };

    const checkCar = await Cars.find({ isDeleted: false, _id: id });
    if (checkCar.length === 0) {
      throw new AppError(402, "Bad Request", "Car not found");
    }

    const updatedDelete = await Cars.findByIdAndUpdate(
      targetId,
      updateInfoDelete,
      options
    );
    sendResponse(
      res,
      200,
      true,
      { car: updatedDelete },
      null,
      "Update Car Successfully!",
      1,
      1
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

module.exports = carController;
