const express = require("express");
const router = express.Router();
const categoryRoute = require("./category");
const productsRoute = require("./products");
const transactionRoute = require("./transaction");
const usersRoute = require("./users");

router.use("/category", categoryRoute).use("/products", productsRoute).use("/transaction", transactionRoute).use("/users", usersRoute);

module.exports = router;
