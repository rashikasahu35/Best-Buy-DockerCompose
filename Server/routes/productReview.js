const express = require('express')
const router = express.Router()
const { addProductReview,getProductReviews} = require('../controllers/productReview')
const { auth } = require('../middleware/authorization')

router
.get('/', getProductReviews)
.post('/new',auth, addProductReview)

exports.router = router
