const utilsHelper = {};

utilsHelper.sendResponse = (
  res,
  status,
  success,
  data,
  errors,
  message,
  page,
  total
) => {
  const response = { data: {} };
  if (message) response.data.message = message;
  // if (data) response.data.cars = data;
  if (data) response.data = { ...response.data, ...data };
  if (page) response.data.page = page;
  if (total) response.data.total = total;
  if (success) response.data.success = success;
  if (errors) response.data.errors = errors;
  return res.status(status).json(response);
};

class AppError extends Error {
  constructor(statusCode, message, errorType) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    // all errors using this class are operational errors.
    this.isOperational = true;
    // create a stack trace for debugging (Error obj, void obj to avoid stack polution)
    Error.captureStackTrace(this, this.constructor);
  }
}

utilsHelper.AppError = AppError;
module.exports = utilsHelper;
