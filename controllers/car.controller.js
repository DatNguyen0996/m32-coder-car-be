const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};
const { sendResponse, AppError } = require("../helpers/utils.js");

carController.createCar = async (req, res, next) => {
  const info = {
    make: "aaa",
    model: "ddd",
    release_date: 1906,
    transmission_type: "AUTOMATIC",
    price: 211221,
    size: "Compact",
    style: "ddd",
  };
  // console.log("ket qua ", notAllow.length !== Object.keys(info).length);
  try {
    // YOUR CODE HERE
    const page = req.body;
    const notAllow = Object.keys(info).filter((e) =>
      Object.keys(page).includes(e)
    );
    if (notAllow.length !== Object.keys(info).length)
      throw new AppError(402, "Bad Request", "Create Car Error");
    const created = await Car.create(page);
    sendResponse(
      res,
      200,
      true,
      { car: page },
      null,
      "Create Car Successfully!",
      1,
      1
    );
    // console.log("ket qua ", page);
  } catch (err) {
    next(err);
    // YOUR CODE HERE
  }
};

carController.getCars = async (req, res, next) => {
  const filter = {};
  try {
    // YOUR CODE HERE
    const { page } = req.query;
    const getData = await Car.find({ isDeleted: false });

    listOfFound = getData.slice((page - 1) * 10, page * 10);
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
    // console.log("ket qua ", getData.length);
  } catch (err) {
    next(err);
    // YOUR CODE HERE
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateInfo = req.body;
    const targetId = id;
    const options = { new: true };
    // YOUR CODE HERE
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);
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
    // YOUR CODE HERE
    const { id } = req.params;
    const targetId = id;
    const options = { new: true };
    const updateInfoDelete = { isDeleted: true };

    const updatedDelete = await Car.findByIdAndUpdate(
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
