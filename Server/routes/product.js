const express = require('express')
const router = express.Router()
const { createProduct, getProduct, updateProduct, deleteProduct, getAllProducts, searchProduct, productSort, getProducts} = require('../controllers/product')
const { auth, authorizeRole } = require('../middleware/authorization')
const { notPermittedForTestUsers } = require('../middleware/testUserPermission')


router
.get('/all', getAllProducts)
.post('/new',auth, authorizeRole, notPermittedForTestUsers, createProduct)       //admin
.get('/search', searchProduct)
.get('/sort', productSort)
.get('/', auth, authorizeRole, getProducts)                                      //admin
.get('/:id', getProduct)
.patch('/:id',auth, authorizeRole,notPermittedForTestUsers, updateProduct)       //admin
.delete('/:id',auth, authorizeRole, notPermittedForTestUsers, deleteProduct)     //admin


exports.router = router
