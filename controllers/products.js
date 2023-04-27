const Product = require('../models/product')
const getAllProducts = async (req, res, next) =>{
    const {name,featured,company,sort,fields,numericFilters} = req.query
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
    if (numericFilters){
        const operatorMap ={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$ltq',
        }
        const regEx = /\b(<|<=|=|>|>=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        // console.log(filters)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(item=>{
            const [field,operator,value] = item.split('-');
            if (options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
            
        })
    }
    console.log(queryObject)
    let products =  Product.find(queryObject);
    if (sort){
        const sortList = sort.split(',').join(' ');
        products.sort(sortList);
    }else{
        products.sort('-createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        products.select(fieldsList)
    }

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 0;
    products.skip(page*limit).limit(limit)

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