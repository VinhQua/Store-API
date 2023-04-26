const express = require('express');
const router = express.Router()

const {    
    getAllProducts,
    createNewProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct} = require('../controllers/products')

router.route('/').get(getAllProducts).post(createNewProduct)

router.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router