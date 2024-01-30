const express = require('express')
const router = express.Router()
const { createProduct, getProduct, updateProduct, deleteProduct, getAllProducts, searchProduct, deleteAllProducts, productSort, getProducts} = require('../controllers/product')
const { auth, authorizeRole } = require('../middleware/authorization')

router
.get('/all', getAllProducts)
.post('/new',auth, authorizeRole, createProduct)     //admin
.get('/search', searchProduct)
.get('/sort', productSort)
.get('/', auth, authorizeRole, getProducts)           //admin
.delete('/all',auth, authorizeRole, deleteAllProducts)
.get('/:id', getProduct)
.patch('/:id',auth, authorizeRole, updateProduct)      //admin
.delete('/:id',auth, authorizeRole, deleteProduct)     //admin


exports.router = router
