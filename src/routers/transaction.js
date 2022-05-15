const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transaction");

router.get("/", transactionController.getTransaction).post("/", transactionController.insertTransaction).put("/:id", transactionController.updateTransaction).delete("/:id", transactionController.deleteTransaction);

module.exports = router;
