const mongoose = require("mongoose");
const { Schema } = mongoose;



const schema = new Schema({
    name: { type: String, required: [true, "Please enter product name"] },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    price: { type: Number, required: [true, "Please enter product price"] },
    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    createdAt: { type: Date, default: Date.now },
    noOfStock: { type: Number, required : [true, "Please enter no of product stock"] },
    ratings: { type: Number, default: 0 },
    noOfReviews: { type: Number, default: 0 },
    images: {
        type: [
            {
                url: { type: String, required: [true, "Enter img url"] },
                public_id: { type: String },
            },
        ],
        required : [true, "Please give product image"]
    }
});

exports.Product = mongoose.model("Product", schema);
