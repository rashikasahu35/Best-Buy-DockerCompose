const express = require('express')
const router = express.Router()
const { addProductReview, deleteReview,getProductReviews, getAllReviews, updateReview, getReview} = require('../controllers/productReview')
const { auth, authorizeRole } = require('../middleware/authorization')
const { notPermittedForTestUsers } = require('../middleware/testUserPermission')

router
.get('/', getProductReviews)
.post('/new',auth, addProductReview)

// ----------------------- ADMIN --------------------

router
.get('/all',auth, authorizeRole, getAllReviews)         
.get('/:id', auth, authorizeRole, getReview)
.patch('/:id',auth, authorizeRole, notPermittedForTestUsers,  updateReview)
.delete('/:id', auth, authorizeRole, notPermittedForTestUsers, deleteReview )


exports.router = router
