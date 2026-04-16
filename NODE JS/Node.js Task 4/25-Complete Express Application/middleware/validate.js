function validateUser(req, res, next) {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({
      success: false,
      message: "Id, name and email are required"
    });
  }

  next();
}

function validateProduct(req, res, next) {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({
      success: false,
      message: "Id, name and price are required"
    });
  }

  next();
}

module.exports = {
  validateUser,
  validateProduct
};