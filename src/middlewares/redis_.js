// const client = require("../config/redis");
// const { response } = require("../helper/common");

// const hitCacheProductDetail = async (req, res, next) => {
//   const idProduct = req.params.id;
//   const product = await client.get(`products/${idProduct}`);
//   if (product) {
//     return response(res, JSON.parse(product), 200, "get data dari redis");
//   }
//   next();
// };

// const clearCacheProductDetail = (req, res, next) => {
//   const idProduct = req.params.id;
//   client.del(`products/${idProduct}`);
//   next();
// };

// module.exports = { hitCacheProductDetail, clearCacheProductDetail };
