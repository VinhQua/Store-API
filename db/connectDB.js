const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_STRING);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Can't connect to DB`);
  }
};

module.exports = connectDB;
