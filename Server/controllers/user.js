const catchAsyncError = require("../middleware/catchAsyncError");
const { User } = require("../schema/user");
const Error = require("../utils/Error");
const { uploadImage, destroyImage } = require("../utils/manageImage");

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
    if (avatar) {
        if(!avatar.public_id && !avatar.url){  //new avatar has been added
            await destroyImage(user.avatar?.public_id);
            const { public_id, secure_url } = await uploadImage(avatar, "avatars");
            user.avatar = { public_id, url: secure_url };
        }
        else user.avatar = avatar
    }
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

// -----------------  ADMIN  ------------------------

exports.getAllUsers = catchAsyncError(async (req, res) => {
    const response = await User.find();
    res.status(200).json({ response, userCount: response?.length });
});

exports.createUser = catchAsyncError(async (req, res) => {
    const { name, email, password, avatar, role } = req.body;
    const { public_id, secure_url } = await uploadImage(avatar, "avatars");
    const newUser = new User({ name, email, password, avatar : {public_id, url : secure_url}, role });
    const user = await newUser.save();
    res.status(201).json({ response: user, message: "User Created" });
});
exports.getUser = catchAsyncError(async (req, res) => {
    const response = await User.findById(req.params.id);
    if (!response) res.status(404).json({ message: "User does not exist" });
    else res.status(200).json({ response });
});

exports.updateUser = catchAsyncError(async (req, res) => {
    const { name, email, avatar, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("User does not exist", 404);

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    if (avatar) {
        if(!avatar.public_id && !avatar.url){    //new avatar has been added
            await destroyImage(user.avatar?.public_id);
            const { public_id, secure_url } = await uploadImage(avatar, "avatars");
            user.avatar = { public_id, url: secure_url };
        }
        else user.avatar = avatar
    }
    const response = user.save();
    res.status(200).json({ response, message: "User Updated" });
});

exports.deleteUser = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);

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

