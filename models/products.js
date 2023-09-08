const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_STRING);
const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Must provide a name",
          args: true,
        },
      },
      set(value) {
        this.setDataValue("name", value.trim());
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Must provide a name",
          args: true,
        },
      },
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 4.5,
    },
    company: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["ikea", "liddy", "caressa", "marcos"]],
          msg: `'ikea','liddy','caressa','marcos'=> Choose ONE`,
        },
      },
    },
  },
  { tableName: "products", modelName: "Product" }
);
const syncTable = async () => {
  await Product.sync({ alter: true });
};
// syncTable();
module.exports = Product;
