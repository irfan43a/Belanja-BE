const validate = (req, res, next) => {
  const stock = req.body.stock;

  if (stock < 1) {
    return res.json({
      message: "stock tidak boleh kosong",
    });
  }
  next();
};

const myCors = (req, res, nest) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Origin", "Content-Type");
  next();
};
module.exports = {
  validate,
  myCors,
};
