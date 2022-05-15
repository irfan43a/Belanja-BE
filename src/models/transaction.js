const pool = require("../config/db");
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM transaction LIMIT $1 OFFSET $2", [limit, offset], (err, result) => {
      if (!err) {
        resolve(result.rows);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const insert = ({ products_item, price, qty, shiping_address, delivery_cost, iduser }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO transaction(products_item, price, qty, shiping_address, delivery_cost, iduser)VALUES($1,$2,$3,$4,$5,$6)", [products_item, price, qty, shiping_address, delivery_cost, iduser], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
// const update = ({ id, name, description, stock, price, idCategory }) => {
//   return new Promise((resolve, reject) => {
//     pool.query("UPDATE transaction SET name = $2,description = $3, stock = $4, price = $5, idCategory $6 WHERE id = $1", [id, name, description, stock, price, idCategory], (err, result) => {
//       if (!err) {
//         res.json({
//           message: "data berhasil di ubah",
//         });
//       } else {
//         res.status(500).json({
//           message: "internal server error",
//         });
//       }
//     });
//   });
// };

const deleteTransaction = (id_transaction) => {
  return pool.query("DELETE FROM transaction WHERE id_transaction = $1", [id_transaction]);
};

const countTransaction = () => {
  return pool.query("SELECT COUNT (*) AS total FROM transaction");
};

module.exports = {
  select,
  insert,
  // update,
  deleteTransaction,
  countTransaction,
};
