const express = require('express')
const router = express.Router()
const { auth, } = require('../middleware/authorization')
const { getCartItems, addItemInCart, deleteCartItem , updateProductQuantityInCart} = require('../controllers/cart')

router
.get('/', auth, getCartItems)
.post('/add', auth, addItemInCart)
.delete('/', auth,   deleteCartItem)
.patch('/', auth, updateProductQuantityInCart)

exports.router = router

