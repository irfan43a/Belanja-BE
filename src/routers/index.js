const express = require("express");
const router = express.Router();
const categoryRoute = require("./category");
const productsRoute = require("./products");
const transactionRoute = require("./transaction");
const usersRoute = require("./users");
const checkout = require("./checkout");

router.use("/category", categoryRoute).use("/products", productsRoute).use("/transaction", transactionRoute).use("/users", usersRoute).use("/checkout", checkout);

module.exports = router;
