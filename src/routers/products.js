const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const { protect, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router
  .get("/", productsController.getProducts)
  .get("/:id", productsController.detailProduct)
  .post("/", upload.single("photo"), productsController.insertProducts)
  .put("/:id", productsController.updateProducts)
  .delete("/:id", productsController.deleteProducts);

module.exports = router;
