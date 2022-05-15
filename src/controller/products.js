const pool = require("../config/db");
const createError = require("http-errors");
const productsModel = require("../models/products");
const commonHelper = require("../helper/common");
const client = require("../config/redis");

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || "id";
    const sort = req.query.sort || "asc";
    const search = req.query.search || "";
    console.log(search);
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

    // let { sortBy, sort, search, page, limit } = req.query;
    // if (search) {
    //   const result = await productsModel.search(search);
    //   commonHelper.response(res, result, 200, "data berhasil di dapat");
    // } else {
    //   if (sortBy || sort || limit || page) {
    //     sortBy = sortBy || "id";
    //     sort = sort || "asc";
    //     limit = limit || 5;
    //     page = page || 1;
    //     const offset = (page - 1) * limit;
    //     const result = await paginationData(sortby, sort, page, limit);
    //     const {
    //       rows: [{ count: countData }],
    //     } = await countProducts();
    //     res.json(response.okPagination(result.rows, page, limit, +countData));
    //   } else {
    //     const result = await getData({ id });
    //     if (!id) {
    //       res.json(response.okGet(result.rows));
    //     } else {
    //       res.json(response.okGetDetail(result.rows, id));
    //     }
    //   }
    //   res.end();
    // }
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
  } catch (err) {}
  console.log(err);
  next(new createError.InternalServerError());
};

exports.updateProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, stock, price, id_category } = req.body;
    const data = { id, name, description, stock, price, id_category };
    await productsModel.update(data);
    console.log(id);
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
    client.setEx(`product/${id}`, 60 * 60, JSON.stringify(product));

    response(res, product, 200, "get data dari database");
  } catch (error) {
    console.log(error);
  }

  //   http::/localhost:4000/product/2
};
