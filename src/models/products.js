const pool = require("../config/db");

const select = ({ sortBy, sort, limit, offset, search }) => {
  return pool.query(`SELECT id,name,description,stock,price,photo,id_category FROM products WHERE LOWER(name) LIKE LOWER('%${search}%') ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};
const countProducts = () => {
  return pool.query("SELECT COUNT (*) AS total FROM products");
};
const insert = ({ id_category, name, description, stock, price, photo }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO products( id_category, name, description,stock, price,photo)VALUES($1,$2,$3,$4,$5,$6)", [id_category, name, description, stock, price, photo], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const update = ({ name, description, stock, price, id_category, photo, id }) => {
  return pool.query(`UPDATE products SET name = $1, description = $2, stock = $3, price = $4, id_category = $5, photo = $6 WHERE id = $7`, [name, description, stock, price, id_category, photo, id]);
};
const deleteProducts = (id) => {
  return pool.query("DELETE FROM products WHERE id = $1", [id]);
};
const getProductById = (id) => {
  return pool.query("SELECT products.*, category.name AS name_category from products inner join category ON products.id_category = category.id WHERE products.id = $1", [id]);
};
module.exports = {
  select,
  insert,
  update,
  deleteProducts,
  countProducts,
  getProductById,
};
