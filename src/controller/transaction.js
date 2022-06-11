const pool = require("../config/db");
const createError = require("http-errors");
const transactionModel = require("../models/transaction");
const commonHelper = require("../helper/common");

exports.getTransaction = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const result = await transactionModel.select({ offset, limit });

    // pagination
    const {
      rows: [count],
    } = await transactionModel.countTransaction();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);

    res.status(200).json({
      pagination: {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      },
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};

exports.insertTransaction = (req, res, next) => {
  const { products_item, price, qty, shiping_address, delivery_cost, iduser } = req.body;
  const shopingSummary = price * qty + delivery_cost;
  const data = { products_item, price, qty, shiping_address, delivery_cost, shopingSummary, iduser };
  transactionModel
    .insert(data)
    .then(() => {
      res.status(201).json({
        data,
        message: "data berhasil di tambahkan",
      });
    })
    .catch((err) => {
      console.log(err);
      next(new createError.InternalServerError());
    });
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { products_item, price, qty, shiping_address, delivery_cost, iduser } = req.body;
    const shopingSummary = price * qty + delivery_cost;
    const data = { id, products_item, price, qty, shiping_address, delivery_cost, shopingSummary, iduser };
    console.log(data);
    await transactionModel.update(data);
    commonHelper.response(res, data, 201, "data berhasil di update");
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const id_transaction = req.params.id;
    await transactionModel.deleteTransaction(id_transaction);
    res.json({
      message: "data berhasil di hapus",
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};
