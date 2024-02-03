const express = require('express')
const router = express.Router()
const { register, login, logout,forgotPassword, resetPassword, updatePassword} = require('../controllers/auth')
const { auth} = require('../middleware/authorization')
const {notPermittedForTestUsers} = require('../middleware/testUserPermission')

router
.post("/register", register)
.post("/login", login)
.get("/logout", auth, logout)
.post("/forgotPassword", forgotPassword)
.post("/updatePassword", auth, notPermittedForTestUsers,  updatePassword)
.post("/resetPassword/:token", resetPassword)  



exports.router = router