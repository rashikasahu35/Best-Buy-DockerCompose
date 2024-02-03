const express = require('express')
const router = express.Router()
const { auth, authorizeRole } = require('../middleware/authorization')
const { newOrder, updateOrder, deleteOrder, getOrderDetails, myOrders, getAllOrders, updateOrderStatus, getOrder} = require('../controllers/order')
const { notPermittedForTestUsers } = require('../middleware/testUserPermission')

router
.post("/new", auth, newOrder)
.get("/myOrders", auth, myOrders)
.get("/details/:id", auth, getOrderDetails)

// ----------------------- ADMIN ------------------------------
router
.get("/all", auth, authorizeRole, getAllOrders)                                           
.patch("/status/:id", auth, authorizeRole, notPermittedForTestUsers, updateOrderStatus)   
.get("/:id",auth, authorizeRole, getOrder)                                                
.patch("/:id", auth, authorizeRole, notPermittedForTestUsers, updateOrder)                
.delete("/:id", auth, authorizeRole, notPermittedForTestUsers, deleteOrder)               



exports.router = router
