const catchAsyncError = require("../middleware/catchAsyncError");
const { Order } = require("../schema/order");
const { Cart } = require("../schema/cart")

exports.newOrder = catchAsyncError(async (req, res) => {
    const { shippingDetails, paymentInfo } = req.body;
    const user = req.user;
    const cart = await Cart.findOne({user : user._id})
    
    if(!cart) throw new Error("User cart is empty, add items to place order", 400)
    const price = {
        itemPrice : Number(cart.subTotal),
        taxPrice : Number(cart.subTotal) * 0.1,
        shippingPrice : Number(cart.subTotal) >= 500 ? 0:50,
    }
    price.totalPrice = price.itemPrice + price.taxPrice + price.shippingPrice
    
    const newOrder = new Order({
        user: user._id,
        orderedItems : cart.products,
        price,
        shippingDetails,
        paymentInfo,
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order Placed"  });
});

exports.myOrders = catchAsyncError(async(req, res) => {
    const response = await Order.find({user : req.user._id})
    res.status(200).json({response, orderCount : response?.length || 0})
})
exports.getOrderDetails = catchAsyncError(async(req, res) => {
    const {id} = req.params
    const response = await Order.findById(id)
    if(response) res.status(200).json({response})
    else throw new Error("Order does not exist", 404)
}) 


// --------------------  ADMIN --------------------

exports.getOrder = catchAsyncError(async(req, res) => {
    const {id} = req.params
    const response = await Order.findById(id).populate("user", "name email")
    if(response) res.status(200).json({response})
    else throw new Error("Order does not exist", 404)
}) 
exports.getAllOrders = catchAsyncError(async(req, res) => {
    const response = await Order.find().populate("user", "email")
    let totalAmount = 0
    response.map((order) => totalAmount += order.price.totalPrice)
    res.status(200).json({response, totalAmount, orderCount : response?.length})
}) 
exports.updateOrderStatus = catchAsyncError(async(req, res) => {
    const {id} = req.params
    const order = await Order.findById(id)
    if(order){
        const { orderStatus } = req.body
        if(order.status === "Delivered"){
            throw new Error("This order is already delivered", 400)
        }
        else{
            order.orderStatus = orderStatus
            if(orderStatus === "Delivered"){
                order.paymentInfo.status= "Succeeded"
                order.deliveredAt = Date.now()
            }
            const response = await order.save()
            res.status(200).json({response, message : "Order Status updated"})
        }
    }
    else{ 
        throw new Error("Order does not exist", 404)
    }
})
exports.updateOrder = catchAsyncError(async(req, res) => {
    const {id} = req.params
    const updatedOrder = req.body
    const response = await Order.findByIdAndUpdate(id, updatedOrder, {returnDocument: 'after'})
    if(response) res.status(200).json({response})
    else throw new Error("Order does not exist", 404)
})
exports.deleteOrder = catchAsyncError(async(req, res) => {
    const {id} = req.params
    const response = await Order.findByIdAndDelete(id)
    if(response) res.status(200).json({response,  message : "Order deleted successfully"})
    else throw new Error("Order does not exist", 404)
})




