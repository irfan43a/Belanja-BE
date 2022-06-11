require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");
const helmet = require("helmet");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const mainRoute = require("./src/routers");

app.use("/v1", mainRoute);
app.use("/img", express.static(path.join(__dirname, "./upload")));

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res, next) => {
  const messError = err.message || "Internal server Error";
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: messError,
  });
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
