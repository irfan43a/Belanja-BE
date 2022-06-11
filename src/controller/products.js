const createError = require("http-errors");
const productsModel = require("../models/products");
const commonHelper = require("../helper/common");
const client = require("../config/redis");

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || "id";
    const sort = req.query.sort || "asc";
    const search = req.query.search || "";
    const result = await productsModel.select({ offset, limit, sortBy, sort, search });

    // pagination
    const {
      rows: [count],
    } = await productsModel.countProducts();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);

    // commonHelper.response(res, result, 200, "data berhasil di dapat");
    res.status(200).json({
      pagination: {
        currentPage: page,
        limit,
        totalData,
        totalPage,
        sortBy,
        sort,
        search,
        username: req.username,
      },
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};

exports.insertProducts = async (req, res, next) => {
  try {
    const { id_category, name, description, stock, price } = req.body;
    const data = { id_category, name, description, stock, price, photo: `http://${req.get("host")}/img/${req.file.filename}` };
    await productsModel.insert(data);
    commonHelper.response(res, data, 201, "data berhasil di tambahkan");
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};

exports.updateProducts = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, stock, price, id_category } = req.body;
    const data = { id, name, description, stock, price, id_category, photo: `http://${req.get("host")}/img/${req.file.filename}` };
    console.log(data);
    await productsModel.update(data);
    commonHelper.response(res, data, 201, "data berhasil di update");
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};

exports.deleteProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    productsModel.deleteProducts(id);
    res.json({
      message: "data berhasil di hapus",
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};

exports.detailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [product],
    } = await productsModel.getProductById(id);
    client.setEx(`products/${id}`, 60 * 60, JSON.stringify(product));

    commonHelper.response(res, product, 200, "get data dari database");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};
