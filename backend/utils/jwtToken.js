const sendJWTToken = (res, statusCode, message, user) => {
  const token = user.generateJWTToken();
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    token,
    user,
  });
};

export default sendJWTToken;
