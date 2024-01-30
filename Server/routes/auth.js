const express = require('express')
const router = express.Router()
const { register, login, logout,forgotPassword, resetPassword, updatePassword} = require('../controllers/auth')
const { auth} = require('../middleware/authorization')

router
.post("/register", register)
.post("/login", login)
.get("/logout", auth, logout)
.post("/forgotPassword", forgotPassword)
.post("/updatePassword", auth,  updatePassword)
.post("/resetPassword/:token", resetPassword)  



exports.router = router