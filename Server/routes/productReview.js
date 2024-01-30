const express = require('express')
const router = express.Router()
const { addProductReview, deleteReview,getProductReviews, getAllReviews, updateReview, getReview} = require('../controllers/productReview')
const { auth, authorizeRole } = require('../middleware/authorization')

router
.get('/', getProductReviews)
.post('/new',auth, addProductReview)
.get('/all',auth, authorizeRole, getAllReviews)       //admin  
.get('/:id', auth, authorizeRole, getReview)
.patch('/:id',auth, authorizeRole,  updateReview)
.delete('/:id', auth,authorizeRole, deleteReview )


exports.router = router
