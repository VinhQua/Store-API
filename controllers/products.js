const Product = require('../models/product')
const getAllProducts = async (req, res, next) =>{
    const {name,featured,company,sort} = req.query
    const queryObject = {}
    if (featured){
        queryObject.featured = featured ==="true" ? true : false;
    }
    if(company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    let products =  Product.find(queryObject);
    if (sort){
        const sortList = sort.split(',').join(' ');
        products.sort(sortList);
    }else{
        products.sort('-createdAt')
    }
    const result = await products
    res.status(200).json({nbHits:result.length,products:result})
}

const createNewProduct = async (req, res, next) =>{
    
    const product = await Product.create(req.body);
    if (!product){
        throw new Error('can not create product')
        return
    }
    res.status(200).json({product})
}

const getSingleProduct = async (req, res, next) =>{
    const {id} = req.params
    const product = await Product.findOne({_id:id})
    if (!product){
        throw new Error(`Product id ${id} not found`)
        return
    }
    res.status(200).json({product})
}

const updateProduct = async (req, res, next) =>{
    const {id} = req.params
    const product = await Product.findOneAndUpdate({_id:id},req.body)

    if (!product){
        throw new Error(`Product id ${id} not found to update`)
    }
    res.status(200).json({product})
}

const deleteProduct = async (req, res, next) =>{
    const {id} = req.params
    const product = await Product.findOneAndDelete({_id:id})
    if (!product){
        throw new Error(`Product id ${id} not found to delete`)
    }
    res.status(200).json({product})
}

module.exports = {
    getAllProducts,
    createNewProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}