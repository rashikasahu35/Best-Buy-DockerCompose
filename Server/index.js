const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('./connectDB')
const User = require('./routes/user')
const Product = require('./routes/product')
const ProductReview = require('./routes/productReview')
const Cart = require('./routes/cart')
const Auth = require('./routes/auth')
const ErrorHandler = require("./middleware/ErrorHandler")
require('dotenv').config();
const bodyParser = require('body-parser')

// Handling Uncaught Exception 
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`)
})

const port = process.env.PORT || 8000
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended : true}))

//For docker compose
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        'http://localhost',
    ],
    credentials: true,
}));

// app.use(cors({
//     origin: process.env.CLIENT_URL, // Allow requests only from this origin
//     credentials: true, // Enable credentials (cookies, authorization headers)  
// }));

app.get('/', (req, res) => {
    res.status(200).send("server running...")
})
app.use('/api/auth', Auth.router)
app.use('/api/user', User.router)
app.use('/api/product/review', ProductReview.router)
app.use('/api/product', Product.router)
app.use('/api/cart', Cart.router)

app.use(ErrorHandler)

const server = app.listen(port, () => {
    console.log("server started")
    connectDB()
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`)
})


