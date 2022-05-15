const pool = require("../config/db");

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const create = ({ id, email, password, fullname, role }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO users(id, email, password, fullname,role)VALUES($1, $2, $3, $4,$5)", [id, email, password, fullname, role], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
module.exports = {
  findByEmail,
  create,
};
