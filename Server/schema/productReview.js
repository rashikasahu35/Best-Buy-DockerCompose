const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Please enter product id"],
    },
    user: {
        type: {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: [true, "Please enter user id"],
            },
            name: {
                type: String,
                required: [true, "Please enter reviewer name"],
            },
        },

        required: [true, "Please enter user details"],
    },
    rating: {
        type: Number,
        required: [true, "Please enter rating"],
    },
    comment: { type: String },
});

exports.ProductReview = mongoose.model("ProductReview", schema);

