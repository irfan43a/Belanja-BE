const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transaction");
const { protect, isAdmin } = require("../middlewares/auth");
const { hitCacheProductDetail, clearCacheProductDetail } = require("../middlewares/redis");

router
  .get("/", protect, transactionController.getTransaction)
  .post("/", protect, isAdmin, transactionController.insertTransaction)
  .put("/:id", protect, isAdmin, transactionController.updateTransaction)
  .delete("/:id", protect, isAdmin, transactionController.deleteTransaction);

module.exports = router;
