const catchAsyncError = require('../middleware/catchAsyncError')
const { User } = require('../schema/user')
const Error = require('../utils/Error')

exports.register = catchAsyncError(async (req, res) => {
    const { name, email, password} = req.body
    const newUser = new User({ name, email, password })
    const user = await newUser.save()
    sendTokenandResponse(201, user, "User created", req, res)
})


exports.login = catchAsyncError(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw new Error("Please enter email & password to login", 400)

    const user = await User.findOne({ email }).select('+password')
    if (!user) throw new Error("Invalid email or password", 401)

    const passwordMatched = await user.comparePassword(password)
    if (passwordMatched) {
        sendTokenandResponse(200, user, "Logged In", req, res)
    } else {
        throw new Error("Invalid email or password", 401)
    }

})

exports.logout = catchAsyncError(async (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.status(200).json({
        message: "Logged out"
    })

})


const sendTokenandResponse = (statusCode, user, message, req, res) => {
    const token = user.generateJWTtoken()
    const options = {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,     // 3days
    }
    const responseUser = { _id: user._id, name: user.name, email: user.email, createdOn: user.createdOn}  
    req.user = responseUser
    res.status(statusCode).json({ message: message, response: responseUser, token });
}
