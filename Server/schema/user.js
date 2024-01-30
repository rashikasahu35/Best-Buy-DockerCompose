const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter username"],
        maxLength: 30,
    },
    email: {
        type: String,
        required: [true, "Please enter user email"],
        unique: [true, "Email already registered"],
        validate: [validator.isEmail, "Please enter a valid email"],
        maxLength: 40
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: 8,
    },
    role: { type: String, default: "user" },
    avatar: {
        type: {
            url: { type: String, required: [true, "Please enter image url"] },
            public_id: { type: String },
        },
        required : [true, "Please enter user avatar image link"]
    },
    createdOn: { type: Date, default: Date.now },
    resetToken: { type: String },
    resetTokenExpiration: { type: String },
});

schema.pre("save", async function (next) {
    // pre-save hook to hash the password

    if (!this.isModified("password")) {
        // if password is not modified then dont hash and move to next fun
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.generateJWTtoken = function () {
    const options = {
        expiresIn: process.env.JWT_EXPIRE,
    };
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, options);
};

schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

schema.methods.generateResetPasswordToken = function () {
    const token = crypto.randomBytes(20).toString("hex");
    this.resetToken = token;
    this.resetTokenExpiration = Date.now() + 15 * 60 * 1000; // 15min
    return token;
};

exports.User = mongoose.model("User", schema);
