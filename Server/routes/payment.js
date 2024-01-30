const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/authorization')
const {payment} = require('../controllers/payment')

router
.post('/', auth,  payment)

exports.router = router