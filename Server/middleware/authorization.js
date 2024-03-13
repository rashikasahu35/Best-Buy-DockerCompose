const Error = require('../utils/Error')
const { User } = require('../schema/user')
const catchAsyncError = require('./catchAsyncError')
const jwt = require('jsonwebtoken');

exports.auth = catchAsyncError( async (req, res, next) => {
    const authorizationHeader = req.headers?.authorization;
    if(!authorizationHeader) throw new Error("Please login to access this resource", 401)
    console.log(authorizationHeader)
    const token = JSON.parse(authorizationHeader?.split(' ')[1])?.value

    if(token){   // if token exist
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id)
        if(user){
            req.user = user
            next()
        }
        else{
            throw new Error("Please login to access this resource", 401)
        }
    }
    else{
        throw new Error("Please login to access this resource", 401)
    }
})

exports.authorizeRole = catchAsyncError((req, res, next) => {
    const { role } = req.user
    if(!role ||  role !== "admin"){
        throw new Error(`Role : ${req.user?.role} is not allowed to access this resource`, 403)
    }
    else next()
})
