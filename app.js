require("dotenv").config();
require("express-async-errors");
const errorHandler = require("./middlewares/error-handlers");
const notFound = require("./middlewares/not-found");
const express = require("express");
const products = require("./routers/product");
const connectDB = require("./db/connectDB");
require("./models/products");
const app = express();
//middleware
app.use(express.static("./public"));
app.use(express.json());
//routes
app.get("/"). send(`    <h1>Store <a href="api/v1/products">API</a></h1>`)
//product routes
app.use("/api/v1/products", products);
//not found
app.use(notFound);
//error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
