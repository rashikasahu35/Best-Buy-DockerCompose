const express = require('express')
const router = express.Router()
const { getUserDetails, updateUserDetails, deleteUser, deleteAllUsers, getAllUsers, getUser, createUser, updateUser, deleteUserAccount} = require('../controllers/user')
const { auth, authorizeRole } = require('../middleware/authorization')

router
.get("/me",auth, getUserDetails)
.patch("/update", auth, updateUserDetails)
.delete("/delete",auth,  deleteUserAccount)


// --------- ADMIN ----------
router
.get("/all", auth, authorizeRole, getAllUsers)      
.delete("/all",auth, authorizeRole, deleteAllUsers)
.post("/new", auth, authorizeRole, createUser)
.get("/:id", auth, authorizeRole, getUser)
.patch("/:id", auth, authorizeRole, updateUser)
.delete("/:id", auth, authorizeRole, deleteUser)


exports.router = router