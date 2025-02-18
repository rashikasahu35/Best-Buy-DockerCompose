const catchAsyncError = require("../middleware/catchAsyncError");
const { User } = require("../schema/user");
const Error = require("../utils/Error");

exports.getUserDetails = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdOn: user.createdOn,
        role: user.role,
        avatar: user.avatar,
    };
    res.status(200).json({ response });
});

exports.updateUserDetails = catchAsyncError(async (req, res) => {
    // only name, email, avatar must be changed here
    const { name, email, avatar, password } = req.body;
    const user = await User.findById(req.user.id);
    if (password)
        throw new Error(
            "use 'Change Password' to change your credentials",
            400
        );

    user.name = name || user.name;
    user.email = email || user.email;
    const response = await user.save();

    const responseUser = {
        _id: response._id,
        name: response.name,
        email: response.email,
        createdOn: response.createdOn,
        role: response.role,
        avatar: response.avatar,
    };
    res.status(200).json({ message: "User updated", response: responseUser });
});

exports.deleteUserAccount = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) res.status(404).json({ message: "User does not exist" });
    else {
        await destroyImage(user.avatar?.public_id);
        const response = await user.deleteOne();
        if (response.deletedCount === 1) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(500).json({ message: "Failed to delete user" });
        }
    }
});
