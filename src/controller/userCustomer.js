// const { json } = require("express/lib/response");
// const pool = require("../config/db");
// const createError = require("http-errors");
// const userCustomerModel = require("../models/userCustomer");
// const commonHelper = require("../helper/common");

// exports.getUserCustomer = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const offset = (page - 1) * limit;
//     const result = await userCustomerModel.select({ offset, limit });
//     // pagination
//     const {
//       rows: [count],
//     } = await userCustomerModel.countProducts();
//     const totalData = parseInt(count.total);
//     const totalPage = Math.ceil(totalData / limit);
//     // console.log(totalData);

//     // commonHelper.response(res, result, 200, "data berhasil di dapat");
//     res.status(200).json({
//       pagination: {
//         currentPage: page,
//         limit,
//         totalData,
//         totalPage,
//       },
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//     next(new createError.InternalServerError());
//   }
// };

// exports.insertUserCustomer = (req, res, next) => {
//   const { id_category, name, description, stock, price } = req.body;
//   const data = { id_category, name, description, stock, price };
//   userCustomerModel
//     .insert(data)
//     .then(() => {
//       res.status(201).json({
//         data,
//         message: "data berhasil di tambahkan",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(new createError.InternalServerError());
//     });
// };

// exports.updateProducts = (req, res, next) => {
//   const id = req.params.id;
//   const { name, description, stock, price, id_category } = req.body;

//   pool.query("UPDATE user_customer SET name = $1, description = $2, stock = $3, price = $4, id_category = $5 WHERE id = $6", [name, description, stock, price, id_category, id], (err, result) => {
//     if (!err) {
//       res.json({
//         message: "data berhasil di ubah",
//       });
//     } else {
//       res.status(500).json({
//         message: "internal server error",
//       });
//     }
//   });
// };

// exports.deleteUserCustomer = (req, res, next) => {
//   const id = req.params.id;

//   userCustomerModel
//     .delete(id)
//     .then((result) => {
//       res.json({
//         message: "data berhasil di hapus",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(new createError.InternalServerError());
//     });
// };
// exports.detailUserCutomer = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await userCustomerModel.getProductById(id);
//     res.json({
//       data: result.rows[0],
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   //   http::/localhost:4000/product/2
// };
