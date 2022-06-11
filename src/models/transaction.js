const pool = require("../config/db");
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM transaction ORDER BY id_transaction ASC LIMIT $1 OFFSET $2", [limit, offset], (err, result) => {
      if (!err) {
        resolve(result.rows);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const insert = ({ products_item, price, qty, shiping_address, delivery_cost, shopingSummary, iduser }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO transaction(products_item, price, qty, shiping_address, delivery_cost,shoping_sumary, iduser)VALUES($1,$2,$3,$4,$5,$6,$7)",
      [products_item, price, qty, shiping_address, delivery_cost, shopingSummary, iduser],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const update = ({ products_item, price, qty, shiping_address, delivery_cost, shopingSummary, iduser, id }) => {
  return pool.query(`UPDATE transaction SET products_item = $1, price = $2, qty = $3, shiping_address = $4, delivery_cost = $5,shoping_sumary =$6, iduser = $7 WHERE id_transaction = $8`, [
    products_item,
    price,
    qty,
    shiping_address,
    delivery_cost,
    shopingSummary,
    iduser,
    id,
  ]);
};

const deleteTransaction = (id_transaction) => {
  return pool.query("DELETE FROM transaction WHERE id_transaction = $1", [id_transaction]);
};

const countTransaction = () => {
  return pool.query("SELECT COUNT (*) AS total FROM transaction");
};

module.exports = {
  select,
  insert,
  update,
  deleteTransaction,
  countTransaction,
};
