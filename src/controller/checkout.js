const createError = require("http-errors");
const productsModel = require("../models/products");
const commonHelper = require("../helper/common");

exports.insertCheckout = async (req, res, next) => {
  try {
    const { idUser, products, total } = req.body;

    products.map((item) => {
      productsModel.checkoutModel({ idproduct: item.id, count: item.count, total: total, idUser: idUser });
    });

    commonHelper.response(res, null, 201, "data berhasil di tambahkan");
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};

exports.getCheckout = async (req, res, next) => {
  try {
    const idUser = req.decoded.id;
    console.log("iduser", idUser);
    const { rows: result } = await productsModel.getCheckout(idUser);
    res.status(200).json({
      message: `hasil `,
      result,
    });
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};
