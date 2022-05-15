const pool = require("../config/db");
const createError = require("http-errors");
const transactionModel = require("../models/transaction");
// const commonHelper = require("../helper/common");

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

    // commonHelper.response(res, result, 200, "data berhasil di dapat");
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
  const data = { products_item, price, qty, shiping_address, delivery_cost, iduser };
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

exports.updateTransaction = (req, res, next) => {
  const id = req.params.id;
  const { products_item, price, qty, shiping_address, delivery_cost, iduser } = req.body;

  pool.query(
    "UPDATE transactions SET products_item = $1,price = $2, qty = $3, shiping_address = $4, delivery_cost = $5, iduser = $6 WHERE id_transaction = $7",
    [products_item, price, qty, shiping_address, delivery_cost, iduser, id],
    (err) => {
      if (!err) {
        res.json({
          message: "data berhasil di ubah",
        });
      } else {
        res.status(500).json({
          message: "internal server error",
        });
      }
    }
  );
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
