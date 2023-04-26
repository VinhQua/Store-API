const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,`Product name is required`]
    },
    price:{
        type:Number,
        required:[true,`Product price is required`]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        required:[true,'company name is required'],
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not a valid company'
        }
    }
})

module.exports = mongoose.model('Product', productSchema)