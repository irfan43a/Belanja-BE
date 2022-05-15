// const pool = require("../config/db");
// const select = ({ limit, offset }) => {
//   return new Promise((resolve, reject) => {
//     pool.query("SELECT * FROM user_customer LIMIT $1 OFFSET $2", [limit, offset], (err, result) => {
//       if (!err) {
//         resolve(result.rows);
//       } else {
//         reject(new Error(err));
//       }
//     });
//   });
// };
// const insert = ({ id_category, name, description, stock, price }) => {
//   return new Promise((resolve, reject) => {
//     pool.query("INSERT INTO user_customer( id_category, name, description,stock, price)VALUES($1,$2,$3,$4,$5)", [id_category, name, description, stock, price], (err, result) => {
//       if (!err) {
//         resolve(result);
//       } else {
//         reject(new Error(err));
//       }
//     });
//   });
// };
// const update = ({ id, name, description, stock, price, id_category }) => {
//   return new Promise((resolve, reject) => {
//     pool.query("UPDATE user_customer SET name = $1,description = $2, stock = $3, price = $4, id_category = $5 WHERE id = $6", [name, description, stock, price, id_category, id], (err, result) => {
//       if (!err) {
//         resolve(result);
//       } else {
//         reject(new Error(err));
//       }
//     });
//   });
// };

// const delete = (id) => {
//   return pool.query("DELETE FROM user_customer WHERE id = $1", [id]);
// };

// const getProductById = (id) => {
//   return pool.query("SELECT user_customer.*, category.name AS name_category FROM user_customer INNER JOIN category ON user_customer.id_category = category.id WHERE user_customer.id = $1", id);
// };

// const count = () => {
//   return pool.query("SELECT COUNT (*) AS total FROM user_customer");
// };

// module.exports = {
//   select,
//   insert,
//   update,
//   delete,
//   count,
//   getProductById,
// };
