const Error = require('../utils/Error')
const catchAsyncError = require('./catchAsyncError')


// to not let test user update/delete/change password operations
//to not let test admin create/edit/delete product, review, user, order, cart
exports.notPermittedForTestUsers = catchAsyncError(async(req, res, next) => {
    const { _id, role } = req.user
    const testUser = process.env.TEST_USER
    const testAdmin = process.env.TEST_ADMIN
    if(_id.toString() === testUser || _id.toString() === testAdmin){
        throw new Error(`Test ${role} not permitted to perform this action`, 400)
    }
    else{
        next()
    }
})
