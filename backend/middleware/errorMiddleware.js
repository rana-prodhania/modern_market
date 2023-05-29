const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (error.name === "CastError") {
    error.statusCode = 404;
    error.message = "Invalid Id and the Resource is not found";
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    error.statusCode = 400;
    error.message = `Duplicate ${Object.keys(error.keyValue)} value entered`;
  }

  // Wrong JWT error
  if (error.name === "JsonWebTokenError") {
    error.statusCode = 401;
    error.message = "Invalid token";
  }

  // JWT expired error
  if (error.name === "TokenExpiredError") {
    error.statusCode = 401;
    error.message = "Token expired";
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default errorMiddleware;
