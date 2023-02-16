const { check } = require("express-validator");

let validateId = () => {
  return [check("id", "Id must be a MongoDB ObjectId").isMongoId()];
};

let validate = {
  validateId: validateId,
};

module.exports = { validate };
