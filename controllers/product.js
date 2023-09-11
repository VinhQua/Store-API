const Product = require("../models/products");
const { CustomAPIError } = require("../errors/custom-error");
const { Op } = require("sequelize");
const getAllProducts = async (req, res) => {
  const { search, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.name = { [Op.iLike]: `%${search}%` };
  }
  let fieldList = [];
  if (fields) {
    fieldList = fields.split(",");
  }
  let sortList = [];
  if (sort) {
    sortList = sort
      .split(",")
      .map((item) =>
        item.includes("-") ? [item.replace("-", ""), "DESC"] : [item, "ASC"]
      );
  }
  if (numericFilters) {
    const operatorMap = {
      "<": Op.lt,
      "<=": Op.lte,
      "=": Op.eq,
      ">=": Op.gte,
      ">": Op.gt,
    };
    const regEx = /\b(<|<=|=|>=|>)\b/;

    const options = ["rating", "price"];
    const filters = numericFilters.split(",").map((filter) =>
      filter.replace(regEx, (match) => {
        console.log(match);
        const [field, value] = filter.split(match);
        if (options.includes(field)) {
          queryObject[field] = { [operatorMap[match]]: value };
        }
      })
    );
  }

  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const products = await Product.findAll({
    where: queryObject,
    order: sortList,
    attributes: fieldList,
    offset: limit * (page - 1),
    limit,
  });

  const ipAddress = req.ip;

  res.status(200).json({ ipAddress, amount: products.length, products });
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
