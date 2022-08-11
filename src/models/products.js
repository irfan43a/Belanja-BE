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
  return pool.query(
    `
  UPDATE products SET
   name = COALESCE($1,name), 
   description = COALESCE($2,description),
   stock = COALESCE($3,stock), 
   price = COALESCE($4,price), 
   id_category = COALESCE($5,id_category), 
   photo = COALESCE($6,photo) 
   WHERE id = $7`,
    [name, description, stock, price, id_category, photo, id]
  );
};
const deleteProducts = (id) => {
  return pool.query("DELETE FROM products WHERE id = $1", [id]);
};
const getProductById = (id) => {
  return pool.query("SELECT products.*, category.name AS name_category from products inner join category ON products.id_category = category.id WHERE products.id = $1", [id]);
};
const getCheckout = (idUser) => {
  return pool.query("SELECT products.name, products.photo,products.price, checkout.count,checkout.total FROM checkout INNER JOIN products ON checkout.idproduct = products.id where checkout.iduser= $1", [idUser]);
};
const checkoutModel = ({ idUser, idproduct, count, total }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO checkout(  iduser, idproduct, count, total)VALUES($1,$2,$3,$4)", [idUser, idproduct, count, total], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
module.exports = {
  select,
  insert,
  update,
  deleteProducts,
  countProducts,
  getProductById,
  checkoutModel,
  getCheckout,
};
