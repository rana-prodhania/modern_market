const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (error.name === "CastError") {
    error.statusCode = 404;
    error.message = "Invalid Id and the Resource is not found";
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default errorMiddleware;
