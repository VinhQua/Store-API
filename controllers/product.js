const Product = require("../models/products");
const { CustomAPIError } = require("../errors/custom-error");
const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  const ipAddress = req.socket.remoteAddress
  res.status(200).json({ amount: products.length, products });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    throw new CustomAPIError(`no product with id ${id}`, 404);
  }
  return res.status(200).json({ success: true, product });
};
const createProduct = async (req, res) => {
  if (Array.isArray(req.body)) {
    const products = await Product.bulkCreate(req.body);
    return res.status(200).json({ success: true, products });
  }
  const product = await Product.create(req.body);
  return res.status(200).json({ success: true, product });
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.update(req.body, { where: { id } });
  if (product[0] === 0) {
    throw new CustomAPIError(`no product with id ${id}`, 404);
  }
  return res.status(200).json({ success: true, msg: "updated", product });
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.destroy({ where: { id } });
  if (!product) {
    throw new CustomAPIError(`no product with id ${id}`, 404);
  }
  return res.status(200).json({ success: true, msg: "deleted" });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
