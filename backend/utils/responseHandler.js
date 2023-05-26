import createError from "http-errors";
// Helper function to handle not found and success responses
const responseHandler = (res, statusCode, message, data = {}, next) => {
  if (!data) {
    next(createError(404, "Product not found"));
  } else {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
};

// Helper function to handle success responses
const handleSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export { responseHandler, handleSuccess };
