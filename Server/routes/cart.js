const express = require('express')
const router = express.Router()
const { auth, authorizeRole } = require('../middleware/authorization')
const { getCartItems, addItemInCart, deleteCart, deleteCartItem , updateCart, getAllCarts, getCart, updateProductQuantityInCart} = require('../controllers/cart')

router
.get('/', auth, getCartItems)
.post('/add', auth, addItemInCart)
.delete('/', auth,   deleteCartItem)
.patch('/', auth, updateProductQuantityInCart)

// -------- ADMIN --------
router
.get('/all', auth, authorizeRole, getAllCarts)
.get('/:id', auth, authorizeRole, getCart)
.patch('/:id', auth, authorizeRole, updateCart)
.delete('/:id', auth, authorizeRole, deleteCart)


exports.router = router

