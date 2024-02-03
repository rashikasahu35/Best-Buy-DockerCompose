const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('./connectDB')
const User = require('./routes/user')
const Product = require('./routes/product')
const ProductReview = require('./routes/productReview')
const Order = require('./routes/order')
const Cart = require('./routes/cart')
const Auth = require('./routes/auth')
const Payment = require('./routes/payment')
const ErrorHandler = require("./middleware/ErrorHandler")
require('dotenv').config();
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { initializeStripe } = require('./controllers/payment')

// Handling Uncaught Exception 
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to Uncaught Exception")    // server.close(() => {
    process.exit(1)
})

const port = process.env.PORT || 8000
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests only from this origin
    credentials: true, // Enable credentials (cookies, authorization headers)  
}));
app.use(cookieParser())
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended : true}))
initializeStripe()

app.get('/', (req, res) => {
    res.status(200).send("server running...")
})
app.use('/api/auth', Auth.router)
app.use('/api/user', User.router)
app.use('/api/product/review', ProductReview.router)
app.use('/api/product', Product.router)
app.use('/api/order', Order.router)
app.use('/api/cart', Cart.router)
app.use('/api/payment', Payment.router)

app.use(ErrorHandler)

const server = app.listen(port, () => {
    console.log("server started")
    connectDB()
})

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to Unhandled Promise Rejection")
    server.close(() => {
        process.exit(1)
    })
})


