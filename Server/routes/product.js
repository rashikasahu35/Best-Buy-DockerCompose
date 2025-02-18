const express = require('express')
const router = express.Router()
const { getProduct, getAllProducts, searchProduct, productSort, } = require('../controllers/product')

router
.get('/all', getAllProducts)
.get('/search', searchProduct)
.get('/sort', productSort)
.get('/:id', getProduct)


exports.router = router
