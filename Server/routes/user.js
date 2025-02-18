const express = require('express')
const router = express.Router()
const { getUserDetails, updateUserDetails,  deleteUserAccount} = require('../controllers/user')
const { auth } = require('../middleware/authorization')

router
.get("/me", auth, getUserDetails)
.patch("/update", auth, updateUserDetails)
.delete("/delete",auth, deleteUserAccount)

exports.router = router