import createError from "http-errors";
// Helper function to handle not found and success responses
const notFoundHandler = (data = {}, message) => {
  if (!data) {
    throw createError(404, message);
  }
};

// Helper function to handle success responses
const successHandler = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export { successHandler, notFoundHandler };
