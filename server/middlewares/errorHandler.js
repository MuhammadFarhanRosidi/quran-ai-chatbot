function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  switch (err.name) {
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
    case "NotFound":
      status = 404;
      message = "Data Not Found";
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = "Email must unique";
      break;
    case "BadRequest":
    case "Unauthorized":
      status = 401;
      message = "Email and Password is invalid";
      break;
    case "CredentialsRequired":
      status = 400;
      message = "Email and Password is required";
      break;
  }

  res.status(status).json({ message: message });
}

module.exports = errorHandler;
