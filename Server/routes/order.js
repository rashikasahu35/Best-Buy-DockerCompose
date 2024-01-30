const express = require('express')
const router = express.Router()
const { auth, authorizeRole } = require('../middleware/authorization')
const { newOrder, updateOrder, deleteOrder, getOrderDetails, myOrders, getAllOrders, updateOrderStatus, getOrder} = require('../controllers/order')

router
.post("/new", auth, newOrder)
.get("/myOrders", auth, myOrders)
.get("/details/:id", auth, getOrderDetails)
.get("/all", auth, authorizeRole, getAllOrders)                 //admin
.patch("/status/:id", auth, authorizeRole, updateOrderStatus)   //admin
.get("/:id",auth, authorizeRole, getOrder)                      //admin
.patch("/:id", auth, authorizeRole, updateOrder)                //admin
.delete("/:id", auth, authorizeRole, deleteOrder)               //admin



exports.router = router
