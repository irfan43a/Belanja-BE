const express = require("express");
const router = express.Router();
const checkoutController = require("../controller/checkout");
const { protect, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
// const { hitCacheProductDetail, clearCacheProductDetail } = require("../middlewares/redis");

router.get("/", protect, checkoutController.getCheckout).post("/checkout/", checkoutController.insertCheckout);

module.exports = router;
