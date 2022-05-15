const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
      // console.log(decoded);
      req.decoded = decoded;
      next();
    } else {
      next(new createError(400, "harus ada token"));
    }
  } catch (error) {
    // console.log(error);
    if (error && error.name === "JsonWebTokenError") {
      next(new createError(400, "toke invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(new createError(400, "token expired"));
    } else {
      next(new createError(400, "token not active"));
      // next(new createError.InternalServerError());
    }
  }
};
const isAdmin = (req, res, next) => {
  if (req.decoded.role !== "admin") {
    return next(new createError(400, "hanya admin"));
  }
  next();
};

module.exports = { protect, isAdmin };
