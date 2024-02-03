const catchAsyncError = require('../middleware/catchAsyncError')
const { User } = require('../schema/user')
const Error = require('../utils/Error')
const sendEmail = require("../utils/sendEmail")
const { uploadImage } = require('../utils/manageImage')


exports.register = catchAsyncError(async (req, res) => {
    const { name, email, password, avatar } = req.body
    const {public_id, secure_url} = await uploadImage(avatar, 'avatars')
    const newUser = new User({ name, email, password , avatar : { public_id , url : secure_url} })
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


exports.updatePassword = catchAsyncError(async(req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body
    const user = await User.findById(req.user.id).select('+password')
    const passwordMatched = await user.comparePassword(currentPassword)

    if(passwordMatched){
        if(newPassword === confirmPassword){
            user.password = newPassword
            const response = await user.save()
            sendTokenandResponse(200, response, "Password updated", req, res)
        }
        else{
            res.status(400).json({ message : "Passwords do not match"})
        }
    }
    else{
        res.status(400).json({ message : "Current Password is invalid"})
    }
})



exports.forgotPassword = catchAsyncError(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        const resetToken = user.generateResetPasswordToken()
        const resetLink = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`
        const message = `Use the below link to reset your password, the link will be valid for 15 minutes.\n ${resetLink} \n\nIf you have not requested this change then, kindly ignore this mail.`
        const subject = "Best Buy Password Recovery"

        await sendEmail({ email: user.email, subject, message })
        await user.save()
    }
    res.status(200).json({
        message: `If you are a registered user then, Link to reset password is send on your email "${email}". \nPlease check the spam folder if the mail is not in inbox.`
    })
})

exports.resetPassword = catchAsyncError(async (req, res) => {
    const { password } = req.body
    const token = req.params.token
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } }).select('+password') //find user with same reset token
    if (user) {
            user.password = password
            user.resetToken = undefined
            user.resetTokenExpiration = undefined
            await user.save()
            res.status(200).json({ message : "Password reset successfull" })
        
    }
    else {
        res.status(400).json({
            message: "Link is expired or has been used."
        })
    }


})


const sendTokenandResponse = (statusCode, user, message, req, res) => {
    const token = user.generateJWTtoken()
    const options = {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,     // 3days
    }
    const responseUser = { _id: user._id, name: user.name, email: user.email, createdOn: user.createdOn, role: user.role, avatar : user.avatar }  // excluding password, to be send in reponse
    req.user = responseUser
    res.status(statusCode).json({ message: message, response: responseUser, token });
}
