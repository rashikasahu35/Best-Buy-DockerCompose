const express = require('express')
const router = express.Router()
const { getUserDetails, updateUserDetails, deleteUser, getAllUsers, getUser, createUser, updateUser, deleteUserAccount} = require('../controllers/user')
const { auth, authorizeRole } = require('../middleware/authorization')
const { notPermittedForTestUsers } = require('../middleware/testUserPermission')


router
.get("/me", auth, getUserDetails)
.patch("/update", auth, notPermittedForTestUsers, updateUserDetails)
.delete("/delete",auth, notPermittedForTestUsers, deleteUserAccount)


// --------- ADMIN ----------
router
.get("/all", auth, authorizeRole,  getAllUsers)      
.post("/new", auth, authorizeRole, notPermittedForTestUsers, createUser)
.get("/:id", auth, authorizeRole, getUser)
.patch("/:id", auth, authorizeRole, notPermittedForTestUsers, updateUser)
.delete("/:id", auth, authorizeRole, notPermittedForTestUsers, deleteUser)


exports.router = router