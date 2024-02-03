const express = require('express')
const router = express.Router()
const { auth, authorizeRole } = require('../middleware/authorization')
const { getCartItems, addItemInCart, deleteCart, deleteCartItem , updateCart, getAllCarts, getCart, updateProductQuantityInCart} = require('../controllers/cart')
const { notPermittedForTestUsers } = require('../middleware/testUserPermission')

router
.get('/', auth, getCartItems)
.post('/add', auth, addItemInCart)
.delete('/', auth,   deleteCartItem)
.patch('/', auth, updateProductQuantityInCart)

// -------- ADMIN --------
router
.get('/all', auth, authorizeRole, getAllCarts)
.get('/:id', auth, authorizeRole, getCart)
.patch('/:id', auth, authorizeRole, notPermittedForTestUsers, updateCart)
.delete('/:id', auth, authorizeRole,notPermittedForTestUsers, deleteCart)


exports.router = router

