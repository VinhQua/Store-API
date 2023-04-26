const express = require('express');
const app = express();
require('express-async-errors');
require('dotenv').config()
const errorHandlderMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
//middlewares

app.use(express.json())


//routes
app.get('/', (req, res, next) => {
    res.send(`<h1>Store API</h1><a href="/api/v1/products" >Products Route</a>`)
})

// Products Route

app.use('/api/v1/products',productsRouter)

//404
app.use(notFound)

app.use(errorHandlderMiddleware)

const port = process.env.PORT || 3000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000,()=> console.log(`server listening on ${port}`))
    } catch (error) {
        res.status(500).json({error})
    }
}
start()