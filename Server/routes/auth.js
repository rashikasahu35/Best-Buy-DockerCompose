const express = require('express')
const router = express.Router()
const { register, login, logout} = require('../controllers/auth')
const { auth} = require('../middleware/authorization')

router
.post("/register", register)
.post("/login", login)
.get("/logout", auth, logout)



exports.router = router