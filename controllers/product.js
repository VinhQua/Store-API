const Product = require("../models/product")
const {CustomAPIError}= require("../error/custom-error")
const getAllProducts = async(req,res) => { 
    const products = await Product.findAll()
    res.status(200).json({amount:products.length ,products })
 }

 const getSingleProduct = async(req,res) => { 
    const {id}= req.params
    const product = await Product.findByPK(id)
    if (!product) {
         throw CustomAPIError(`no product with id ${id}`)
    }
    return res.status(200).json({success :true , product })
 }
 const createProduct = async(req,res) => { 
    const product =await Product.create(req.body )
    res.status(200).json({success:true ,product})
 }
 const updateProduct =async (req,res) => { 
    const {id}= req.params
    const product  = await Product.update(req.body,{where :{id}})
    if (product[0]===0) {
        throw CustomAPIError(`no product with id ${id}`,404)
    } 
    return res.status(200).json({success:true,msg:'updated'})
  }
  const deleteProduct =async (req,res) => { 
    const{id}=req.params
    const product= await Product.deleteByPK(id)
    if (!product) {
       throw CustomAPIError(`no product with id ${id}`) 
    }
    return res.status(200).json({success:true ,msg:'deleted'})
   }

   export{getAllProducts,getSingleProduct,createProduct,updateProduct,deleteProduct}