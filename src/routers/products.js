const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const { protect, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const { hitCacheProductDetail, clearCacheProductDetail } = require("../middlewares/redis");

router
  .get("/", productsController.getProducts)
  .get("/:id", hitCacheProductDetail, productsController.detailProduct)
  .post("/", upload.single("photo"), productsController.insertProducts)
  .put("/:id", upload.single("photo"), clearCacheProductDetail, productsController.updateProducts)
  .delete("/:id", clearCacheProductDetail, productsController.deleteProducts);

module.exports = router;
