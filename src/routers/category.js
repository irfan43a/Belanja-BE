const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");
const { protect, isAdmin } = require("../middlewares/auth");

router
  .get("/", protect, categoryController.getCategory)
  .post("/", protect, isAdmin, categoryController.insertCategory)
  .put("/:id", protect, isAdmin, categoryController.updateCategory)
  .delete("/:id", protect, isAdmin, categoryController.deleteCategory);

module.exports = router;
