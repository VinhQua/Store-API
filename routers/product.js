const express = require("express");
const router = express.Router();
import {getAllProducts,getSingleProduct,createProduct,updateProduct,deleteProduct} from require("../controllers/product")
router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
