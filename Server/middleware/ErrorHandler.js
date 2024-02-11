const Error = require('../utils/Error')

const ErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"
    
    // wrong mongoDB id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid : ${err.path}`
        err = new Error(message, 400)
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} value`
        err = new Error(message, 400)
    }

    // wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Please login to access this resource`
        err = new Error(message, 401)
    }

    // JWT expire error
    if(err.name === "TokenExpiredError"){
        const message = `Please login to access this resource`
        err = new Error(message, 401)
    }


    res.status(err.statusCode).json({
        message : err.message
    })
}

module.exports = ErrorHandler